class Order_m {
  constructor(){
    this.dispatchBy = "";
    this.dispatchQty = "";
    this.orderId = "";
    this.orderItemId = "";
    this.productUnit = "";
    this.remarks = "";
    this.rate = "";
    this.paymentMode = "";
    this.expectedDeliveryData = "";
  }

  saveDispatchData(dispatchBy, dispatchQty, orderId, orderItemId, productUnit){
    return {
      dispatchBy: dispatchBy,
      dispatchQty: dispatchQty,
      orderId: orderId,
      orderItemId: orderItemId,
      productUnit: productUnit
    }
  }
  
}
  
export default Order_m;
  