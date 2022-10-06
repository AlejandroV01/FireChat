import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { AiOutlineMail } from "react-icons/ai";
import { FiLock } from "react-icons/fi";
import { HiOutlineX } from "react-icons/hi";
import "./App.css";
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

  return (
    <div className="App">
      <header>
        <h1>FireChat🔥</h1>
        <SignOut />
      </header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

/************************************************************************* */

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  const signInWithEmail = (e) => {
    e.preventDefault();
    if (email && password) {
      auth.signInWithEmailAndPassword(email, password);
    }
  };

  const [error, setError] = useState("");
  const signUp = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      alert("Password must be above 6 characters");
    }
    console.log(password);
    if (email && password) {
      auth.createUserWithEmailAndPassword(email, password).catch((error) => {
        let errorMessage = error.message;

        console.log(errorMessage);
        setError(errorMessage);
      });
    }
  };
  const loginGuest = (e) => {
    auth.signInWithEmailAndPassword("guest@guest.guest", "guestguest");
    if (error) {
      alert(error);
    }
  };
  const [popup, setPopup] = useState(false);
  return (
    <>
      <div className={popup && "popup"}></div>
      <div className="sign-in-container">
        <div className="left-sign-in"></div>
        <div className="right-sign-in">
          <div className="white-container">
            <h2>Login</h2>
            <form onSubmit={signInWithEmail}>
              <label htmlFor="email" className="email-label">
                Email
              </label>
              <div className="bar">
                <AiOutlineMail />
                <input
                  id="email"
                  type="email"
                  placeholder="Type your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <label htmlFor="password" className="password-label">
                Password
              </label>
              <div className="bar">
                <FiLock />

                <input
                  id="password"
                  type="password"
                  placeholder="Type your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit">LOGIN</button>
            </form>
            <p>or</p>
            <button onClick={signInWithGoogle} className="sign-in">
              <img src={google} alt="" />
              Sign in with Google
            </button>
            <p>
              Don't have an account?{" "}
              <span onClick={() => setPopup(true)}>Sign up here!</span>
            </p>
            <p className="guest-login">
              Need to look quickly?{" "}
              <span onClick={loginGuest}>Login as guest here!</span>
            </p>
          </div>
          {popup && (
            <motion.div
              className="sign-up-screen"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1, transition: { duration: 1 } }}
            >
              <div className="close-popup" onClick={() => setPopup(false)}>
                <HiOutlineX size={25} />
              </div>
              <h2>SignUp</h2>
              <form onSubmit={signUp}>
                <label htmlFor="email" className="email-label">
                  Email
                </label>
                <div className="bar">
                  <AiOutlineMail />
                  <input
                    id="email"
                    type="email"
                    placeholder="Type your email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <label htmlFor="password" className="password-label">
                  Password
                </label>
                <div className="bar">
                  <FiLock />

                  <input
                    id="password"
                    type="password"
                    placeholder="Type your password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button type="submit" className="sign-up-btn">
                  SIGN UP
                </button>
              </form>
              {error && <p>{error}</p>}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
}

/************************************************************************* */

function SignOut() {
  return (
    auth.currentUser && (
      <button onClick={() => auth.signOut()} className="sign-out-btn">
        Sign Out
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

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await mainRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
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
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

/************************************************************************* */

function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img src={photoURL || ""} alt="profile display" />
        <p>{text}</p>
      </div>
    </>
  );
}
/************************************************************************* */
export default App;
