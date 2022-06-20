class CartItem {
    constructor(quantity, product_name, color, size, net_price, store_id, image_url, total_price) {
      this.quantity = quantity
      this.product_name = product_name;
      this.color = color;
      this.size = size;
      this.net_price = net_price;
      this.store_id = store_id;
      this.image_url = image_url;
      this.total_price = total_price;
    }
}
  
export default CartItem;
  