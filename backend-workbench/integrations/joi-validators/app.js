import { Response, Request } from "express";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
dayjs.extend(utc);
dayjs.extend(timezone);
import Chance from "chance";
import mongoose from "mongoose";
import Joi from "joi";
import PDFDocument from "pdfkit";
import axios from "axios";
import { getConnectionForGlobal } from "../middleware/baseConnection";
import uploadFile from "../middleware/fileUpload";

import { resHelperFail, resHelperSuccess } from "../helper/response";
import {
  checkUserRolesInToken,
  getTokenDetails,
} from "@ikuretechsoft/ikure-chw-realm-token-pkg";

export const createPurchaseOrder = async (req: Request, res: Response) => {
  try {
    const checkUser = await checkUserRolesInToken(
      req.headers.authorization,
      "ORGANIZATION_ADMIN"
    );

    if (!checkUser) {
      return resHelperFail(res, 403, "User does not have permission");
    }

    const tokenDetails = await getTokenDetails(req.headers.authorization);
    const createdByUser = tokenDetails.preferred_username;
    if (!createdByUser || createdByUser === undefined) {
      return resHelperFail(res, 400, "Failed to get the user");
    }

    const createProductSchema = Joi.object({
      productId: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid", {
              index: helpers.state.path,
            });
          }
          return value;
        })
        .messages({
          // 'any.required': 'Missing productId at row {#index}',
          // 'any.invalid':
          //     'productId at row {#index}, must be objectId',
          // 'string.base': 'productId at row {#index}, must be a string'
        }),
      unitsPerStrip: Joi.number().required().messages({
        // 'any.required': 'Missing unitsPerStrip at row {#index}',
        // 'number.base': 'unitsPerStrip at row {#index}, must be a number'
      }),
      totalStrips: Joi.number().required().messages({
        // 'any.required': 'Missing totalStrips at row {#index}',
        // 'number.base': 'totalStrips at row {#index}, must be a number'
      }),
      pricePerStrip: Joi.number().required().messages({
        // 'any.required': 'Missing pricePerStrip at row {#index}',
        // 'number.base': 'pricePerStrip at row {#index}, must be a number'
      }),
      totalUnits: Joi.number().required().messages({
        // 'any.required': 'Missing totalUnits at row {#index}',
        // 'number.base': 'totalUnits at row {#index}, must be a number'
      }),
      totalAmount: Joi.number().required().messages({
        // 'any.required': 'Missing totalAmount at row {#index}',
        // 'number.base': 'totalAmount at row {#index}, must be a number'
      }),
    });

    const createPOJoiSchema = Joi.object({
      indentId: Joi.string().required().messages({
        "any.required": "Missing indentId",
        "string.base": "indentId must be a string",
      }),
      indentReferenceId: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
          }
          return value;
        })
        .messages({
          "any.required": "Missing indentReferenceId",
          "any.invalid": "indentReferenceId is not an objectId",
          "string.base": "indentReferenceId must be a string",
        }),
      facilityCode: Joi.string().required().messages({
        "any.required": "Missing facilityCode",
        "string.base": "facilityCode must be a string",
      }),
      totalAmount: Joi.number().required().messages({
        "any.required": "Missing totalAmount",
        "number.base": "totalAmount must be a number",
      }),
      paymentStatus: Joi.string().required().valid("Due", "Paid").messages({
        "any.required": "Missing paymentStatus",
        "any.only": "paymentStatus is incorrect",
        "string.base": "paymentStatus must be a string",
      }),
      products: Joi.array().items(createProductSchema).required(),
      vendorId: Joi.string()
        .required()
        .custom((value, helpers) => {
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.error("any.invalid");
          }
          return value;
        })
        .messages({
          "any.required": "Missing vendorId",
          "any.invalid": "vendorId must be objectId",
          "string.base": "vendorId must be a string",
        }),
    }).options({ allowUnknown: true });

    const missingList = [];
    if (!req.body.indentId) {
      missingList.push("indentId");
    }
    if (!req.body.indentReferenceId) {
      missingList.push("indentReferenceId");
    }
    if (!req.body.facilityCode) {
      missingList.push("facilityCode");
    }
    if (!req.body.totalAmount) {
      missingList.push("totalAmount");
    }
    if (!req.body.paymentStatus) {
      missingList.push("paymentStatus");
    }
    if (!req.body.products) {
      missingList.push("products");
    }
    if (!req.body.vendorId) {
      missingList.push("vendorId");
    }

    if (missingList.length > 0) {
      return resHelperFail(res, 400, `Missing ${missingList}`);
    }

    const organizationId = req.headers.realmName.toString();
    // const Organization = await getConnectionForGlobal(
    //     organizationId
    // );
    // const orgDetails = await Organization.findOne({
    //     organizationId
    // });

    // const organizationResponse = await axios.get(
    //     orgDetails.logo,
    //     {
    //         responseType: 'arraybuffer'
    //     }
    // );

    // const logoImageDownload = Buffer.from(
    //     organizationResponse.data,
    //     'utf-8'
    // );

    // if (!logoImageDownload) {
    //     return resHelperFail(
    //         res,
    //         400,
    //         'Failed to download org logo'
    //     );
    // }
    const connectionModel = Object(req.headers.dynamicdb);
    const Products = connectionModel.products;
    const PurchaseOrders = connectionModel.purchaseOrders;
    const Indents = connectionModel.indents;
    const Vendors = connectionModel.vendors;

    if (!mongoose.Types.ObjectId.isValid(req.body.indentReferenceId)) {
      return resHelperFail(res, 400, "Indent ReferenceId is not an objectId");
    }
    if (!mongoose.Types.ObjectId.isValid(req.body.vendorId)) {
      return resHelperFail(res, 400, "Vendor Id is not an objectId");
    }

    if (req.body.products) {
      if (req.body.products.length === 0) {
        return resHelperFail(res, 400, "Missing products");
      } else {
        const missingProducts = [];
        const nonExistentProducts = [];

        for (const [index, eachProducts] of req.body.products.entries()) {
          if (!eachProducts.productId) {
            missingProducts.push("productId in row", index + 1);
          } else {
            const checkProducts = await Products.findById(
              eachProducts.productId
            );
            if (checkProducts) {
              if (!eachProducts.unitsPerStrip) {
                missingProducts.push(
                  "unitsPerStrip",
                  checkProducts.productName
                );
              }
              if (!eachProducts.totalStrips) {
                missingProducts.push("totalStrips", checkProducts.productName);
              }
              if (!eachProducts.totalUnits) {
                missingProducts.push("totalUnits", checkProducts.productName);
              }
              if (!eachProducts.pricePerStrip) {
                missingProducts.push(
                  "pricePerStrip",
                  checkProducts.productName
                );
              }
              if (!eachProducts.totalAmount) {
                missingProducts.push("totalAmount", checkProducts.productName);
              }
            } else {
              nonExistentProducts.push(eachProducts.productId);
            }
          }
        }

        if (missingProducts.length > 0) {
          return resHelperFail(res, 400, `Missing, ${missingProducts}`);
        }

        if (nonExistentProducts.length > 0) {
          return resHelperFail(
            res,
            404,
            `Products does not exist, ${nonExistentProducts}`
          );
        }
      }
    }

    if (req.body.paymentStatus) {
      if (
        req.body.paymentStatus !== "Due" &&
        req.body.paymentStatus !== "Paid"
      ) {
        return resHelperFail(res, 400, "Incorrect paymentStatus");
      }
    }

    const date = dayjs().tz("Asia/Kolkata");

    const chance = new Chance();
    const purchaseOrderId = "PO"
      .concat(
        dayjs().format("MM"),
        dayjs().format("DD"),
        chance.string({
          length: 4,
          alpha: false,
          numeric: true,
        })
      )
      .toString();

    const validationError = createPOJoiSchema.validate(req.body);

    if (validationError.error) {
      return resHelperFail(
        res,
        400,
        `${validationError.error.details[0].message}`
      );
    }

    const checkIndentExistence = await Indents.findOne({
      $and: [
        {
          _id: req.body.indentReferenceId,
          indentRequestId: req.body.indentId,
        },
      ],
    });

    if (checkIndentExistence) {
      if (checkIndentExistence.indentStatus !== "Accept") {
        return resHelperFail(res, 400, "Indent is not Accepted");
      }

      const checkvendor = await Vendors.findById(req.body.vendorId);
      if (checkvendor) {
        if (checkIndentExistence.products.length === 0) {
          return resHelperFail(res, 400, "There is no products in the indent");
        } else {
          const nonMatchingProducts = [];
          for (const reqProducts of req.body.products) {
            let productMatched = false;
            for (const indentProducts of checkIndentExistence.products) {
              if (
                reqProducts.productId === indentProducts.productId.toString()
              ) {
                productMatched = true;
              }
            }
            if (!productMatched) {
              nonMatchingProducts.push(reqProducts.productId);
            }
          }

          if (nonMatchingProducts.length > 0) {
            return resHelperFail(
              res,
              400,
              `Products does not match ${nonMatchingProducts}`
            );
          }
          const organizationDetails: any = {
            // invoiceOrgName: orgDetails.invoiceOrgName,
            // organizationTelecom:
            //     orgDetails.organizationTelecom,
            // organizationAddresses:
            //     orgDetails.organizationAddresses
          };

          const poUrl = await createPurchaseOrderPdf(
            {
              purchaseOrderId,
              facilityCode: req.body.facilityCode,
              totalAmount: req.body.totalAmount,
              products: req.body.products,
              vendorId: req.body.vendorId,
              poOrderStatus: "Order Placed",
              paymentStatus: req.body.paymentStatus,
              createdBy: createdByUser,
              createdByRole: "ORGANIZATION_ADMIN",
            },
            checkvendor,
            organizationDetails
          );
          if (poUrl === null) {
            return resHelperFail(
              res,
              400,
              "Failed to generate Purchase Order Invoice File"
            );
          }
          const createPO = await PurchaseOrders.create({
            purchaseOrderId,
            indentReferenceId: req.body.indentReferenceId,
            indentId: req.body.indentId,
            facilityCode: req.body.facilityCode,
            totalAmount: req.body.totalAmount,
            products: req.body.products,
            vendorId: req.body.vendorId,
            poOrderStatus: "Order Placed",
            paymentStatus: req.body.paymentStatus,
            createdBy: createdByUser,
            createdByRole: "ORGANIZATION_ADMIN",
            invoice: poUrl,
          });
          if (createPO) {
            return resHelperSuccess(
              res,
              201,
              "Successfully created the purchase order",
              { purchaseOrder: createPO }
            );
          } else {
            return resHelperFail(
              res,
              400,
              "Failed to create the purchase order"
            );
          }
        }
      } else {
        return resHelperFail(res, 404, "Vendor does not exist");
      }
    } else {
      return resHelperFail(res, 404, "Indent does not exist");
    }
  } catch (error) {
    console.log("Error:", error.message);
    return resHelperFail(res, 400, error.message);
  }
};

export const getAllPurchaseOrders = async (req: Request, res: Response) => {
  try {
    const checkFMUser = await checkUserRolesInToken(
      req.headers.authorization,
      "FACILITY_MANAGER"
    );
    const checkOrgAdminUser = await checkUserRolesInToken(
      req.headers.authorization,
      "ORGANIZATION_ADMIN"
    );

    if (!checkFMUser && !checkOrgAdminUser) {
      return resHelperFail(res, 403, "User does not have permission");
    } else {
      const connectionModel = Object(req.headers.dynamicdb);
      const Products = connectionModel.products;
      const PurchaseOrders = connectionModel.purchaseOrders;
      const Indents = connectionModel.indents;

      const getAllPOJoiSchema = Joi.object({
        facilityCode: Joi.string().required().messages({
          "any.required": "Missing facilityCode",
          "string.base": "facilityCode must be a string",
        }),
        poOrderStatus: Joi.number().valid(0, 1, 2).messages({
          "any.only": "poOrderStatus is incorrect",
          "number.base": "poOrderStatus must be a string",
        }),
        vendorId: Joi.string()
          .custom((value, helpers) => {
            if (!mongoose.Types.ObjectId.isValid(value)) {
              return helpers.error("any.invalid");
            }
            return value;
          })
          .messages({
            "any.invalid": "vendorId is not an objectId",
            "string.base": "vendorId must be a string",
          }),
        fromDate: Joi.string(),
        toDate: Joi.string(),
        page: Joi.number(),
        limit: Joi.number(),
      });

      const validationResult = getAllPOJoiSchema.validate(req.query);
      if (validationResult.error) {
        return resHelperFail(
          res,
          400,
          validationResult.error.details[0].message
        );
      }
      // if (!req.query.facilityCode) {
      //     return resHelperFail(res, 400, 'Missing facilityCode');
      // }
      const filters: any = { facilityCode: req.query.facilityCode };
      if (req.query.poOrderStatus) {
        // if (
        //     Number(req.query.poOrderStatus) !== 0 &&
        //     Number(req.query.poOrderStatus) !== 1 &&
        //     Number(req.query.poOrderStatus) !== 2
        // ) {
        //     return resHelperFail(
        //         res,
        //         400,
        //         'Incorrect purchase order orderStatus'
        //     );
        // }
        if (Number(req.query.poOrderStatus) === 0) {
          filters.poOrderStatus = "Order Placed";
        }
        if (Number(req.query.poOrderStatus) === 1) {
          filters.poOrderStatus = "Order Cancelled";
        }
        if (Number(req.query.poOrderStatus) === 2) {
          filters.poOrderStatus = "Order Completed";
        }
      }
      if (req.query.vendorId) {
        // if (
        //     !mongoose.Types.ObjectId.isValid(
        //         req.query.vendorId.toString()
        //     )
        // ) {
        //     return resHelperFail(
        //         res,
        //         400,
        //         'Vendor Id is not an objectId'
        //     );
        // }
        filters.vendorId = req.query.vendorId;
      }

      const currentDate = dayjs().tz("Asia/Kolkata").format("YYYY-MM-DD");
      const nextDate = dayjs()
        .tz("Asia/Kolkata")
        .add(1, "day")
        .format("YYYY-MM-DD");

      if (req.query.fromDate) {
        if (req.query.fromDate > currentDate) {
          return resHelperFail(res, 400, "From date cannot be a future date");
        }

        if (req.query.toDate && req.query.toDate !== "") {
          if (req.query.toDate < req.query.fromDate) {
            return resHelperFail(
              res,
              400,
              "To date cannot be a date before from date"
            );
          }

          if (req.query.toDate > currentDate) {
            return resHelperFail(res, 400, "To date cannot be a future date");
          }
          filters.createdAt = {
            $gte: req.query.fromDate,
            $lte: dayjs(req.query.toDate.toString())
              .tz("Asia/Kolkata")
              .add(1, "day")
              .format("YYYY-MM-DD"),
          };
        }
        if (!req.query.toDate) {
          filters.createdAt = {
            $gte: req.query.fromDate,
            $lte: nextDate,
          };
        }
      }
      if (req.query.toDate && req.query.toDate !== "") {
        if (!req.query.fromDate) {
          return resHelperFail(res, 400, "From date is missing");
        }
      }

      let limit = 10;
      if (req.query.limit) {
        limit = Number(req.query.limit);
      }
      const page = Number(req.query.page) || 1;
      const skip = (page - 1) * limit;

      const allPOCount = await PurchaseOrders.countDocuments(filters);

      const getPOs = await PurchaseOrders.find(filters)
        .lean()
        .populate("vendorId")
        .populate("indentReferenceId")
        .populate("products.productId")
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip);
      if (getPOs.length > 0) {
        return resHelperSuccess(
          res,
          200,
          "Purchase Orders list",
          {
            purchaseOrders: getPOs,
          },
          allPOCount
        );
      } else {
        return resHelperFail(res, 404, "There is no purchase order");
      }
    }
  } catch (error) {
    console.log("Error:", error.message);
    return resHelperFail(res, 400, error.message);
  }
};

export const getPurchaseOrderById = async (req: Request, res: Response) => {
  try {
    const checkFMUser = await checkUserRolesInToken(
      req.headers.authorization,
      "FACILITY_MANAGER"
    );
    const checkOrgAdminUser = await checkUserRolesInToken(
      req.headers.authorization,
      "ORGANIZATION_ADMIN"
    );

    if (!checkFMUser && !checkOrgAdminUser) {
      return resHelperFail(res, 403, "User does not have permission");
    } else {
      const connectionModel = Object(req.headers.dynamicdb);
      const PurchaseOrders = connectionModel.purchaseOrders;
      const Indents = connectionModel.indents;

      if (!req.query.purchaseOrderId) {
        return resHelperFail(res, 400, "Missing purchaseOrderId");
      }
      if (
        !mongoose.Types.ObjectId.isValid(req.query.purchaseOrderId.toString())
      ) {
        return resHelperFail(res, 400, "Purchase order Id is not an objectId");
      }
      const getPO = await PurchaseOrders.findById(req.query.purchaseOrderId)
        .lean()
        .populate("products.productId")
        .populate("vendorId")
        .populate("indentReferenceId");

      if (getPO) {
        return resHelperSuccess(res, 200, "Purchase Order details", {
          purchaseOrder: getPO,
        });
      } else {
        return resHelperFail(res, 404, "Purchase order does not exist");
      }
    }
  } catch (error) {
    console.log("Error:", error.message);
    return resHelperFail(res, 400, error.message);
  }
};
