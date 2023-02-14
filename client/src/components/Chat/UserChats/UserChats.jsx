import s from './UserChats.module.css'
import ChatItem from "./ChatItem/ChatItem";
import {getCompanion} from "../../../scripts/scripts";


const UserChats = (props) => {
    const userChats = props.myChats.map(chat => {
        return <ChatItem key={chat.id} id={chat.id}
                         username={chat.type === "CHAT" ? getCompanion(props.currentUsername, chat.members) : chat.name}
                         lastMessage={chat.messages[0].message} type={chat.type}/>
    })

    return (
        <div className={s.chatListWrapper}>
            <div className={s.searchWrapper}></div>
            <div className={s.chatsWrapper}>
                {userChats}
            </div>
        </div>
    )
}

export default UserChats