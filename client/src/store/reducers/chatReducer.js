import {
    FETCH_MY_CHATS,
    CHANGE_MESSAGE_VALUE,
    GET_CHAT,
    SEND_MESSAGE,
    SET_MESSAGE
} from '../actions/chat'

const initialStore = {
    myChats: [],
    currentChat: {
        messages: []
    },
    message: ''
}

const chatReducer = (store = initialStore, action) => {
    switch (action.type) {
        case CHANGE_MESSAGE_VALUE: {
            return {
                ...store,
                message: action.message
            }
        }
        case FETCH_MY_CHATS: {
            return {
                ...store,
                myChats: action.chats
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
                ...store,
                currentChat: {
                    messages: [...store.currentChat.messages]
                },
                myChats: [...store.myChats],
            }
            storeCopy.myChats.find(chat => chat.id === parseInt(action.chatId)).messages = [action.message]
            storeCopy.currentChat.messages.push(action.message)
            storeCopy.message = ''
            return storeCopy
        }
        case SET_MESSAGE: {
            const storeCopy = {
                ...store,
                currentChat: {
                    messages: [...store.currentChat.messages],
                },
                myChats: [...store.myChats],
            }
            storeCopy.myChats.find(chat => chat.id === parseInt(action.chatId)).messages = [action.message]
            storeCopy.currentChat.messages.push(action.message)
            return storeCopy
        }
        default:
            return store
    }
}


export default chatReducer