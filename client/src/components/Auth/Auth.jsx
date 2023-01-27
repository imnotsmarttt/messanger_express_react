import {Outlet} from "react-router-dom";

const Auth = (props) => {
    return (
        <div>
            <h1>Hello1</h1>
            <Outlet context={props} />
        </div>

    )
}

export default Auth