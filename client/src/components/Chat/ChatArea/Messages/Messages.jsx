import s from "./Messages.module.css";
import React, {useEffect, useRef} from "react";
import Message from "./Message/Message";

const Messages = (props) => {
    const messages = props.messages ? props.messages.map(m => {
        return <Message key={m.id} username={m.user.username} message={m.message} createdAt={m.createdAt} currentUsername={JSON.parse(props.user)}/>
    }) : 'No messages'

    const messagesEndRef = useRef(null)
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView()
    }
    useEffect(() => {
        scrollToBottom()
    }, [messages])

    return (
        <div className={s.messagesWrapper}>
            <div className={s.messages}>
                {messages}<br/>
                <div ref={messagesEndRef} />
            </div>
        </div>
    )
}

export default Messages