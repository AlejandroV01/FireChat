import firebase from "firebase/compat/app";
import React from "react";
import "../App.css";
const ChatMessage = (props) => {
  const { text, uid, name } = props.message;
  const auth = firebase.auth();
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <div className="messageBubble">
          <span>{name}</span>
          <p>{text}</p>
        </div>
      </div>
    </>
  );
};

export default ChatMessage;
