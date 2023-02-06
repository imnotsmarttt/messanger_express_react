import {
    CHANGE_USERNAME_VALUE,
    CHANGE_PASSWORD_VALUE,
    CHANGE_PASSWORD2_VALUE,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL, AUTH_ME, LOGOUT
} from '../actions/auth'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: localStorage.getItem('token') ? true : false,
    user: null,
    username: '',
    password: '',
    password2: ''
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_USERNAME_VALUE: {
            return {...state, username: action.username}
        }
        case CHANGE_PASSWORD_VALUE: {
            return {...state, password: action.password}
        }
        case CHANGE_PASSWORD2_VALUE: {
            return {...state, password2: action.password2}
        }
        case LOGIN_SUCCESS: {
            localStorage.setItem('token', action.token)
            return {
                ...state,
                isAuthenticated: true,
                username: '',
                password: '',
                password2: ''
            }
        }
        case LOGOUT:
        case LOGIN_FAIL: {
            localStorage.removeItem('token')
            return {
                ...state,
                isAuthenticated: false,
                username: '',
                password: '',
                password2: ''
            }
        }
        case LOAD_USER_SUCCESS: {
            return {
                ...state,
                user: action.user
            }
        }
        case LOAD_USER_FAIL: {
            return {
                ...state,
                user: null
            }
        }
        default:
            return state
    }
}

export default authReducer;