import * as types from './../constants/types';

const INITIAL_STATE = {
    loading: false,
    token: null,
    error: null,
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
        default:
            return state;    
    }
}

export default userReducer;