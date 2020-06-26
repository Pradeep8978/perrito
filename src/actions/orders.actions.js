import * as types from './../constants/types';
import Axios from 'axios';
import { API_BASE_URL } from './../constants/config';

const fetchOrdersLoading = () => ({
    type: types.FETCH_ORDERS_LOADING
})

const fetchOrdersSuccess = (data) => ({
    type: types.FETCH_ORDERS_SUCCESS,
    payload: data
})

const fetchOrdersFailure = (err) => ({
    type: types.FETCH_ORDERS_FAILURE,
    payload: err
})

export const saveDeliveryAddress = (data) => ({
    type: types.SAVE_DELIVERY_ADDRESS,
    payload: data
})

export const fetchOrders = searchStr => dispatch => {
    dispatch(fetchOrdersLoading());
    let url = `${API_BASE_URL}/orders/order/list`;
    // if(searchStr){
    //     url = `${url}?search=${searchStr}`;
    // }
    Axios.get(url)
    .then(res => {
        console.log("Ordera List ==============>", res.data)
        dispatch(fetchOrdersSuccess(res.data))
    })
    .catch(err => {
        dispatch(fetchOrdersFailure(err))
    })
}