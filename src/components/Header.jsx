import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import SignOut from "./SignOut";
const Header = ({ handleNameChange }) => {
  const [edit, setEdit] = useState(false);

  return (
    <header>
      <h1>FireChat🔥</h1>
      <div className="display-title">
        <h3>Display Name:</h3>
        <div className="display-name">
          <input
            type="text"
            placeholder="display name..."
            onChange={(e) => handleNameChange(e)}
            disabled={edit ? false : true}
          />
          <button onClick={() => setEdit(!edit)}>
            {edit ? <BsCheck size={25} /> : <AiFillEdit size={25} />}
          </button>
        </div>
      </div>
      <SignOut />
    </header>
  );
};

export default Header;
