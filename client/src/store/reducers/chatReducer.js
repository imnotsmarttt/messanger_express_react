import {
    FETCH_MY_CHATS,
    CHANGE_MESSAGE_VALUE, GET_CHAT, SEND_MESSAGE
} from '../actions/chat'

const initialStore = {
    chats: [],
    currentChat: {
        messages: []
    },
    message: ''
}

const chatReducer = (store=initialStore, action) => {
    switch (action.type) {
        case FETCH_MY_CHATS: {
            return {
                ...store,
                chats: action.chats
            }
        }
        case CHANGE_MESSAGE_VALUE: {
            return {
                ...store,
                message: action.message
            }
        }
        case GET_CHAT: {
            return {
                ...store,
                currentChat: action.chat
            }
        }
        case SEND_MESSAGE: {
            const storeCopy = {
                ...store
            }
            storeCopy.currentChat.messages.push(action.message)
            storeCopy.message = ''
            return storeCopy
        }
        default: return store
    }
}


export default chatReducer