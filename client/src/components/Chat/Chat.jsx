import s from './Chat.module.css'
import UserChatsContainer from "./UserChats/UserChatsContainer";
import ChatAreaContainer from "./ChatArea/ChatAreaContainer";
import {Outlet} from "react-router-dom";


const Chat = (props) => {
    return (

        <div className={s.chatWrapper}>
            <div className={s.nav}>Nav</div>
            <UserChatsContainer />
            <Outlet />
        </div>
    )
}

export default Chat