import {
    CHANGE_USERNAME_VALUE,
    CHANGE_PASSWORD_VALUE,
    CHANGE_PASSWORD2_VALUE,
    LOGIN_SUCCESS,
    LOGOUT
} from '../actions/auth'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: localStorage.getItem('token') ? true : false,
    user: localStorage.getItem('user'),
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
            localStorage.setItem('user', JSON.stringify(action.user))

            return {
                ...state,
                token: action.token,
                user: JSON.stringify(action.user),
                isAuthenticated: true,
                username: '',
                password: '',
                password2: ''
            }
        }
        case LOGOUT: {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                username: '',
                password: '',
                password2: ''
            }
        }
        default:
            return state
    }
}

export default authReducer;