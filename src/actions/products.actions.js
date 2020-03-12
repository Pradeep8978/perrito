import * as types from './../constants/types';
import Axios from 'axios';
import {API_BASE_URL} from './../constants/config';

const fetchProductsLoading = () => ({
  type: types.FETCH_PRODUCTS_LOADING,
});

const fetchProductsSuccess = data => ({
  type: types.FETCH_PRODUCTS_SUCCESS,
  payload: data,
});

const fetchProductsFailure = err => ({
  type: types.FETCH_PRODUCTS_FAILURE,
  payload: err,
});

export const preserveProductDetails = product => ({
  type: types.PRESERVE_PRODUCT_DETAILS,
  payload: product,
});

export const addProductToCart = product => {
  const productObj = {...product, cartCount: 1};
  return {
    type: types.ADD_PRODUCT_TO_CART,
    payload: productObj,
  };
};

export const incrementCartItem = index => ({
  type: types.INCREMENT_CART_ITEM_COUNT,
  payload: index,
});

export const decrementCartItem = index => ({
  type: types.DECREMENT_CART_ITEM_COUNT,
  payload: index,
});

export const removeCartItem = index => ({
  type: types.REMOVE_PRODUCT_FROM_CART,
  payload: index,
});

export const emptyCart = () => ({
  type: types.CLEAR_CART,
});

const fetchReviewsLoading = () => ({
  type: types.FETCH_REVIEWS_LOADING,
});

const fetchReviewsSuccess = data => ({
  type: types.FETCH_REVIEWS_SUCCESS,
  payload: data,
});

const fetchReviewsFailure = err => ({
  type: types.FETCH_REVIEWS_FAILURE,
  payload: err,
});

export const fetchProducts = searchStr => dispatch => {
  dispatch(fetchProductsLoading());
  let url = `${API_BASE_URL}/products/list`;
  if (searchStr) {
    url = `${url}?search=${searchStr}`;
  }
  Axios.get(url)
    .then(res => {
      dispatch(fetchProductsSuccess(res.data));
    })
    .catch(err => {
      dispatch(fetchProductsFailure(err));
    });
};

export const fetchReviews = productId => dispatch => {
  dispatch(fetchReviewsLoading());
  let url = `${API_BASE_URL}/reviews/customerReview/list/${productId}`;

  Axios.get(url)
    .then(res => {
      console.log('res=========>', res.data);
      dispatch(fetchReviewsSuccess(res.data));
    })
    .catch(err => {
      dispatch(fetchReviewsFailure(err));
    });
};
