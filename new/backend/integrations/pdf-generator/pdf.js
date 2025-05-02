import PDFDocument from "pdfkit";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);

export const createPostPdf = async (poData, vendorData) => {
  try {
    const currentDateTime = dayjs()
      .tz("Asia/Kolkata")
      .format("YYYY-MM-DD-HH-mm-ss");
    const fileName =
      "PO-" + poData.purchaseOrderId + "-" + currentDateTime + ".pdf";

    const doc = new PDFDocument({ size: "A4", margin: 5 });
    generateHeader(doc);
    generatePurchaseOrderDetails(doc);
    // generateInvoiceDetails(doc);
    generateTandC(doc);
    generateFooter(doc);
    doc.end();

    function generateHeader(docHeader) {
      doc.image("./iKure-logo.png", doc.page.width - 130, 20, {
        width: 110,
      });
      doc
        .fillColor("#444444")
        .fontSize(18)
        .font("Helvetica-Bold")
        .text("iKure Techsoft Private Limited", 170, 90)
        .fontSize(16)
        .text("Purchase Order", 240, 120);
    }

    function generatePurchaseOrderDetails(docPurchaseOrderInfo) {
      // Table 1
      const T1 = 150;

      doc
        .strokeColor("#000000") // T1H1
        .lineWidth(1)
        .moveTo(55, T1)
        .lineTo(555, T1)
        .stroke();

      doc
        .strokeColor("#000000") // T1H2
        .lineWidth(1)
        .moveTo(55, T1 + 100)
        .lineTo(555, T1 + 100)
        .stroke();

      doc
        .strokeColor("#000000") // T1V1
        .lineWidth(1)
        .moveTo(55, T1)
        .lineTo(55, T1 + 100)
        .stroke();

      doc
        .strokeColor("#000000") // T1V2
        .lineWidth(1)
        .moveTo(305, T1)
        .lineTo(305, T1 + 100)
        .stroke();

      doc
        .strokeColor("#000000") // T1V3
        .lineWidth(1)
        .moveTo(555, T1)
        .lineTo(555, T1 + 100)
        .stroke();

      doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .text("Purchase Order Placed by:", 65, T1 + 5) // Purchase Order Placed by
        .text("iKure Techsoft Private Limited", 65, T1 + 20)
        .font("Helvetica")
        .text(
          "141A, Jodhpur Garden, Near South City Mall, Kolkata 700045,  West Bengal",
          65,
          T1 + 35,
          { width: 220 }
        );

      doc.font("Helvetica-Bold").text("GSTIN: 19AACCI2837G1ZK", 65, T1 + 70); // GSTIN
      doc.text("Tel: +91 3340634188/ 24220464", 65, T1 + 85); // Tel
      doc
        .text("Order No:", 315, T1 + 5) // Order No
        .text(poData.purchaseOrderId, 365, T1 + 5);
      doc
        .text("Date:", 315, T1 + 20) // Date
        .font("Helvetica")
        .text(dayjs(poData.createdAt).format("DD-MM-YYYY"), 350, T1 + 20);
      doc
        .font("Helvetica-Bold")
        .text("Supplier’s Reference:", 315, T1 + 35) // Supplier’s Reference
        .font("Helvetica")
        .text("Email/Online", 423, T1 + 35);
      doc
        .font("Helvetica-Bold")
        .text("Quotation No:", 315, T1 + 50) // Quotation No
        .font("Helvetica")
        .text("Online", 395, T1 + 50);
      doc
        .font("Helvetica-Bold")
        .text("Quotation Date:", 315, T1 + 65) // Quotation Date
        .font("Helvetica")
        .text(dayjs(poData.createdAt).format("DD-MM-YYYY"), 400, T1 + 65);

      // Table 2
      const T2 = 270;

      doc
        .strokeColor("#000000") // T2H1
        .lineWidth(1)
        .moveTo(55, T2)
        .lineTo(555, T2)
        .stroke();

      doc
        .strokeColor("#000000") // T2H2
        .lineWidth(1)
        .moveTo(55, T2 + 20)
        .lineTo(555, T2 + 20)
        .stroke();

      doc
        .strokeColor("#000000") // T2H3
        .lineWidth(1)
        .moveTo(55, T2 + 120)
        .lineTo(555, T2 + 120)
        .stroke();

      doc
        .strokeColor("#000000") // T2V1
        .lineWidth(1)
        .moveTo(55, T2)
        .lineTo(55, T2 + 120)
        .stroke();

      doc
        .strokeColor("#000000") // T2V2
        .lineWidth(1)
        .moveTo(305, T2)
        .lineTo(305, T2 + 120)
        .stroke();

      doc
        .strokeColor("#000000") // T2V3
        .lineWidth(1)
        .moveTo(555, T2)
        .lineTo(555, T2 + 120)
        .stroke();

      doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .text("Selected Vendor:", 140, T2 + 5); // Selected Vendor
      doc.text("Delivery Details:", 395, T2 + 5); // Delivery Details
      doc
        .text(vendorData.vendorName, 65, T2 + 25)
        .font("Helvetica")
        .text(
          `${vendorData.addresses.addressLines.addressSiteName}, ${vendorData.addresses.district}, ${vendorData.addresses.state}-${vendorData.addresses.postalCode}`,
          65,
          T2 + 40,
          { width: 220 }
        );
      doc.font("Helvetica-Bold").text("GSTIN:", 65, T2 + 75); // GSTIN
      doc
        .font("Helvetica-Bold")
        .text("Contact Person:", 65, T2 + 90) // Contact Person1
        .font("Helvetica")
        .text(vendorData.email, 150, T2 + 90);
      doc
        .font("Helvetica-Bold")
        .text("Phone:", 65, T2 + 105) // Phone
        .font("Helvetica")
        .text(`${vendorData.telecom}`, 110, T2 + 105);
      doc
        .font("Helvetica-Bold")
        .text("iKure Techsoft Private Limited", 315, T2 + 25)
        .font("Helvetica")
        .text(
          "141A, Jodhpur Garden, Near South City Mall, Kolkata 700045,  West Bengal",
          315,
          T2 + 40,
          { width: 220 }
        );
      doc
        .font("Helvetica-Bold")
        .text("Tel: +91 3340634188/ 24220464", 315, T2 + 90); // Tel
      doc.text("Contact Person:", 315, T2 + 105); // Contact Person2

      // Table 3
      const T3 = 410;

      doc
        .strokeColor("#000000") // T3H1
        .lineWidth(1)
        .moveTo(55, T3)
        .lineTo(555, T3)
        .stroke();

      doc
        .strokeColor("#000000") // T3H2
        .lineWidth(1)
        .moveTo(55, T3 + 20)
        .lineTo(555, T3 + 20)
        .stroke();
      doc
        .strokeColor("#000000") // T3H3
        .lineWidth(1)
        .moveTo(55, T3 + 150)
        .lineTo(555, T3 + 150)
        .stroke();
      doc
        .strokeColor("#000000") // T3H4
        .lineWidth(1)
        .moveTo(55, T3 + 165)
        .lineTo(555, T3 + 165)
        .stroke();

      doc
        .strokeColor("#000000") // T3H5
        .lineWidth(1)
        .moveTo(55, T3 + 180)
        .lineTo(555, T3 + 180)
        .stroke();

      doc
        .strokeColor("#000000") // T3V1
        .lineWidth(1)
        .moveTo(55, T3)
        .lineTo(55, T3 + 180)
        .stroke();

      doc
        .strokeColor("#000000") // T3V2
        .lineWidth(1)
        .moveTo(85, T3)
        .lineTo(85, T3 + 180)
        .stroke();

      doc
        .strokeColor("#000000") // T3V3
        .lineWidth(1)
        .moveTo(305, T3)
        .lineTo(305, T3 + 180)
        .stroke();

      doc
        .strokeColor("#000000") // T3V4
        .lineWidth(1)
        .moveTo(345, T3)
        .lineTo(345, T3 + 180)
        .stroke();
      doc
        .strokeColor("#000000") // T3V5
        .lineWidth(1)
        .moveTo(405, T3)
        .lineTo(405, T3 + 180)
        .stroke();
      doc
        .strokeColor("#000000") // T3V6
        .lineWidth(1)
        .moveTo(480, T3)
        .lineTo(480, T3 + 180)
        .stroke();

      doc
        .strokeColor("#000000") // T3V7
        .lineWidth(1)
        .moveTo(555, T3)
        .lineTo(555, T3 + 180)
        .stroke();

      doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .text("Sl No.", 56, T3 + 5); // Sl No.
      doc.text("Description", 160, T3 + 5); // Description
      doc.text("UOM", 314, T3 + 5); // UOM
      doc.text("Quantity", 355, T3 + 5); // Quantity
      doc.text("Unit Price", 420, T3 + 5); // Unit Price
      doc.text("Total Price", 490, T3 + 5); // Total Price
      doc.text("Total Amount", 409, 578); // Total Amount
      doc.font("Helvetica").text("(Plus) GST @", 210, 563); // GST

      const productsT3 = T3 + 10;
      for (let i = 0, cord = 15; i < poData.products.length; i++, cord += 15) {
        doc
          .fontSize(10)
          .text((i + 1).toString(), 58, productsT3 + cord)
          .text(poData.products[i].productName, 90, productsT3 + cord)
          .text(poData.products[i].totalQuantity, 310, productsT3 + cord)
          .text(poData.products[i].ratePerUnit, 350, productsT3 + cord)
          .text(poData.products[i].discount, 410, productsT3 + cord)
          .text(poData.products[i].totalPriceValue, 485, productsT3 + cord);
      }

      doc
        .font("Helvetica")
        .text(poData.totalGST ? poData.totalGST : "", 485, 563); // GST
      doc.font("Helvetica-Bold").text(poData.totalAmount, 485, 578); // Total Amount

      // doc.fontSize(10)
      //     .font('Helvetica-Bold')
      //     .text(
      //         '(Rupees Seven Lakh Seven Thousand seven hundred seventy seven Only)',
      //         250,
      //         600,
      //         { width: 300 }
      //     );
    }

    function generateTandC(TandCData) {
      doc
        .fillColor("#444444")
        .fontSize(10)
        .font("Helvetica-Bold")
        .text("Terms & Conditions", 50, doc.page.height - 213, {
          lineBreak: false,
        });
      doc
        .font("Helvetica")
        .list(
          [
            "The amount of above order is inclusive of all taxes applicable.",
            "No extra amount will be payable for transportation, packaging etc.",
            "Required document for release of payment:",
          ],
          70,
          doc.page.height - 193,
          {
            align: "left",
            listType: "bullet",
            bulletRadius: 2,
          }
        );
      doc
        .font("Helvetica")
        .list(
          [
            "- Original Invoice Copy with proper stamp & signature.",
            "- Original Challan Copy with proper stamp & signature.",
          ],
          80,
          doc.page.height - 156,
          {
            align: "left",
            listType: "bullet",
            bulletRadius: 0.01,
          }
        );
      doc
        .font("Helvetica")
        .list(
          [
            "Payment Terms: As discussed & accepted i.e. after complete delivery of mentioned items.",
            "Payment will be made by cheque or through bank transfer.",
            "Delivery Date:  On or before :-",
          ],
          70,
          doc.page.height - 131,
          {
            align: "left",
            listType: "bullet",
            bulletRadius: 2,
          }
        );
      doc.text(
        "Kindly sign the duplicate copy and return the same to us to signify acceptance all the terms & conditions mentioned above.",
        60,
        doc.page.height - 88,
        { width: 500 }
      );
    }

    function generateFooter(docFooter) {
      generateHr(doc, doc.page.height - 50);

      doc
        .fillColor("#444444")
        .fontSize(10)
        .font("Helvetica-Bold")
        .text(
          "iKure TechSoft Pvt Ltd",
          // orgDetails.invoiceOrgName,
          40,
          doc.page.height - 40,
          {
            lineBreak: false,
          }
        );
      doc
        .text("Address:", 40, doc.page.height - 20, {
          lineBreak: false,
        })
        .font("Helvetica")
        .text(
          "141-A, Jodhpur Gardens, Kolkata-700045",
          // `${orgDetails.organizationAddresses.district}, ${orgDetails.organizationAddresses.state}-${orgDetails.organizationAddresses.postalCode}`,
          90,
          doc.page.height - 20,
          {
            lineBreak: false,
          }
        );

      doc
        .font("Helvetica-Bold")
        .text(`Tel:`, doc.page.width - 180, doc.page.height - 40, {
          lineBreak: false,
        })
        .font("Helvetica")
        .text(
          "033-40634188/24220464",
          // `${orgDetails.organizationAddresses.district}, ${orgDetails.organizationAddresses.state}-${orgDetails.organizationAddresses.postalCode}`,
          doc.page.width - 150,
          doc.page.height - 40,
          {
            lineBreak: false,
          }
        );
      doc
        .font("Helvetica-Bold")
        .text(`Web:`, doc.page.width - 180, doc.page.height - 20, {
          lineBreak: false,
        })
        .font("Helvetica")
        .text(
          "www.ikuretechsoft.com",
          // `${orgDetails.organizationAddresses.district}, ${orgDetails.organizationAddresses.state}-${orgDetails.organizationAddresses.postalCode}`,
          doc.page.width - 150,
          doc.page.height - 20,
          {
            lineBreak: false,
          }
        );
    }

    function generateHr(docs, y) {
      doc
        .strokeColor("#aaaaaa")
        .lineWidth(1)
        .moveTo(25, y)
        .lineTo(575, y)
        .stroke();
    }

    const poUpload = await uploadFile(fileName, doc);
    if (poUpload) {
      console.log(poUpload);
      return poUpload;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error.message);
    return false;
  }
};
