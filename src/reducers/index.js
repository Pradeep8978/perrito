import {combineReducers} from 'redux';
import auth from './auth.reducer';
import products from './products.reducer';
import orders from './orders.reducer';

export default combineReducers({
    auth,
    products,
    orders
})