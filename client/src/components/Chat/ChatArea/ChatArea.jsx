import React from "react";
import s from "./ChatArea.module.css";
import Message from "./Message/Message";


const ChatArea = (props) => {
    const messageRef = React.createRef()
    const messages = props.messages ? props.messages.map(m => {
        return <Message key={m.id} username={m.user.username} message={m.message}/>
    }) : ''

    const sendMessage = async () => {
        const createdMessage = await props.sendMessage(props.id, messageRef.current.value)

        props.socket.emit('message_create', {
                chatId: props.id,
                messageId: createdMessage.messageData.id,
                message: createdMessage.messageData.message,
                createdAt: createdMessage.messageData.createdAt,
                user: createdMessage.messageData.user
            }
        )
    }

    return (
        <div className={s.chatAreaWrapper}>
            <div>{messages}</div>
            <div className={s.sendMessageWrapper}>
                <input className={s.chatAreaWrapper__input}
                       ref={messageRef}
                       placeholder='Message'
                       value={props.messageValue} onChange={() => props.changeMessageValue(messageRef.current.value)}/>
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    )
}

export default ChatArea
