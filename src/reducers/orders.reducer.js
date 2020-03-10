import * as types from './../constants/types';

const INITIAL_STATE = {
    orderList: [],
    loading: false,
    error: null,
    deliveryAddress: null
}

const ordersReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.FETCH_ORDERS_LOADING:
            return {
                ...state,
                loading: true,
                error: null,
                orderList: []
            }
        case types.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                loading: false,
                orderList: action.payload
            }
        case types.FETCH_ORDERS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
       case types.SAVE_DELIVERY_ADDRESS:
           return {
               ...state,
               deliveryAddress: action.payload
           }

        default:
            return state;
    }
}

export default ordersReducer;