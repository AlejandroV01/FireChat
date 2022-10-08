import firebase from "firebase/compat/app";
import React, { useEffect, useRef, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { BsCheck } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import "../App.css";
import ChatMessage from "./ChatMessage";

const ChatRoom = ({ name, handleNameChange }) => {
  const auth = firebase.auth();
  const firestore = firebase.firestore();
  const mainRef = firestore.collection("general");
  const mainQuery = mainRef.orderBy("createdAt").limit(25);
  const [mainMessages] = useCollectionData(mainQuery, { idField: "id" });

  const sportsRef = firestore.collection("sports");
  const sportsQuery = sportsRef.orderBy("createdAt").limit(25);
  const [sportsMessages] = useCollectionData(sportsQuery, { idField: "id" });

  const educationRef = firestore.collection("education");
  const educationQuery = educationRef.orderBy("createdAt").limit(25);
  const [educationMessages] = useCollectionData(educationQuery, {
    idField: "id",
  });

  const gameRef = firestore.collection("game");
  const gameQuery = gameRef.orderBy("createdAt").limit(25);
  const [gameMessages] = useCollectionData(gameQuery, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid } = auth.currentUser;
    if (general) {
      await mainRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        name,
      });
    } else if (sports) {
      await sportsRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        name,
      });
    } else if (education) {
      await educationRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        name,
      });
    } else if (game) {
      await gameRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        name,
      });
    } else {
      alert("error in uploading message");
    }

    setFormValue("");
  };
  useEffect(() => {
    dummy.current.scrollIntoView({ behavior: "smooth" });
  }, [mainMessages]);
  const dummy = useRef();

  const [general, setGeneral] = useState(false);
  const [sports, setSport] = useState(false);
  const [education, setEducation] = useState(false);
  const [game, setGame] = useState(false);
  const removeStates = () => {
    setGeneral(false);
    setSport(false);
    setEducation(false);
    setGame(false);
  };
  const [isPopup, setIsPopup] = useState(true);
  const displayNamePopup = () => {
    return (
      <div>
        {isPopup && (
          <div>
            <div className="overlay-pop"></div>
            <div className="name-popup">
              <h2>Enter a Display Name:</h2>
              <div className="display-name-pop">
                <form action="">
                  <input
                    type="text"
                    placeholder="display name..."
                    onChange={(e) => handleNameChange(e)}
                  />
                  <button onClick={() => setIsPopup(false)} type="submit">
                    <BsCheck size={25} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  useEffect(() => {
    setTimeout(() => {
      setGeneral(true);
    }, 1000);
  }, []);

  return (
    <div className="wholeMainSection">
      {displayNamePopup()}
      <div className="leftBar">
        <h2>Channels</h2>
        <div className="channel-list">
          <span
            className={general ? "channel active-channel" : "channel"}
            onClick={() => {
              removeStates();
              setGeneral(true);
            }}
          >
            General
          </span>
          <span
            className={sports ? "channel active-channel" : "channel"}
            onClick={() => {
              removeStates();
              setSport(true);
            }}
          >
            Sports
          </span>
          <span
            className={education ? "channel active-channel" : "channel"}
            onClick={() => {
              removeStates();
              setEducation(true);
            }}
          >
            Education
          </span>
          <span
            className={game ? "channel active-channel" : "channel"}
            onClick={() => {
              removeStates();
              setGame(true);
            }}
          >
            Game
          </span>
        </div>
      </div>
      <div className="whole-container">
        <main>
          {general &&
            mainMessages.map((msg, index) => (
              <ChatMessage key={index} message={msg} auth={auth} />
            ))}
          {sports &&
            sportsMessages.map((msg, index) => (
              <ChatMessage key={index} message={msg} auth={auth} />
            ))}
          {education &&
            educationMessages.map((msg, index) => (
              <ChatMessage key={index} message={msg} auth={auth} />
            ))}
          {game &&
            gameMessages.map((msg, index) => (
              <ChatMessage key={index} message={msg} auth={auth} />
            ))}
          <span ref={dummy} className="dummy"></span>
        </main>

        <form onSubmit={sendMessage} className="sendMessageDiv">
          <input
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="message..."
          />

          <button type="submit" disabled={!formValue}>
            <FiSend size={30} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatRoom;
