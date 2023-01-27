import axios from 'axios'

export const CHANGE_USERNAME_VALUE = "CHANGE_USERNAME_VALUE"
export const CHANGE_PASSWORD_VALUE = "CHANGE_PASSWORD_VALUE"
export const CHANGE_PASSWORD2_VALUE = "CHANGE_PASSWORD2_VALUE"


export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAIL = "LOGIN_FAIL"

export const LOAD_USER_SUCCESS = "LOAD_USER_SUCCESS"
export const LOAD_USER_FAIL = "LOAD_USER_FAIL"

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
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/users/login/`,
            {username: username, password: password}, config)
        console.log(res)
        dispatch({type: LOGIN_SUCCESS, token: res.data.token})
    } catch (e) {
        dispatch({type: LOGIN_FAIL})
    }
}

export const register = (username, password, password2) => async dispatch => {
    console.log('hello')
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/users/register/`,
            {username: username, password: password, password2: password2}, config)
        console.log(res)
        dispatch({type: LOGIN_SUCCESS, token: res.data.token})
    } catch (e) {
        console.log(e)
        dispatch({type: LOGIN_FAIL})
    }
}
