import * as types from './../constants/types';

const INITIAL_STATE = {
    productList: [],
    loading: false,
    error: null,
    cartItems: []
}

const productsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.FETCH_PRODUCTS_LOADING:
            return {
                ...state,
                loading: true,
                error: null,
                productList: []
            }
        case types.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                productList: action.payload
            }
        case types.FETCH_PRODUCTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case types.PRESERVE_PRODUCT_DETAILS:
            return {
                ...state,
                selectedProduct: action.payload
            }
        case types.ADD_PRODUCT_TO_CART:
            return {
                ...state,
                cartItems: [...state.cartItems, action.payload]
            }
        case types.INCREMENT_CART_ITEM_COUNT:
            const newCartItems = state.cartItems.map((o, i) => {
                if(action.payload === i){
                    o.cartCount = o.cartCount+1
                }
                return o;
            })
            // newCartItems[action.payload].cartCount = newCartItems[action.payload].cartCount+1;
            console.log('NEW CART ITEEMS ==================>', action.payload);
            return {
                ...state,
                cartItems: newCartItems
            }

        case types.DECREMENT_CART_ITEM_COUNT:
            const updatedCart = state.cartItems.map((o, i) => {
                if(action.payload === i){
                    o.cartCount = o.cartCount+1
                }
                return o;
            })
            return {
                ...state,
                cartItems: updatedCart
            }

        case types.REMOVE_PRODUCT_FROM_CART:
            const cartItems = state.cartItems.filter((o, i) => i !== action.payload);
            return {
                ...state,
                cartItems
            }

        case types.CLEAR_CART:
            return {
                ...state,
                cartItems: []
            }

        default:
            return state;
    }
}

export default productsReducer;