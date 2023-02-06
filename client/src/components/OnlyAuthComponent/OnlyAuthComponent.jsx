import {Navigate} from "react-router-dom";

function OnlyAuthComponent ({children, isAuth}) {
    return isAuth ? children : <Navigate to={'/auth/login'} />
}

export default OnlyAuthComponent