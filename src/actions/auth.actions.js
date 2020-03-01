import * as types from './../constants/types';
import Axios from 'axios';
import {API_BASE_URL} from './../constants/config';


//SIGNUP
const signupLoading = () => ({
    type: types.SIGNUP_STARTED
});

const signupSuccess = (data) => ({
    type: types.SIGNUP_SUCCESS,
    payload: data
});

const signupFailure = (error) => ({
    type: types.SIGNUP_FAILURE,
    payload: error
});

//LOGIN
const loginLoading = () => ({
    type: types.LOGIN_STARTED
});

const loginSuccess = (data) => ({
    type: types.LOGIN_SUCCESS,
    payload: data
});

const loginFailure = (error) => ({
    type: types.LOGIN_FAILURE,
    payload: error
});



export const signupUser = (bodyParams) => dispatch => {
    dispatch(signupLoading());
    const url = `${API_BASE_URL}/customers/signup`;
    return Axios.post(url, bodyParams)
    .then(res => {
        console.log('SUCCESS')
        Axios.defaults.headers.Authorization = res.data.token;
        dispatch(signupSuccess(res.data));
        return res;
    })
    .catch(err => {
        console.log('Error =>', err.toString())
        dispatch(signupFailure(err));
        throw err;
    })
}

export const loginUser = (bodyParams) => dispatch => {
        console.log('LOGON RES =>', bodyParams)
        dispatch(loginLoading());
    const url = `${API_BASE_URL}/customers/signin`;
    return Axios.post(url, bodyParams)
    .then(res => {
        console.log('LOGON RES =>', res.data)
        Axios.defaults.headers.Authorization = res.data.token;
        dispatch(loginSuccess(res.data));
        return res;
    })
    .catch(err => {
        console.log('Error =>', err.toString())
        dispatch(loginFailure(err));
        throw err;
    })
}