import * as types from './../constants/types';
import Axios from 'axios';
import { API_BASE_URL } from './../constants/config';


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


//FETCH PROFILE
const fetchUserProfileLoading = () => ({
    type: types.FETCH_PROFILE_LOADING
});

const fetchUserProfileSuccess = (data) => ({
    type: types.FETCH_PROFILE_SUCCESS,
    payload: data
});

const fetchUserProfileFailure = (error) => ({
    type: types.FETCH_PROFILE_FAILURE,
    payload: error
});


//UPDATE PROFILE
const updateUserProfileLoading = () => ({
    type: types.UPDATE_PROFILE_LOADING
});

const updateUserProfileSuccess = (data) => ({
    type: types.UPDATE_PROFILE_SUCCESS,
    payload: data
});

const updateUserProfileFailure = (error) => ({
    type: types.UPDATE_PROFILE_FAILURE,
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

export const fetchUserProfile = () => dispatch => {
    dispatch(fetchUserProfileLoading());
    const url = `${API_BASE_URL}/customers/profile`;
    Axios.get(url)
        .then(res => {
            console.log('PROFILE =>', res.data)
            dispatch(fetchUserProfileSuccess(res.data));
        })
        .catch(err => {
            dispatch(fetchUserProfileFailure(err));
        })
}

export const updateUserProfile = (profileData) => dispatch => {
    dispatch(updateUserProfileLoading());
    const url = `${API_BASE_URL}/customers/profile/update`;
    Axios.post(url, profileData)
        .then(res => {
            dispatch(updateUserProfileSuccess(res.data));
        })
        .catch(err => {
            dispatch(updateUserProfileFailure(err));
        })
}