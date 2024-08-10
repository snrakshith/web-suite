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
