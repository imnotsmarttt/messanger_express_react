import s from "./ChatInfo.module.css";
import React from "react";

const ChatInfo = (props) => {
    return (
        <div className={s.chatInfoWrapper}>
            <div className={s.userPhoto}></div>
            <div className={s.chatInfo}>
                <p className={s.chatName}>Name</p>
                <p className={s.lastOnline}>last online</p>
            </div>
            <div className={s.buttons}>
                <button className={`${s.btn} ${s.search}`}></button>
                <button className={`${s.btn} ${s.more}`}></button>
            </div>
        </div>
    )
}

export default ChatInfo