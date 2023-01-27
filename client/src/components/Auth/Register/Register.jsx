import React from "react";
import s from '../Auth.module.css'
import {useOutletContext} from "react-router-dom";


const Register = () => {
    const {username, password, password2, changeUsernameValue, changePasswordValue, changePassword2Value, register} = useOutletContext()

    const usernameValue = React.createRef();
    const passwordValue = React.createRef();
    const password2Value = React.createRef();

    return (
        <div className={s.wrapper}>
            <h1>Sign Up</h1>
            <input className={s.input}
                   value={username}
                   placeholder='Username'
                   ref={usernameValue}
                   onChange={() => changeUsernameValue(usernameValue.current.value)}/>
            <input className={s.input}
                   value={password}
                   placeholder='Password'
                   ref={passwordValue}
                   onChange={() => changePasswordValue(passwordValue.current.value)}/>
            <input className={s.input}
                   value={password2}
                   placeholder='Confirm password'
                   ref={password2Value}
                   onChange={() => changePassword2Value(password2Value.current.value)}/>
            <button type='submit'
                    className={s.btnSubmit}
                    onClick={() => register(username, password, password2)}
                    >Sign Up</button>
        </div>
    )
}

export default Register