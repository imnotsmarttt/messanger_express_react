import {connect} from "react-redux";
import Auth from "./Auth";
import {
    changePassword2Value,
    changePasswordValue,
    changeUsernameValue, checkAuth,
    login,
    register
} from "../../store/actions/auth";
import {Navigate} from "react-router-dom";


const AuthContainer = (props) => {
    return !props.isAuthenticated ? <Auth username={props.username} password={props.password} password2={props.password2}

                 changeUsernameValue={props.changeUsernameValue} changePasswordValue={props.changePasswordValue}
                 changePassword2Value={props.changePassword2Value}

                 login={props.login} register={props.register}
    /> : <Navigate to={'/'} />
}



const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
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
    register,
    checkAuth
})(AuthContainer)