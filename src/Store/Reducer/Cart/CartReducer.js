import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    INCREASE_QTY,
    DECREASE_QTY
} from "../../Action/Cart/CartAction";


import {
  SELECT_ADDRESS
} from "../../Action/Customer/SelectAddressAction";


import CartItem from "../../../Models/CartItem"



const initialState = {
    items: {},
    totalAmount: 0,
    addressId: "",
    customer_id: ""
};
  
export default function cartReducer(state = initialState, action) {
    switch (action.type) {
      case ADD_TO_CART:
        const addedProduct = action.product;
        const productName = addedProduct.product_name
        const imageUrl = addedProduct.image_url
        const size = action.size;
        const color = action.color;
        const qty = parseInt(action.quantity);
        const netPrice = parseFloat(action.netPrice)
        const storeId = action.store
        let total_amount

        let updatedOrNewCartItem;
        if (state.items[addedProduct.product_id]) {
          total_amount = state.totalAmount - state.items[addedProduct.product_id].total_price + netPrice * qty
        }
        else{
          total_amount = state.totalAmount + netPrice * qty
        }
          updatedOrNewCartItem = new CartItem(
                                              qty, 
                                              productName, 
                                              color, 
                                              size, 
                                              netPrice, 
                                              storeId, 
                                              imageUrl, 
                                              netPrice * qty
                                            );

        return {
          ...state,
          items: { ...state.items, [addedProduct.product_id]: updatedOrNewCartItem },
          totalAmount: total_amount
        };
  


  
      case REMOVE_FROM_CART:
        const selectedCartItem = state.items[action.product_id];
        const currentQuantity = selectedCartItem.quantity;
        let updatedCartItems;
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.product_id];

        return {
          ...state,
          items: updatedCartItems,
          totalAmount: state.totalAmount - selectedCartItem.total_price,
        };





















      
        case INCREASE_QTY:
          const selectedItem = state.items[action.pid];
          const curQty = selectedItem.quantity
          let newUpdatedCartItems;

          if(curQty > 0){
            const newUpdatedCartItem = new CartItem(
                                                    selectedItem.quantity+1, 
                                                    selectedItem.product_name, 
                                                    selectedItem.color, 
                                                    selectedItem.size, 
                                                    // selectedItem.address, 
                                                    selectedItem.net_price, 
                                                    // selectedItem.customer_id, 
                                                    selectedItem.store_id, 
                                                    selectedItem.image_url,
                                                    selectedItem.total_price + selectedItem.net_price
                                                  );
            newUpdatedCartItems = { ...state.items, [action.pid]: newUpdatedCartItem}
          }

          return {
            ...state,
            items: newUpdatedCartItems,
            totalAmount: state.totalAmount + selectedItem.net_price
          };


          case DECREASE_QTY:
            const selectedProduct = state.items[action.pid];
            const currentQty = selectedProduct.quantity
            let updatedCartItem;
            let newTotal

            if(currentQty > 1){
              updatedCartItem = new CartItem(
                selectedProduct.quantity - 1, 
                selectedProduct.product_name, 
                selectedProduct.color, 
                selectedProduct.size, 
                // selectedProduct.address, 
                selectedProduct.net_price, 
                // selectedProduct.customer_id, 
                selectedProduct.store_id, 
                selectedProduct.image_url,
                selectedProduct.total_price - selectedProduct.net_price
              );
              updatedCartItem = { ...state.items, [action.pid]: updatedCartItem}
              newTotal = state.totalAmount - selectedProduct.net_price
            }
            else{
              updatedCartItem = { ...state.items}
              newTotal = state.totalAmount
            }

          return {
            ...state,
            items: updatedCartItem,
            totalAmount: newTotal
          };
      

          
            
      
              



        case SELECT_ADDRESS:
          return {
            ...state,
            addressId:action.payload
          }
  
    // SWITCH ENDS
    }
  
    return state;
  
  };
  

  