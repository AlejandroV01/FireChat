import React, { useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsCheck } from "react-icons/bs";
import SignOut from "./SignOut";
const Header = ({ handleNameChange, user, name }) => {
  const [edit, setEdit] = useState(false);
  console.log(name);
  return (
    <header>
      <h1>FireChat🔥</h1>

      {user && (
        <div className="display-title">
          <h3>Display Name: {name}</h3>
          <div className="display-name">
            <input
              type="text"
              placeholder="display name..."
              onChange={(e) => handleNameChange(e)}
              disabled={edit ? false : true}
              value={name}
            />
            <button onClick={() => setEdit(!edit)}>
              {edit ? <BsCheck size={25} /> : <AiFillEdit size={25} />}
            </button>
          </div>
        </div>
      )}

      <SignOut />
    </header>
  );
};

export default Header;
