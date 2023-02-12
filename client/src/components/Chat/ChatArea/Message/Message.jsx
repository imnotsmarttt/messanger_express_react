import React from "react";

const Message = (props) => {
    return <>
        <p>{props.username}</p>
        <p>{props.message}</p>
    </>
}

export default Message;