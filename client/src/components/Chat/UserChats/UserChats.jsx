import s from './UserChats.module.css'
import {Link} from "react-router-dom";

const UserChats = (props) => {

    const userChats = props.myChats.map(chat => {
        return chat ? (
            <Link to={`${chat.id}`} className={s.chatItem}>
                <div className={s.chatItem__photo}></div>
                <div className={s.chatItem__info}>
                    <h6 className={s.chatItem__info__username}>{chat.members[0].username}</h6>
                    <p className={s.chatItem__info__lastMessage}>{chat.messages[0] ? chat.messages[0].message : ''}</p>
                </div>
            </Link>
        ) : null
    })

    return (
        <div>
            <div className={s.searchWrapper}></div>
            <div className={s.chatsWrapper}>
                {userChats}
            </div>
        </div>
    )
}

export default UserChats