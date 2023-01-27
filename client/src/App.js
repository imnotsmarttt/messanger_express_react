import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import AuthContainer from "./components/Auth/AuthContainer";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path='/' element={<AuthContainer />}>
                        <Route path='login' element={<Login/>}/>
                        <Route path='register' element={<Register/>}/>
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
