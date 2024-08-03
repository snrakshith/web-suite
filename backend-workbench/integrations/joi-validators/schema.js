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

const validationError = createPOJoiSchema.validate(req.body);

if (validationError.error) {
  return resHelperFail(res, 400, `${validationError.error.details[0].message}`);
}
