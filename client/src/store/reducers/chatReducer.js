import {
    FETCH_MY_CHATS,
    CHANGE_MESSAGE_VALUE,
    GET_CHAT,
    SEND_MESSAGE,
    SET_MESSAGE,
    CHANGE_SEARCH_VALUE,
} from '../actions/chat'

const initialStore = {
    myChats: [],
    currentChat: {
        messages: []
    },
    message: '',
    searchValue: ''
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
            debugger
            const storeCopy = {
                ...store,
                currentChat: {
                    messages: [...store.currentChat.messages]
                },
                myChats: [...store.myChats],
            }
            storeCopy.currentChat.messages.push(action.message)
            storeCopy.myChats.find(chat => chat.id === parseInt(action.chatId)).messages = [action.message]
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
        case CHANGE_SEARCH_VALUE: {
            return {...store, searchValue: action.value}
        }
        default:
            return store
    }
}


export default chatReducer