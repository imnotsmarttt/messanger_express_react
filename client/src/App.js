import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import AuthContainer from "./components/Auth/AuthContainer";
import Chat from "./components/Chat/Chat";
import ChatAreaContainer from "./components/Chat/ChatArea/ChatAreaContainer";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path='/' element={<AuthContainer />}>
                        <Route path='login' element={<Login/>}/>
                        <Route path='register' element={<Register/>}/>
                    </Route>

                    <Route path='/chat' element={<Chat />} >
                        <Route path=':id' element={<ChatAreaContainer />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
