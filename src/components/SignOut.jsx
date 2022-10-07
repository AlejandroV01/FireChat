import firebase from "firebase/compat/app";
import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import "../App.css";
const SignOut = () => {
  const auth = firebase.auth();

  return (
    auth.currentUser && (
      <button onClick={() => auth.signOut()} className="sign-out-btn">
        <FaSignOutAlt size={30} style={{ padding: "0 5px" }} />
      </button>
    )
  );
};

export default SignOut;
