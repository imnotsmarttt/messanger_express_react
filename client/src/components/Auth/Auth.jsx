import {Outlet} from "react-router-dom";

const Auth = (props) => {
    return (
        <div>
            <Outlet context={props} />
        </div>

    )
}

export default Auth