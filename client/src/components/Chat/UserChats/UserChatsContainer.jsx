import React from "react";
import UserChats from "./UserChats";
import {connect} from "react-redux";
import {fetchMyChats} from "../../../store/actions/chat";

class UserChatsContainer extends React.Component {
    componentDidMount() {
        this.props.fetchMyChats()
    }

    render() {
        return <UserChats myChats={this.props.chats} />
    }
}


const mapStateToProps = (store) => {
    return {
        chats: store.chat.chats
    }
}

export default connect(mapStateToProps, {fetchMyChats})(UserChatsContainer)