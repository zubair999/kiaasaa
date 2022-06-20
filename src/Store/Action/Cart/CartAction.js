export const ADD_TO_CART = "ADD_TO_CART";
export const INCREASE_QTY = "INCREASE_QTY";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const DECREASE_QTY = "DECREASE_QTY";

export const addToCart = (product, color, size, quantity, netPrice, store) => {
  return { type: ADD_TO_CART, product: product, color: color, size: size, quantity: quantity, netPrice: netPrice, store: store};
};

export const removeFromCart = (product_id) => {
  return { type: REMOVE_FROM_CART, product_id: product_id };
};

export const increaseQty = (pid) => {
  return { type: INCREASE_QTY, pid: pid};
};

export const decreaseQty = (pid) => {
  return { type: DECREASE_QTY, pid: pid};
};