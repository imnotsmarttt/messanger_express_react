import s from './UserChats.module.css'
import ChatItem from "./ChatItem/ChatItem";


const UserChats = (props) => {
    const userChats = props.myChats.map(chat => {
        return <ChatItem key={chat.id} id={chat.id}
                         username={chat.members[0].username}
                         lastMessage={chat.messages[0].message} type={chat.type}/>
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