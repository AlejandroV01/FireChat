import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { AiFillEdit, AiOutlineMail } from "react-icons/ai";
import { FaSignOutAlt } from "react-icons/fa";
import { FiLock, FiSend } from "react-icons/fi";
import { HiOutlineX } from "react-icons/hi";
import "./App.css";
import ChatMessage from "./components/ChatMessage";
import ChatRoom from "./components/ChatRoom";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import google from "./google.png";
firebase.initializeApp({
  apiKey: "AIzaSyDHJkaJsgxssO1saOHipruRk7ycllniKX8",
  authDomain: "fir-chat-app-f5105.firebaseapp.com",
  projectId: "fir-chat-app-f5105",
  storageBucket: "fir-chat-app-f5105.appspot.com",
  messagingSenderId: "155128894769",
  appId: "1:155128894769:web:dc3de543dedd588ff18c10",
  measurementId: "G-C3Y3HBGP19",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

/************************************************************************* */
function App() {
  const [user] = useAuthState(auth);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  console.log(name);
  return (
    <div className="App">
      <header>
        <h1>FireChat🔥</h1>
        <div className="display-title">
          <h3>Display Name:</h3>
          <div className="display-name">
            <input
              type="text"
              placeholder="display name..."
              onChange={(e) => setName(e.target.value)}
              disabled={edit ? false : true}
            />
            <button onClick={() => setEdit(!edit)}>
              <AiFillEdit size={25} />
            </button>
          </div>
        </div>
        <SignOut />
      </header>
      <section>{user ? <ChatRoom name={name} /> : <SignIn />}</section>
      <SignIn auth={auth} firestore={firestore} />
      <SignOut auth={auth} />
    </div>
  );
}

/************************************************************************* */

function SignOut() {
  return (
    auth.currentUser && (
      <button onClick={() => auth.signOut()} className="sign-out-btn">
        <FaSignOutAlt size={30} style={{ padding: "0 5px" }} />
      </button>
    )
  );
}

/************************************************************************* */

function ChatRoom() {
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
  const [name, setName] = useState("Kevin");
  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await mainRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      name,
    });
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
  useEffect(() => {
    setTimeout(() => {
      setGeneral(true);
    }, 1000);
  }, []);

  return (
    <div className="wholeMainSection">
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
            mainMessages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
          {sports &&
            sportsMessages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
          {education &&
            educationMessages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
          {game &&
            gameMessages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
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
}

/************************************************************************* */

function ChatMessage(props) {
  const { text, uid, name } = props.message;

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
}
/************************************************************************* */
export default App;
