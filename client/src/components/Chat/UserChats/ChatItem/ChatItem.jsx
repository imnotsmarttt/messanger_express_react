import s from "../UserChats.module.css";
import {Link} from "react-router-dom";

const ChatItem = (props) => {
    return <Link to={`chat/${props.id}`} className={s.chatItem}>
        <div className={s.chatItem__photo}></div>
        <div className={s.chatItem__info}>
            <h6 className={s.chatItem__info__username}>{props.username}</h6>
            <p className={s.chatItem__info__lastMessage}>{props.lastMessage ? props.lastMessage : ''}</p>
        </div>
    </Link>
}

export default ChatItem;