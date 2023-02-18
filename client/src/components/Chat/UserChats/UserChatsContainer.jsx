import React, {useEffect} from "react";
import UserChats from "./UserChats";
import {connect} from "react-redux";
import {changeSearchValue, fetchMyChats, searchUserOrGroup} from "../../../store/actions/chat";

const UserChatsContainer = (props) => {
    useEffect(() => {
        if (props.searchValue !== '') {
            props.searchUserOrGroup(props.searchValue)
        } else {
            props.fetchMyChats()
        }

    }, [props.searchValue])

    return <UserChats myChats={props.myChats} currentUsername={JSON.parse(props.currentUser).username}
                      searchValue={props.searchValue} search={props.searchUserOrGroup} changeSearchValue={props.changeSearchValue}
    />
}


const mapStateToProps = (store) => {
    return {
        currentUser: store.auth.user,
        myChats: store.chat.myChats,
        searchValue: store.chat.searchValue
    }
}

export default connect(mapStateToProps, {fetchMyChats, searchUserOrGroup, changeSearchValue})(UserChatsContainer)