import React, {useEffect} from "react";
import UserChats from "./UserChats";
import {connect} from "react-redux";
import {fetchMyChats} from "../../../store/actions/chat";

const UserChatsContainer = (props) => {
    useEffect(() => {
        props.fetchMyChats()
    }, [])

    return <UserChats myChats={props.myChats} currentUsername={JSON.parse(props.currentUser).username}/>
}


const mapStateToProps = (store) => {
    return {
        currentUser: store.auth.user,
        myChats: store.chat.myChats
    }
}

export default connect(mapStateToProps, {fetchMyChats})(UserChatsContainer)