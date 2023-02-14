import React from "react";
import s from './Message.module.css'

const Message = (props) => {
    const date = new Date(Date.parse(props.createdAt))
    return (

        <div className={`${s.messageWrapper} ${props.username === props.currentUsername.username ? s.myMessage : ''}`}>
            <p className={s.messageText}>{props.message}</p>
            <p className={s.messageCreated}>{`${date.getHours()}:${date.getMinutes()}`}</p>
        </div>
    )
}

export default Message;