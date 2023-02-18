import s from "./ChatItem.module.css";
import {NavLink} from "react-router-dom";

const ChatItem = (props) => {
    const lmData = props.lastMessage.length > 0 ? props.lastMessage[0] : {message: ''}
    const lm = lmData.message.length > 10 ? `${lmData.message.slice(0, 21)}...` : lmData.message
    const createdAt = lmData.message ? new Date(Date.parse(lmData.createdAt)) : ''
    return (
        <NavLink to={`chat/${props.id}`} className={({isActive}) => (isActive ? s.activeLink : "") + " " + s.chatItem}>
            <div className={s.chatItem__photo}></div>
            <div className={s.chatItem__info}>
                <h6 className={s.chatItem__info__username}>{props.chatName}</h6>
                <p className={s.chatItem__info__lastMessage}>{lm}</p>
                <p className={s.chatItem__info__lastMessage_createdAt}>{!createdAt ? '' : `${createdAt.getHours()}:${createdAt.getMinutes()}`}</p>
            </div>
        </NavLink>
    )
}

export default ChatItem;