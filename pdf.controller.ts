import { Request, Response } from "express";
import PDFDocument from "pdfkit";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
import fs from "fs";
import amqp from "amqplib";

import { resHelperSuccess, resHelperFail } from "../helper/response";
import uploadFile from "../middleware/fileUpload";
import { downloadImageFromURL } from "../middleware/fileDownload";
import axios from "axios";
import { getConnectionForGlobal } from "../middleware/baseConnection";
import { checkUserFacilityAccess } from "../middleware/userValidations";

export const addPrescription = async (req: Request, res: Response) => {
  try {
    const organizationId = req.headers.realmName.toString();

    const missingList = [];
    if (!req.body.facilityCode || req.body.facilityCode === "") {
      missingList.push("facility code");
    }
    if (missingList.length > 0) {
      return resHelperFail(
        res,
        400,
        `Missing ${missingList}`,
        req.headers["kong-request-id"]
      );
    }

    const userFacilityValidation = await checkUserFacilityAccess(
      req,
      req.body.facilityCode
    );

    if (!userFacilityValidation) {
      return resHelperFail(
        res,
        400,
        "User does not have access to facility",
        req.headers["kong-request-id"]
      );
    } else {
      const Organization = await getConnectionForGlobal(organizationId);
      const organizationDetails = await Organization.findOne({
        organizationId,
      });

      const organizationResponse = await axios.get(organizationDetails.logo, {
        responseType: "arraybuffer",
      });
      const logoImageDownload = Buffer.from(organizationResponse.data, "utf-8");

      if (!logoImageDownload) {
        logs("Failed to download org logo", req);
        return resHelperFail(
          res,
          400,
          "Failed to download org logo",
          req.headers["kong-request-id"]
        );
      }

      const footerCaption = organizationDetails.prescriptionCaption;

      const modelConnections = Object(req.headers.dynamicdb);
      const PatientModel = modelConnections.patient;
      const PrescriptionModel = modelConnections.prescription;

      const uhid = Number(req.body.uhid);

      const patientDetails = await PatientModel.findOne({ uhid });
      if (patientDetails) {
        if (
          req.body.prescriptionType !== "Form" &&
          req.body.prescriptionType !== "Image"
        ) {
          logs("Prescription type is incorrect", req);
          return resHelperFail(
            res,
            400,
            "Prescription type is incorrect",
            req.headers["kong-request-id"]
          );
        }
        if (req.body.prescriptionType === "Form") {
          const prescriptionData: any = {
            uhid,
            doctorId: req.body.doctorId,
            patientComplaint: req.body.patientComplaint,
            doctorAdvise: req.body.doctorAdvise,
            labInvestigationAdvise: req.body.labInvestigationAdvise,
            medicines: req.body.medicines,
            others: req.body.others,
            prescriptionType: req.body.prescriptionType,
            consulationId: req.body.consulationId,
            facilityCode: req.body.facilityCode,
            height: req.body.height,
            weight: req.body.weight,
            temperature: req.body.temperature,
            bloodPressure: req.body.bloodPressure,
            bloodGlucose: req.body.bloodGlucose,
            pulse: req.body.pulse,
            oxygenSaturation: req.body.oxygenSaturation,
            hemoglobin: req.body.hemoglobin,
            doctorName: req.body.doctorName,
            licenseNumber: req.body.licenseNumber,
            doctorSignature: req.body.doctorSignature,
          };

          if (req.body.isGlassPrescription === "true") {
            prescriptionData.glassPrescription = {
              rx: req.body.rx,
              rightEye: {
                sphereForDistance: req.body.rightEyesphereForDistance,
                cylinderForDistance: req.body.rightEyecylinderForDistance,
                axisForDistance: req.body.rightEyeaxisForDistance,
                vaForDistance: req.body.rightEyevaForDistance,
                sphereForNearAdd: req.body.rightEyesphereForNearAdd,
                cylinderForNearAdd: req.body.rightEyecylinderForNearAdd,
                axisForNearAdd: req.body.rightEyeaxisForNearAdd,
                vaForNearAdd: req.body.rightEyevaForNearAdd,
              },
              leftEye: {
                sphereForDistance: req.body.leftEyesphereForDistance,
                cylinderForDistance: req.body.leftEyecylinderForDistance,
                axisForDistance: req.body.leftEyeaxisForDistance,
                vaForDistance: req.body.leftEyevaForDistance,
                sphereForNearAdd: req.body.leftEyesphereForNearAdd,
                cylinderForNearAdd: req.body.leftEyecylinderForNearAdd,
                axisForNearAdd: req.body.leftEyeaxisForNearAdd,
                vaForNearAdd: req.body.leftEyevaForNearAdd,
              },
              pid: req.body.pid,
              dv: req.body.dv,
              nv: req.body.nv,
              lensAdviced: req.body.lensAdviced,
              remark: req.body.remark,
              referred: req.body.referred,
            };
          }

          const response = await axios.get(prescriptionData.doctorSignature, {
            responseType: "arraybuffer",
          });
          const imageDownload = Buffer.from(response.data, "utf-8");
          if (!imageDownload) {
            return resHelperFail(
              res,
              400,
              "Failed to download doctor signature",
              req.headers["kong-request-id"]
            );
          }

          if (req.body.isGlassPrescription === "true") {
            const fileUrlPrescription = await createPdfPrescription(
              prescriptionData,
              patientDetails,
              imageDownload,
              logoImageDownload,
              footerCaption
            );
            if (fileUrlPrescription !== null) {
              prescriptionData.glassPrescriptionFile = fileUrlPrescription;
            } else {
              return resHelperFail(
                res,
                400,
                "Failed to generate Glass Prescription File",
                req.headers["kong-request-id"]
              );
            }
          } else {
            const fileUrl = await createPdf(
              prescriptionData,
              patientDetails,
              imageDownload,
              logoImageDownload,
              footerCaption
            );
            if (fileUrl !== null) {
              prescriptionData.prescriptionFile = fileUrl;
            } else {
              return resHelperFail(
                res,
                400,
                "Failed to generate General Prescription File",
                req.headers["kong-request-id"]
              );
            }
          }

          const addPrescriptionData: any = await PrescriptionModel.create(
            prescriptionData
          );
          if (addPrescriptionData) {
            const produce = async () => {
              const amqpServer = process.env.RABBIT_URL;
              const connection = await amqp.connect(amqpServer);
              const channel = await connection.createChannel();
              await channel.assertQueue("prescription-scheduler");
              const prescriptionDetailsData: any = {
                uhid: addPrescriptionData.uhid,
                doctorId: addPrescriptionData.doctorId,
                doctorAdvise: addPrescriptionData.doctorAdvise,
                labInvestigationAdvise:
                  addPrescriptionData.labInvestigationAdvise,
                medicines: addPrescriptionData.medicines,
                others: addPrescriptionData.others,
                prescriptionType: addPrescriptionData.prescriptionType,
                consulationId: addPrescriptionData.consulationId,
                prescriptionFile: addPrescriptionData.prescriptionFile,
                glassPrescriptionType: "Form",
                glassPrescriptionFile:
                  addPrescriptionData.glassPrescriptionFile,
                glassPrescription: addPrescriptionData.glassPrescription,
                facilityCode: addPrescriptionData.facilityCode,
                realmName: req.headers.realmName,
              };
              await channel.sendToQueue(
                "prescription-scheduler",
                Buffer.from(JSON.stringify(prescriptionDetailsData))
              );

              await channel.assertQueue("prescription-report");
              await channel.sendToQueue(
                "prescription-report",
                Buffer.from(JSON.stringify(prescriptionDetailsData))
              );

              await channel.assertQueue("prescription-analytics");
              await channel.sendToQueue(
                "prescription-analytics",
                Buffer.from(JSON.stringify(prescriptionDetailsData))
              );
              logs(
                `Send prescription details to analytics through: prescription-analytics, ${prescriptionDetailsData}`,
                req
              );
              await channel.close();
              await connection.close();
            };
            produce().catch(
              // tslint:disable-next-line:no-console
              console.error
            );
            await resHelperSuccess(
              res,
              201,
              `Successfully added Prescription`,
              {
                prescription: addPrescriptionData,
              }
            );
          } else {
            return resHelperFail(
              res,
              400,
              "Failed to add Prescription.",
              req.headers["kong-request-id"]
            );
          }
        }
        if (req.body.prescriptionType === "Image") {
          const prescriptionData = {
            uhid,
            doctorId: req.body.doctorId,
            prescriptionType: req.body.prescriptionType,
            consulationId: req.body.consulationId,
            prescriptionFile:
              typeof req.file !== "undefined"
                ? (req.file as Express.MulterS3.File).location
                : "",
            facilityCode: req.body.facilityCode,
          };
          const addPrescriptionData: any = await PrescriptionModel.create(
            prescriptionData
          );
          if (addPrescriptionData) {
            const produce = async () => {
              const amqpServer = process.env.RABBIT_URL;
              const connection = await amqp.connect(amqpServer);
              const channel = await connection.createChannel();
              await channel.assertQueue("prescription-scheduler");
              const prescriptionDetailsData: any = {
                uhid: addPrescriptionData.uhid,
                doctorId: addPrescriptionData.doctorId,
                doctorAdvise: null,
                labInvestigationAdvise: null,
                medicines: null,
                others: null,
                prescriptionType: addPrescriptionData.prescriptionType,
                consulationId: addPrescriptionData.consulationId,
                prescriptionFile: addPrescriptionData.prescriptionFile,
                facilityCode: addPrescriptionData.facilityCode,
                realmName: req.headers.realmName,
              };
              await channel.sendToQueue(
                "prescription-scheduler",
                Buffer.from(JSON.stringify(prescriptionDetailsData))
              );
              logs(
                `Send prescription details to analytics through: prescription-scheduler, ${prescriptionDetailsData}`,
                req
              );
              await channel.assertQueue("prescription-report");
              await channel.sendToQueue(
                "prescription-report",
                Buffer.from(JSON.stringify(prescriptionDetailsData))
              );
              logs(
                `Send prescription details to analytics through: prescription-report, ${prescriptionDetailsData}`,
                req
              );
              await channel.assertQueue("prescription-analytics");
              await channel.sendToQueue(
                "prescription-analytics",
                Buffer.from(JSON.stringify(prescriptionDetailsData))
              );
              logs(
                `Send prescription details to analytics through: prescription-analytics, ${prescriptionDetailsData}`,
                req
              );
              await channel.close();
              await connection.close();
            };
            produce().catch(
              // tslint:disable-next-line:no-console
              console.error
            );
            await resHelperSuccess(
              res,
              201,
              `Successfully added Prescription`,
              {
                prescription: addPrescriptionData,
              }
            );
          } else {
            logs("Failed to add Prescription.", req);
            return resHelperFail(
              res,
              400,
              "Failed to add Prescription.",
              req.headers["kong-request-id"]
            );
          }
        }
      } else {
        logs("There is no patient with this uhid", req);
        return resHelperFail(
          res,
          404,
          "There is no patient with this uhid",
          req.headers["kong-request-id"]
        );
      }
    }
  } catch (error) {
    logs(error.message, req, "error");
    return resHelperFail(
      res,
      400,
      error.message,
      req.headers["kong-request-id"]
    );
  }
};

const createPdf = async (
  prescriptionData: any,
  patientDetails: any,
  imageDownload: any,
  logoImageDownload: any,
  footerCaption: string
) => {
  try {
    const currentDateTime = dayjs()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD-HH-mm-ss");
    const fileName =
      "Rx-" + prescriptionData.consulationId + "-" + currentDateTime + ".pdf";

    let healthCardNo: any = "";
    for (const hc of patientDetails.healthCardNumber) {
      if (hc.status === true) {
        healthCardNo = hc.id;
      }
    }
    // patientDetails.healthCardNumber.map((hc: any) => {
    // });

    const doc = new PDFDocument({ size: "A4", margin: 50 });
    generateHeader(doc);
    generatePatientDetails(doc);
    generatePatientVitals(doc);
    generatePrescriptionDetails(doc);
    generateDoctorSignature(doc);
    generateFooter(doc);
    doc.end();
    function generateHeader(docHeader: any) {
      // doc.image('./iKure-logo.jpeg', 50, 45, { width: 60 })
      doc
        .image(logoImageDownload, 50, 50, { width: 100 })
        .fillColor("#444444")
        // .fontSize(20)
        // .text('IKure Techsoft Pvt.Ltd.', 140, 57)
        .fontSize(10)
        .text(`Patient UHID: ${prescriptionData.uhid}`, 200, 50, {
          align: "right",
        })
        .text(`HealthCard No.: ${healthCardNo}`, 200, 65, {
          align: "right",
        })
        .text(`Date: ${dayjs().format("DD-MM-YYYY")}`, 200, 80, {
          align: "right",
        })
        .moveDown();
      doc.fillColor("#444444").fontSize(18).text("Prescription", 250, 120);
    }

    function generatePatientDetails(docPatientInfo: any) {
      doc.fillColor("#444444").fontSize(15).text("Patient", 50, 155);
      // doc.moveDown()
      // doc.lin

      generateHr(doc, 175);
      const customerInformationTop = 185;
      let dobOrAge: any;
      if (patientDetails.demographicDetails.age) {
        dobOrAge = patientDetails.demographicDetails.age;
      } else {
        dobOrAge = dayjs(dayjs().format("YYYY-MM-DD")).diff(
          dayjs(patientDetails.demographicDetails.birthDate),
          "year"
        );
      }
      doc
        .fontSize(10)
        .text("Name:", 50, customerInformationTop)
        .font("Helvetica-Bold")
        .text(patientDetails.name, 130, customerInformationTop)
        .font("Helvetica")
        .text("Gender:", 50, customerInformationTop + 15)
        .text(
          patientDetails.demographicDetails.sex,
          130,
          customerInformationTop + 15
        )
        .text("Age:", 50, customerInformationTop + 30)
        .text(
          dobOrAge,
          // formatCurrency(invoice.subtotal - invoice.paid),
          130,
          customerInformationTop + 30
        )

        .text("Phone:", 300, customerInformationTop)
        .text(
          patientDetails.demographicDetails.telecom,
          380,
          customerInformationTop
        )

        .text("Address:", 300, customerInformationTop + 15)
        .text(
          `${patientDetails.addresses.addressLines.addressSiteName}, ${patientDetails.addresses.district}, ${patientDetails.addresses.state}-${patientDetails.addresses.postalCode}`,
          380,
          customerInformationTop + 15,
          {
            width: 195,
          }
        )

        // .font("Helvetica-Bold")
        // .text(invoice.shipping.name, 300, customerInformationTop)
        // .font("Helvetica")
        // .text(invoice.shipping.address, 300, customerInformationTop + 15)
        // .text(
        // invoice.shipping.city +
        //     ", " +
        //     invoice.shipping.state +
        //     ", " +
        //     invoice.shipping.country,
        // 300,
        // customerInformationTop + 30
        // )
        .moveDown();

      // PDFDocument.lineTo(50, 160);
      generateHr(doc, 235);
    }

    function generatePatientVitals(docPatientInfo: any) {
      doc.fillColor("#444444").fontSize(15).text("Vitals", 50, 255);
      // doc.moveDown()
      // doc.lin

      generateHr(doc, 275);
      const vitalsTop = 285;
      let dobOrAge: any;
      if (patientDetails.demographicDetails.birthDate) {
        dobOrAge = patientDetails.demographicDetails.birthDate;
      } else {
        dobOrAge = patientDetails.demographicDetails.age;
      }
      doc
        .fontSize(10)
        .text("Height:", 50, vitalsTop)
        .font("Helvetica")
        .text(prescriptionData.height, 140, vitalsTop)
        .font("Helvetica")
        .text("Weight:", 50, vitalsTop + 15)
        .text(prescriptionData.weight, 140, vitalsTop + 15)
        .text("Temperature:", 50, vitalsTop + 30)
        .text(
          prescriptionData.temperature,
          // formatCurrency(invoice.subtotal - invoice.paid),
          140,
          vitalsTop + 30
        )
        .text("Blood Glucose:", 50, vitalsTop + 45)
        .text(
          prescriptionData.bloodGlucose,
          // formatCurrency(invoice.subtotal - invoice.paid),
          140,
          vitalsTop + 45
        )

        .text("BP:", 300, vitalsTop)
        .text(prescriptionData.bloodPressure, 390, vitalsTop)

        .text("Oxygen Saturation:", 300, vitalsTop + 15)
        .text(prescriptionData.oxygenSaturation, 390, vitalsTop + 15)

        .text("Pulse:", 300, vitalsTop + 30)
        .text(prescriptionData.pulse, 390, vitalsTop + 30)

        .text("Hemoglobin:", 300, vitalsTop + 45)
        .text(prescriptionData.hemoglobin, 390, vitalsTop + 45)

        // .font("Helvetica-Bold")
        // .text(invoice.shipping.name, 300, customerInformationTop)
        // .font("Helvetica")
        // .text(invoice.shipping.address, 300, customerInformationTop + 15)
        // .text(
        // invoice.shipping.city +
        //     ", " +
        //     invoice.shipping.state +
        //     ", " +
        //     invoice.shipping.country,
        // 300,
        // customerInformationTop + 30
        // )
        .moveDown();

      // PDFDocument.lineTo(50, 160);
      generateHr(doc, 350);
    }

    function generatePrescriptionDetails(prescriptionItems: any) {
      const prescriptionTableTop = 345;
      doc
        .fillColor("#444444")
        .fontSize(15)
        .text("Patient Complaints", 50, prescriptionTableTop + 20);

      doc
        .fillColor("#444444")
        .fontSize(12)
        .text(prescriptionData.patientComplaint, 75, prescriptionTableTop + 40);

      doc
        .fillColor("#444444")
        .fontSize(15)
        .text("Doctor Advice", 50, prescriptionTableTop + 80);

      doc
        .fillColor("#444444")
        .fontSize(12)
        .text(prescriptionData.doctorAdvise, 75, prescriptionTableTop + 100);

      doc
        .fillColor("#444444")
        .fontSize(15)
        .text("Lab Investigation Advice", 50, prescriptionTableTop + 140);

      doc
        .fillColor("#444444")
        .fontSize(12)
        .text(
          prescriptionData.labInvestigationAdvise,
          75,
          prescriptionTableTop + 160
        );

      doc
        .fillColor("#444444")
        .fontSize(15)
        .text("Medicines", 50, prescriptionTableTop + 200);

      doc
        .fillColor("#444444")
        .fontSize(12)
        .text(prescriptionData.medicines, 75, prescriptionTableTop + 220);

      doc
        .fillColor("#444444")
        .fontSize(15)
        .text("Other Suggestions", 50, prescriptionTableTop + 300);

      doc
        .fillColor("#444444")
        .fontSize(12)
        .text(prescriptionData.others, 75, prescriptionTableTop + 320);
    }

    function generateDoctorSignature(docFooter: any) {
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .text(
          `${prescriptionData.doctorName}(${prescriptionData.licenseNumber})`,
          65,
          doc.page.height - 105,
          {
            align: "left",
          }
        );

      doc
        .fontSize(12)
        .font("Helvetica")
        .text("Medical Officers Name", 62, doc.page.height - 80, {
          align: "left",
        });

      doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, doc.page.height - 85)
        .lineTo(200, doc.page.height - 85)
        .stroke();

      // doc.fontSize(12).text(
      //     'Medical Officers Signature',
      //     doc.page.width - 200,
      //     doc.page.height - 105
      // );
      doc.image(imageDownload, doc.page.width - 200, doc.page.height - 140, {
        width: 150,
        height: 60,
      });

      doc
        .fontSize(12)
        .text(
          "Medical Officers Signature",
          doc.page.width - 200,
          doc.page.height - 80
        );

      doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(doc.page.width - 200, doc.page.height - 85)
        .lineTo(doc.page.width - 50, doc.page.height - 85)
        .stroke();
    }

    function generateFooter(docFooter: any) {
      // doc.fillColor('#444444').fontSize(20).text('Patient', 50, 160);
      generateHr(doc, doc.page.height - 67);
      // doc.fontSize(10).text('A CSR Initiative of '),
      //     165,
      //     doc.page.height - 50,
      //     {
      //         lineBreak: false
      //     }
      // ).text('Adani Foundation').text('Implemented by ').text('iKure').text('.')
      doc
        .fillColor("#444444")
        .fontSize(1)
        .text("", 75, doc.page.height - 63);
      doc.moveDown();
      doc.fontSize(10).text(footerCaption, {
        lineBreak: true,
        continued: true,
        align: "center",
      });
      // .text('A CSR Initiative of ', 165, doc.page.height - 50, {
      //     lineBreak: false,
      //     continued: true
      // })
      // .font('Helvetica-Bold')
      // .text(footerCaption, { lineBreak: false, continued: true })
      // .font('Helvetica')
      // .text(' - Implemented by ', {
      //     lineBreak: false,
      //     continued: true
      // })
      // .font('Helvetica-Bold')
      // .text('iKure', { lineBreak: false, continued: true })
      // .font('Helvetica')
      // .text('.', { lineBreak: false });
    }

    function generateHr(docs: any, y: any) {
      doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
    }

    const prescriptionUpload = await uploadFile(fileName, doc);
    if (prescriptionUpload) {
      return prescriptionUpload;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const createPdfPrescription = async (
  prescriptionData: any,
  patientDetails: any,
  imageDownload: any,
  logoImageDownload: any,
  footerCaption: string
) => {
  try {
    const currentDateTime = dayjs()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD-HH-mm-ss");
    const fileName =
      "RxG-" + prescriptionData.consulationId + "-" + currentDateTime + ".pdf";

    let healthCardNo: any = "";
    for (const hc of patientDetails.healthCardNumber) {
      if (hc.status === true) {
        healthCardNo = hc.id;
      }
    }
    // patientDetails.healthCardNumber.map((hc: any) => {
    // });

    const doc = new PDFDocument({ size: "A4", margin: 50 });
    generateHeader(doc);
    generatePatientDetails(doc);
    generatePatientVitals(doc);
    generateGlassPrescriptionDetails(doc);
    generateDoctorSignature(doc);
    generateFooter(doc);
    doc.end();
    function generateHeader(docHeader: any) {
      // doc.image('./iKure-logo.jpeg', 50, 45, { width: 60 })
      doc
        .image(logoImageDownload, 50, 50, { width: 100 })
        .fillColor("#444444")
        // .fontSize(20)
        // .text('IKure Techsoft Pvt.Ltd.', 140, 57)
        .fontSize(10)
        .text(`Patient UHID: ${prescriptionData.uhid}`, 200, 50, {
          align: "right",
        })
        .text(`HealthCard No.: ${healthCardNo}`, 200, 65, {
          align: "right",
        })
        .text(`Date: ${dayjs().format("DD-MM-YYYY")}`, 200, 80, {
          align: "right",
        })
        .moveDown();
      doc
        .fillColor("#444444")
        .fontSize(18)
        .text("Glass Prescription", 225, 120);
    }

    function generatePatientDetails(docPatientInfo: any) {
      doc.fillColor("#444444").fontSize(15).text("Patient", 50, 155);
      // doc.moveDown()
      // doc.lin

      generateHr(doc, 175);
      const customerInformationTop = 185;
      let dobOrAge: any;
      if (patientDetails.demographicDetails.age) {
        dobOrAge = patientDetails.demographicDetails.age;
      } else {
        dobOrAge = dayjs(dayjs().format("YYYY-MM-DD")).diff(
          dayjs(patientDetails.demographicDetails.birthDate),
          "year"
        );
      }
      doc
        .fontSize(10)
        .text("Name:", 50, customerInformationTop)
        .font("Helvetica-Bold")
        .text(patientDetails.name, 130, customerInformationTop)
        .font("Helvetica")
        .text("Gender:", 50, customerInformationTop + 15)
        .text(
          patientDetails.demographicDetails.sex,
          130,
          customerInformationTop + 15
        )
        .text("Age:", 50, customerInformationTop + 30)
        .text(
          dobOrAge,
          // formatCurrency(invoice.subtotal - invoice.paid),
          130,
          customerInformationTop + 30
        )

        .text("Phone:", 300, customerInformationTop)
        .text(
          patientDetails.demographicDetails.telecom,
          380,
          customerInformationTop
        )

        .text("Address:", 300, customerInformationTop + 15)
        .text(
          `${patientDetails.addresses.addressLines.addressSiteName}, ${patientDetails.addresses.district}, ${patientDetails.addresses.state}-${patientDetails.addresses.postalCode}`,
          380,
          customerInformationTop + 15,
          {
            width: 195,
          }
        )

        // .font("Helvetica-Bold")
        // .text(invoice.shipping.name, 300, customerInformationTop)
        // .font("Helvetica")
        // .text(invoice.shipping.address, 300, customerInformationTop + 15)
        // .text(
        // invoice.shipping.city +
        //     ", " +
        //     invoice.shipping.state +
        //     ", " +
        //     invoice.shipping.country,
        // 300,
        // customerInformationTop + 30
        // )
        .moveDown();

      // PDFDocument.lineTo(50, 160);
      generateHr(doc, 235);
    }

    function generatePatientVitals(docPatientInfo: any) {
      doc.fillColor("#444444").fontSize(15).text("Vitals", 50, 255);
      // doc.moveDown()
      // doc.lin

      generateHr(doc, 275);
      const vitalsTop = 285;
      let dobOrAge: any;
      if (patientDetails.demographicDetails.birthDate) {
        dobOrAge = patientDetails.demographicDetails.birthDate;
      } else {
        dobOrAge = patientDetails.demographicDetails.age;
      }
      doc
        .fontSize(10)
        .text("Height:", 50, vitalsTop)
        .font("Helvetica")
        .text(prescriptionData.height, 140, vitalsTop)
        .font("Helvetica")
        .text("Weight:", 50, vitalsTop + 15)
        .text(prescriptionData.weight, 140, vitalsTop + 15)
        .text("Temperature:", 50, vitalsTop + 30)
        .text(
          prescriptionData.temperature,
          // formatCurrency(invoice.subtotal - invoice.paid),
          140,
          vitalsTop + 30
        )
        .text("Blood Glucose:", 50, vitalsTop + 45)
        .text(
          prescriptionData.bloodGlucose,
          // formatCurrency(invoice.subtotal - invoice.paid),
          140,
          vitalsTop + 45
        )

        .text("BP:", 300, vitalsTop)
        .text(prescriptionData.bloodPressure, 390, vitalsTop)

        .text("Oxygen Saturation:", 300, vitalsTop + 15)
        .text(prescriptionData.oxygenSaturation, 390, vitalsTop + 15)

        .text("Pulse:", 300, vitalsTop + 30)
        .text(prescriptionData.pulse, 390, vitalsTop + 30)

        .text("Hemoglobin:", 300, vitalsTop + 45)
        .text(prescriptionData.hemoglobin, 390, vitalsTop + 45)

        // .font("Helvetica-Bold")
        // .text(invoice.shipping.name, 300, customerInformationTop)
        // .font("Helvetica")
        // .text(invoice.shipping.address, 300, customerInformationTop + 15)
        // .text(
        // invoice.shipping.city +
        //     ", " +
        //     invoice.shipping.state +
        //     ", " +
        //     invoice.shipping.country,
        // 300,
        // customerInformationTop + 30
        // )
        .moveDown();

      // PDFDocument.lineTo(50, 160);
      generateHr(doc, 350);
    }

    function generateGlassPrescriptionDetails(prescriptionItems: any) {
      const prescriptionTableTop = 345;
      doc
        .fillColor("#444444")
        .fontSize(12)
        .text("Rx:", 50, prescriptionTableTop + 20);

      doc
        .fillColor("#444444")
        .fontSize(10)
        .text(
          prescriptionData.glassPrescription.rx,
          140,
          prescriptionTableTop + 20
        );

      doc
        .fillColor("#444444")
        .fontSize(12)
        .text("Glass Prescription:", 50, prescriptionTableTop + 40);

      const table = prescriptionTableTop + 60;
      doc
        .strokeColor("#aaaaaa") // horizontal 1
        .lineWidth(2)
        .moveTo(80, table)
        .lineTo(530, table)
        .stroke();

      doc
        .strokeColor("#aaaaaa") // horizontal 2
        .lineWidth(2)
        .moveTo(80, table + 20)
        .lineTo(530, table + 20)
        .stroke();

      doc
        .strokeColor("#aaaaaa") // horizontal 3
        .lineWidth(2)
        .moveTo(80, table + 45)
        .lineTo(530, table + 45)
        .stroke();

      doc
        .strokeColor("#aaaaaa") // horizontal 4
        .lineWidth(2)
        .moveTo(80, table + 75)
        .lineTo(530, table + 75)
        .stroke();

      doc
        .strokeColor("#aaaaaa") // horizontal 5
        .lineWidth(2)
        .moveTo(80, table + 105)
        .lineTo(530, table + 105)
        .stroke();

      doc
        .strokeColor("#aaaaaa") // vertical 1
        .lineWidth(2)
        .moveTo(80, table)
        .lineTo(80, table + 105)
        .stroke();

      doc
        .strokeColor("#aaaaaa") // vertical 2
        .lineWidth(2)
        .moveTo(162, table)
        .lineTo(162, table + 105)
        .stroke();

      doc
        .strokeColor("#aaaaaa") // vertical 3
        .lineWidth(2)
        .moveTo(208, table + 20)
        .lineTo(208, table + 105)
        .stroke();

      doc
        .strokeColor("#aaaaaa") // vertical 4
        .lineWidth(2)
        .moveTo(254, table + 20)
        .lineTo(254, table + 105)
        .stroke();

      doc
        .strokeColor("#aaaaaa") // vertical 5
        .lineWidth(2)
        .moveTo(300, table + 20)
        .lineTo(300, table + 105)
        .stroke();

      doc
        .strokeColor("#aaaaaa") // vertical 6
        .lineWidth(2)
        .moveTo(346, table)
        .lineTo(346, table + 105)
        .stroke();

      doc
        .strokeColor("#aaaaaa") // vertical 7
        .lineWidth(2)
        .moveTo(392, table + 20)
        .lineTo(392, table + 105)
        .stroke();

      doc
        .strokeColor("#aaaaaa") // vertical 8
        .lineWidth(2)
        .moveTo(438, table + 20)
        .lineTo(438, table + 105)
        .stroke();

      doc
        .strokeColor("#aaaaaa") // vertical 9
        .lineWidth(2)
        .moveTo(484, table + 20)
        .lineTo(484, table + 105)
        .stroke();

      doc
        .strokeColor("#aaaaaa") // vertical 10
        .lineWidth(2)
        .moveTo(530, table)
        .lineTo(530, table + 105)
        .stroke();

      doc
        .fillColor("#444444") // Distance
        .fontSize(12)
        .text("Distance", 97, table + 28);

      doc
        .fillColor("#444444") // Near Add
        .fontSize(12)
        .text("Near Add", 96, table + 84);

      doc
        .fillColor("#444444") // Right Eye
        .fontSize(12)
        .text("Right Eye", 228, table + 5);

      doc
        .fillColor("#444444") // Left Eye
        .fontSize(12)
        .text("Left Eye", 417, table + 5);

      doc
        .fillColor("#444444") // RDSPH
        .fontSize(12)
        .text("DSPH", 169, table + 28);

      doc
        .fillColor("#444444") // RDCYL
        .fontSize(12)
        .text("DCYL", 215, table + 28);

      doc
        .fillColor("#444444") // RAXIS
        .fontSize(12)
        .text("AXIS", 263, table + 28);

      doc
        .fillColor("#444444") // RVA
        .fontSize(12)
        .text("VA", 315, table + 28);

      doc
        .fillColor("#444444") // LDSPH
        .fontSize(12)
        .text("DSPH", 353, table + 28);

      doc
        .fillColor("#444444") // LDCYL
        .fontSize(12)
        .text("DCYL", 399, table + 28);

      doc
        .fillColor("#444444") // LAXIS
        .fontSize(12)
        .text("AXIS", 447, table + 28);

      doc
        .fillColor("#444444") // LVA
        .fontSize(12)
        .text("VA", 499, table + 28);

      doc
        .fillColor("#444444") // RDSPHV1
        .fontSize(10)
        .text(
          prescriptionData.glassPrescription.rightEye.sphereForDistance,
          171,
          table + 55
        );

      doc
        .fillColor("#444444") // RDCYLV1
        .fontSize(10)
        .text(
          prescriptionData.glassPrescription.rightEye.cylinderForDistance,
          217,
          table + 55
        );

      doc
        .fillColor("#444444") // RAXISV1
        .fontSize(10)
        .text(
          prescriptionData.glassPrescription.rightEye.axisForDistance,
          265,
          table + 55
        );

      doc
        .fillColor("#444444") // RVAV1
        .fontSize(10)
        .text(
          prescriptionData.glassPrescription.rightEye.vaForDistance,
          317,
          table + 55
        );

      doc
        .fillColor("#444444") // LDSPHV1
        .fontSize(10)
        .text(
          prescriptionData.glassPrescription.leftEye.sphereForDistance,
          355,
          table + 55
        );

      doc
        .fillColor("#444444") // LDCYLV1
        .fontSize(10)
        .text(
          prescriptionData.glassPrescription.leftEye.cylinderForDistance,
          401,
          table + 55
        );

      doc
        .fillColor("#444444") // LAXISV1
        .fontSize(10)
        .text(
          prescriptionData.glassPrescription.leftEye.axisForDistance,
          449,
          table + 55
        );

      doc
        .fillColor("#444444") // LVAV1
        .fontSize(10)
        .text(
          prescriptionData.glassPrescription.leftEye.vaForDistance,
          501,
          table + 55
        );

      doc
        .fillColor("#444444") // RDSPHV2
        .fontSize(10)
        .text(
          prescriptionData.glassPrescription.rightEye.sphereForNearAdd,
          171,
          table + 85
        );

      doc
        .fillColor("#444444") // RDCYLV2
        .fontSize(10)
        .text(
          prescriptionData.glassPrescription.rightEye.cylinderForNearAdd,
          217,
          table + 85
        );

      doc
        .fillColor("#444444") // RAXISV2
        .fontSize(10)
        .text(
          prescriptionData.glassPrescription.rightEye.axisForNearAdd,
          265,
          table + 85
        );

      doc
        .fillColor("#444444") // RVAV2
        .fontSize(10)
        .text(
          prescriptionData.glassPrescription.rightEye.vaForNearAdd,
          317,
          table + 85
        );

      doc
        .fillColor("#444444") // LDSPHV2
        .fontSize(10)
        .text(
          prescriptionData.glassPrescription.leftEye.sphereForNearAdd,
          355,
          table + 85
        );

      doc
        .fillColor("#444444") // LDCYLV2
        .fontSize(10)
        .text(
          prescriptionData.glassPrescription.leftEye.cylinderForNearAdd,
          401,
          table + 85
        );

      doc
        .fillColor("#444444") // LAXISV2
        .fontSize(10)
        .text(
          prescriptionData.glassPrescription.leftEye.axisForNearAdd,
          449,
          table + 85
        );

      doc
        .fillColor("#444444") // LVAV2
        .fontSize(10)
        .text(
          prescriptionData.glassPrescription.leftEye.vaForNearAdd,
          501,
          table + 85
        );

      doc
        .fillColor("#444444")
        .fontSize(12)
        .text("PID:", 50, prescriptionTableTop + 185);

      doc
        .fillColor("#444444")
        .fontSize(10)
        .text(
          prescriptionData.glassPrescription.pid,
          140,
          prescriptionTableTop + 185
        );

      if (
        prescriptionData.glassPrescription.dv !== undefined &&
        prescriptionData.glassPrescription.nv !== undefined
      ) {
        doc
          .fillColor("#444444")
          .fontSize(12)
          .text(
            `For DV: ${prescriptionData.glassPrescription.dv}mm / For NV: ${prescriptionData.glassPrescription.nv}mm`,
            300,
            prescriptionTableTop + 185
          );
      } else {
        doc
          .fillColor("#444444")
          .fontSize(12)
          .text(
            `For DV:     mm / For NV:     mm`,
            300,
            prescriptionTableTop + 185
          );
      }

      doc
        .fillColor("#444444")
        .fontSize(12)
        .text("Lens Advised:", 50, prescriptionTableTop + 205);

      doc
        .fillColor("#444444")
        .fontSize(10)
        .text(
          prescriptionData.glassPrescription.lensAdviced,
          140,
          prescriptionTableTop + 205
        );

      doc
        .fillColor("#444444")
        .fontSize(12)
        .text("Referred:", 300, prescriptionTableTop + 205);

      doc
        .fillColor("#444444")
        .fontSize(10)
        .text(
          prescriptionData.glassPrescription.referred,
          390,
          prescriptionTableTop + 205
        );

      doc
        .fillColor("#444444")
        .fontSize(12)
        .text("Medicine:", 50, prescriptionTableTop + 225);

      doc
        .fillColor("#444444")
        .fontSize(10)
        .text(prescriptionData.medicines, 75, prescriptionTableTop + 245);

      doc
        .fillColor("#444444")
        .fontSize(12)
        .text("Remark:", 50, prescriptionTableTop + 305);

      doc
        .fillColor("#444444")
        .fontSize(10)
        .text(
          prescriptionData.glassPrescription.remark,
          75,
          prescriptionTableTop + 325
        );
    }

    function generateDoctorSignature(docFooter: any) {
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .text(
          `${prescriptionData.doctorName}(${prescriptionData.licenseNumber})`,
          65,
          doc.page.height - 105,
          {
            align: "left",
          }
        );

      doc
        .fontSize(12)
        .font("Helvetica")
        .text("Medical Officers Name", 62, doc.page.height - 80, {
          align: "left",
        });

      doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, doc.page.height - 85)
        .lineTo(200, doc.page.height - 85)
        .stroke();

      // doc.fontSize(12).text(
      //     'Medical Officers Signature',
      //     doc.page.width - 200,
      //     doc.page.height - 105
      // );
      doc.image(imageDownload, doc.page.width - 200, doc.page.height - 140, {
        width: 150,
        height: 60,
      });

      doc
        .fontSize(12)
        .text(
          "Medical Officers Signature",
          doc.page.width - 200,
          doc.page.height - 80
        );

      doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(doc.page.width - 200, doc.page.height - 85)
        .lineTo(doc.page.width - 50, doc.page.height - 85)
        .stroke();
    }

    function generateFooter(docFooter: any) {
      // doc.fillColor('#444444').fontSize(20).text('Patient', 50, 160);
      generateHr(doc, doc.page.height - 67);
      // doc.fontSize(10).text('A CSR Initiative of '),
      //     165,
      //     doc.page.height - 50,
      //     {
      //         lineBreak: false
      //     }
      // ).text('Adani Foundation').text('Implemented by ').text('iKure').text('.')
      doc
        .fillColor("#444444")
        .fontSize(1)
        .text("", 75, doc.page.height - 63);
      doc.moveDown();
      doc.fontSize(10).text(footerCaption, {
        lineBreak: true,
        continued: true,
        align: "center",
      });
      // .text('A CSR Initiative of ', 165, doc.page.height - 50, {
      //     lineBreak: false,
      //     continued: true
      // })
      // .font('Helvetica-Bold')
      // .text(footerCaption, { lineBreak: false, continued: true })
      // .font('Helvetica')
      // .text(' - Implemented by ', {
      //     lineBreak: false,
      //     continued: true
      // })
      // .font('Helvetica-Bold')
      // .text('iKure', { lineBreak: false, continued: true })
      // .font('Helvetica')
      // .text('.', { lineBreak: false });
    }

    function generateHr(docs: any, y: any) {
      doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
    }

    const prescriptionUpload = await uploadFile(fileName, doc);
    if (prescriptionUpload) {
      return prescriptionUpload;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
