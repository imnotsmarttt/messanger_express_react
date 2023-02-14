import s from "./InputMessage.module.css";
import React from "react";

const InputMessage = (props) => {
    const inputRef = React.createRef()
    return (
        <div className={s.inputWrapper}>
            <input className={s.chatAreaWrapper__input}
                   ref={inputRef}
                   placeholder='Type your message here'
                   value={props.messageValue}
                   onChange={() => props.changeMessageValue(inputRef.current.value)}/>
            <button onClick={props.sendMessage} className={s.sendBtn}></button>
        </div>
    )
}

export default InputMessage