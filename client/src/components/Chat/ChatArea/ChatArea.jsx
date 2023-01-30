import React from "react";
import s from "./ChatArea.module.css";


const ChatArea = (props) => {
    const messageRef = React.createRef()
    if (props.messages) {
        var messages = props.messages.map(m => {
            return (
                <>
                    <p>{m.user.username}</p>
                    <p>{m.message}</p>
                </>
            )
        })
    } else {
        var messages = ''
    }

    return (
        <div className={s.chatAreaWrapper}>
            <div>{messages}</div>
            <div className={s.sendMessageWrapper}>
                <input className={s.chatAreaWrapper__input}
                       ref={messageRef}
                       placeholder='Message'
                       value={props.messageValue} onChange={() => props.changeMessageValue(messageRef.current.value)}/>
                <button onClick={() => props.sendMessage(props.id, messageRef.current.value)}>Send</button>
            </div>
        </div>
    )
}

export default ChatArea
