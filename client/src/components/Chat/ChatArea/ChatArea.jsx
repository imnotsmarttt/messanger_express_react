import React from "react";
import s from "./ChatArea.module.css";
import ChatInfo from "./ChatInfo/ChatInfo";
import Messages from "./Messages/Messages";
import InputMessage from "./InputMessage/InputMessage";


const ChatArea = (props) => {
    return (
        <div className={s.chatWrapper}>
            <ChatInfo />
            <Messages messages={props.messages} user={props.user}/>
            <InputMessage messageValue={props.messageValue}
                          changeMessageValue={props.changeMessageValue}
                          sendMessage={props.sendMessage}/>
        </div>
    )
}

export default ChatArea
