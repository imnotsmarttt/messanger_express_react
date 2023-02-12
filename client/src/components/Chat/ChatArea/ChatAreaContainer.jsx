import React, {useEffect} from "react";
import ChatArea from "./ChatArea";
import {connect} from "react-redux";
import {changeMessageValue, getChat, sendMessage, setMessage} from "../../../store/actions/chat";
import {useParams} from "react-router-dom";

import io from 'socket.io-client';

const socket = io.connect("http://localhost:8000", {transports: ['websocket', 'polling', 'flashsocket']});

const ChatAreaContainer = (props) => {
    const {id} = useParams('id')
    useEffect(() => {
        props.getChat(id)

        socket.on('connect')
        socket.emit('join_room', id)
        socket.on('message_receive', (data) => {
            props.setMessage(data.messageId, data.message, data.createdAt, data.user)
        })

        return () => {
            socket.on('disconnect', id)
            socket.off('join_room')
            socket.off('message_receive')
        }
    }, [id])

    return (
        <>
        <ChatArea id={id} socket={socket} user={props.user}
                  messageValue={props.messageValue} changeMessageValue={props.changeMessageValue}
                  messages={props.messages} sendMessage={props.sendMessage} setMessage={props.setMessage}
                  getCurrentUser={props.getCurrentUser}
        />
        </>
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