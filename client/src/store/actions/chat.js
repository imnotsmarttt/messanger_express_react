import axios from "axios";

export const FETCH_MY_CHATS = 'FETCH_MY_CHATS'
export const GET_CHAT = 'GET_CHAT'

export const CHANGE_MESSAGE_VALUE = 'CHANGE_MESSAGE_VALUE'
export const SEND_MESSAGE = 'SEND_MESSAGE'

export const changeMessageValue = (message) => {
    return {type: CHANGE_MESSAGE_VALUE, message: message}
}

export const fetchMyChats = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/chat/my`, config)
        dispatch({type: FETCH_MY_CHATS, chats: response.data.chats})
    } catch (e) {
        console.log(e)
    }
}

export const getChat = (chatId) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/chat/${chatId}`, config)
        return dispatch({type: GET_CHAT, chat: response.data.chat})
    } catch (e) {
        console.log(e)
    }
}


export const sendMessage = (chatId, message) => async dispatch => {
    const config = {
        headers: {
            'Content-type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }
    const data = {
        chatId,
        message
    }
    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/chat/message`, data, config)
        dispatch({type: SEND_MESSAGE, message: response.data.messageData})
    } catch (e) {
        console.log(e)
    }
}

