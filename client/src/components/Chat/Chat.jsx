import s from './Chat.module.css'
import UserChatsContainer from "./UserChats/UserChatsContainer";
import {Outlet} from "react-router-dom";


const Chat = (props) => {
    return (
        <div className={s.chatWrapper}>
            <div className={s.nav}><button onClick={() => props.logout()}>Logout</button></div>
            <UserChatsContainer />
            <Outlet />
        </div>
    )
}

export default Chat