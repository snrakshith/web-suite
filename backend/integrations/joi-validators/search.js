const checkIndentExistence = await Indents.findOne({
  $and: [
    {
      _id: req.body.indentReferenceId,
      indentRequestId: req.body.indentId,
    },
  ],
});

const getPurchaseOrder = await PurchaseOrders.findById(
  req.query.purchaseOrderId
)
  .lean()
  .populate("products.productId")
  .populate("vendorId")
  .populate("indentReferenceId");
