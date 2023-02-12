import axios from 'axios'

export const CHANGE_USERNAME_VALUE = "CHANGE_USERNAME_VALUE"
export const CHANGE_PASSWORD_VALUE = "CHANGE_PASSWORD_VALUE"
export const CHANGE_PASSWORD2_VALUE = "CHANGE_PASSWORD2_VALUE"

export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGOUT = "LOGOUT"


export const changeUsernameValue = (username) => {
    return {type: CHANGE_USERNAME_VALUE, username: username}
}
export const changePasswordValue = (password) => {
    return {type: CHANGE_PASSWORD_VALUE, password: password}
}
export const changePassword2Value = (password2) => {
    return {type: CHANGE_PASSWORD2_VALUE, password2: password2}
}
export const login = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const data = {username, password}
    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/users/login/`, data, config)
        dispatch({type: LOGIN_SUCCESS, token: res.data.token, user: res.data.user})
    } catch (e) {
        dispatch({type: LOGOUT})
    }
}
export const register = (username, password, password2) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const data = {username, password, password2}
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/register/`, data, config)
        dispatch({type: LOGIN_SUCCESS, token: response.data.token, user: response.data.user})
    } catch (e) {
        dispatch({type: LOGOUT})
    }
}
export const checkAuth = () => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Accept': 'application/json'
        }
    }
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/users/auth`, config)
        dispatch({type: LOGIN_SUCCESS, token: response.data.token, user: response.data.user})
    } catch (e) {
        dispatch({type: LOGOUT})
    }
}
export const logout = () => {
    return {type: LOGOUT}
}