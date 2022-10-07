import React from "react";

const SignOut = () => {
  return (
    auth.currentUser && (
      <button onClick={() => auth.signOut()} className="sign-out-btn">
        <FaSignOutAlt size={30} style={{ padding: "0 5px" }} />
      </button>
    )
  );
};

export default SignOut;
