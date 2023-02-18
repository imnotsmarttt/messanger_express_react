import React from 'react'
import s from './UserChats.module.css'
import ChatItem from "./ChatItem/ChatItem";
import {getCompanion} from "../../../scripts/scripts";


const UserChats = (props) => {
    const userChats = props.myChats.map(chat => {
        const chatType = !chat.type ? "USER" : chat.type
        if (chatType === 'USER') {
            var chatName = chat.username
        } else if (chatType === "CHAT") {
            var chatName = getCompanion(props.currentUsername, chat.members)
        } else {
            var chatName = chat.name
        }

        return <ChatItem key={chat.id} id={chat.id}
                         chatName={chatName} lastMessage={chatType === 'USER' ? [] : chat.messages}/>
    })

    const searchRef = React.createRef()

    return (
        <div className={s.chatListWrapper}>
            <div className={s.searchWrapper}>
                <input className={s.searchInput}
                       placeholder='Search'
                       ref={searchRef}
                       value={props.searchValue}
                       onChange={() => props.changeSearchValue(searchRef.current.value)}/>
            </div>
            <div className={s.chatsWrapper}>
                {userChats}
            </div>
        </div>
    )
}

export default UserChats