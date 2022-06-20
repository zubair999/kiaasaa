import { combineReducers } from 'redux';

import StoreReducer from './Store/StoreReducer';
import ProductReducer from './Product/ProductReducer';
import AuthReducer from './Auth/AuthReducer';
import OrderReducer from './Order/OrderReducer';
import AddressReducer from './Address/AddressReducer';
import CartReducer from './Cart/CartReducer';
import StateReducer from './State/StateReducer';
import ColorReducer from './Color/ColorReducer';
import FilterReducer from './Product/FilterReducer';
import SizeReducer from './Size/getSizeListReducer';
import getcurrentpos from './currentLati&LongiReducer';
import localTokenReducer from '../Reducer/Auth/GetTokenLocalReducer'

export default combineReducers({
    Store:StoreReducer,
    Product:ProductReducer,
    Customer:AuthReducer,
    Order:OrderReducer,
    Address:AddressReducer,
    Cart:CartReducer,
    State:StateReducer,
    Color:ColorReducer,
    Filter:FilterReducer,
    Size:SizeReducer,   
    CurrentPos:getcurrentpos,
    LocalToken:localTokenReducer,
    

})