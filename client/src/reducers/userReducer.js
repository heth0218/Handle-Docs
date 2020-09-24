import { REGISTER_USER, USER_ERROR, LOGIN_USER, LOGOUT } from '../actions/types';

const initialState = {
    user: null,
    error: null,
    current: null,
    isAuthenticated: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
        case REGISTER_USER:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                user: action.payload.user,
                isAuthenticated: true,
                current: action.payload.user
            }
        case USER_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                user: null,
                isAuthenticated: false
            }
        default:
            return { ...state }
    }
}