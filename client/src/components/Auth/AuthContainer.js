import react from 'react'
import {connect} from "react-redux";
import Auth from "./Auth";
import {
    changePassword2Value,
    changePasswordValue,
    changeUsernameValue,
    login,
    register
} from "../../store/actions/auth";


class AuthContainer extends react.Component {
    render() {
        return <Auth username={this.props.username} password={this.props.password} password2={this.props.password2}

                     changeUsernameValue={this.props.changeUsernameValue} changePasswordValue={this.props.changePasswordValue}
                     changePassword2Value={this.props.changePassword2Value}

                     login={this.props.login} register={this.props.register}
        />
    }
}


const mapStateToProps = (state) => {
    return {
        username: state.auth.username,
        password: state.auth.password,
        password2: state.auth.password2
    }
}

export default connect(mapStateToProps, {
    changeUsernameValue,
    changePasswordValue,
    changePassword2Value,
    login,
    register
})(AuthContainer)