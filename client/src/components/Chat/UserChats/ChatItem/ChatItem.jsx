import s from "./ChatItem.module.css";
import {NavLink} from "react-router-dom";

const ChatItem = (props) => {
    return <NavLink to={`chat/${props.id}`} className={({isActive}) => (isActive ? s.activeLink : "") + " " + s.chatItem}>
        <div className={s.chatItem__photo}></div>
        <div className={s.chatItem__info}>
            <h6 className={s.chatItem__info__username}>{props.username}</h6>
            <p className={s.chatItem__info__lastMessage}>{props.lastMessage ? props.lastMessage : ''}</p>
        </div>
    </NavLink>
}

export default ChatItem;