import React, {useEffect} from "react";
import ChatArea from "./ChatArea";
import {connect} from "react-redux";
import {changeMessageValue, getChat, sendMessage} from "../../../store/actions/chat";
import {useParams} from "react-router-dom";

const ChatAreaContainer = (props) => {
    const {id} = useParams('id')
    useEffect(() => {
        props.getChat(id)
    }, [id])

    return (
        <ChatArea messageValue={props.messageValue} changeMessageValue={props.changeMessageValue}
                  messages={props.messages} sendMessage={props.sendMessage} id={id}
        />
    );
}




const mapStateToProps = (state) => {
    return {
        messageValue: state.chat.message,
        messages: state.chat.currentChat.messages
    }
}

export default connect(mapStateToProps, {changeMessageValue, getChat, sendMessage})(ChatAreaContainer)