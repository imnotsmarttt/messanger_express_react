import React from "react";
import s from '../Auth.module.css'
import {useOutletContext} from "react-router-dom";


const Login = () => {
    const {username, password, changeUsernameValue, changePasswordValue, login} = useOutletContext()

    const usernameValue = React.createRef();
    const passwordValue = React.createRef();

    return (
        <div className={s.wrapper}>
            <h1>Sign In</h1>
            <input className={s.input}
                   value={username}
                   ref={usernameValue}
                   onChange={() => changeUsernameValue(usernameValue.current.value)}/>
            <input className={s.input}
                   value={password}
                   ref={passwordValue}
                   onChange={() => changePasswordValue(passwordValue.current.value)}/>
            <button type='submit'
                    className={s.btnSubmit}
                    onClick={() => login(usernameValue.current.value, passwordValue.current.value)}>Sign In</button>
        </div>
    )
}

export default Login