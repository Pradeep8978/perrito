import * as types from './../constants/types';

const INITIAL_STATE = {
    loading: false,
    token: null,
    error: null,
    profile: {}
}
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SIGNUP_STARTED:
        case types.LOGIN_STARTED:
            return {
                ...state,
                loading: true,
                token: null,
                error: null
            }
        case types.SIGNUP_SUCCESS:
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.payload.token,
            }
        case types.SIGNUP_FAILURE:
        case types.LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case types.FETCH_PROFILE_LOADING:
        case types.UPDATE_PROFILE_LOADING:
            return {
                ...state,
                profileLoading: false,
                profile: {},
                profileError: null,
            }
        case types.FETCH_PROFILE_SUCCESS:
        case types.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                profileLoading: false,
                profile: action.payload,
            }
        case types.FETCH_PROFILE_FAILURE:
        case types.UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                profileLoading: false,
                profileError: action.payload,
            }   
        default:
            return state;
    }
}

export default userReducer;