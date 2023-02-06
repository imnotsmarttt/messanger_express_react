import Chat from "./Chat";
import {connect} from "react-redux";
import {logout} from "../../store/actions/auth";

const ChatContainer = (props) => {
    return <Chat logout={props.logout}/>
}

const mapStateToProps = (state) => {
    return {}
}

export default connect(mapStateToProps, {logout})(ChatContainer)