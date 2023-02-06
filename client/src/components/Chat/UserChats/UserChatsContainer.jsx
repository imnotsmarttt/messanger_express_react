import React, {useEffect} from "react";
import UserChats from "./UserChats";
import {connect} from "react-redux";
import {fetchMyChats} from "../../../store/actions/chat";

const UserChatsContainer = (props) => {
    useEffect(() => {
        props.fetchMyChats()
    }, [])

    return <UserChats myChats={props.chats} />
}


const mapStateToProps = (store) => {
    return {
        chats: store.chat.chats
    }
}

export default connect(mapStateToProps, {fetchMyChats})(UserChatsContainer)