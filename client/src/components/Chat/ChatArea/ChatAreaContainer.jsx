import React, {useEffect} from "react";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import io from 'socket.io-client';
import {changeMessageValue, getChat, sendMessage, setMessage} from "../../../store/actions/chat";
import ChatArea from "./ChatArea";

const socket = io.connect("http://localhost:8000", {transports: ['websocket', 'polling', 'flashsocket']});

const ChatAreaContainer = (props) => {
    const {id} = useParams('id')
    useEffect(() => {
        props.getChat(id)

        socket.on('connect')
        socket.emit('join_room', id)
        socket.on('message_receive', (data) => {
            props.setMessage(data.messageId, data.message, data.createdAt, data.user, data.chatId)
        })

        return () => {
            socket.emit('leave_room', id)
            socket.off('join_room')
            socket.off('message_receive')
        }
    }, [id, socket])

    const sendMessage = async () => {
        const createdMessage = await props.sendMessage(id, props.messageValue)
        socket.emit('message_create', {
                chatId: id,
                messageId: createdMessage.messageData.id,
                message: createdMessage.messageData.message,
                createdAt: createdMessage.messageData.createdAt,
                user: createdMessage.messageData.user
            }
        )
    }

    return (
        <ChatArea id={id} user={props.user}
                  messageValue={props.messageValue} changeMessageValue={props.changeMessageValue}
                  messages={props.messages} sendMessage={sendMessage}
        />
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        messageValue: state.chat.message,
        messages: state.chat.currentChat.messages
    }
}

export default connect(mapStateToProps, {
    changeMessageValue,
    getChat,
    sendMessage,
    setMessage,
})(ChatAreaContainer)