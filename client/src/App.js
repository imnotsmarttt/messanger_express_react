import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useEffect} from "react";
import {connect} from "react-redux";
import {checkAuth} from "./store/actions/auth";

import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import AuthContainer from "./components/Auth/AuthContainer";
import ChatAreaContainer from "./components/Chat/ChatArea/ChatAreaContainer";
import ChatContainer from "./components/Chat/ChatContainer";
import OnlyAuthComponent from "./components/OnlyAuthComponent/OnlyAuthComponent";


function App(props) {

    useEffect(() => {
        if(localStorage.getItem('token')) {
            props.checkAuth()
        }
    }, [])

    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path='/auth/' element={<AuthContainer />}>
                        <Route path='login' element={<Login/>}/>
                        <Route path='register' element={<Register/>}/>
                    </Route>

                    <Route path='/' element={<OnlyAuthComponent isAuth={props.isAuth} children={<ChatContainer />} />}  >
                        <Route path='chat/:id' element={<ChatAreaContainer />} />
                    </Route>

                </Routes>
            </div>
        </BrowserRouter>
    );
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuthenticated
    }
}

export default connect(mapStateToProps,{checkAuth})(App);
