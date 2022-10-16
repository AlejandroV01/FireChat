import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import ChatRoom from "./components/ChatRoom";
import Header from "./components/Header";
import SignIn from "./components/SignIn";
/************************************************************************* */
function App() {
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

  const [user] = useAuthState(auth);
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="App">
      <Header handleNameChange={handleNameChange} user={user} name={name} />
      <section>
        {user ? (
          <ChatRoom name={name} handleNameChange={handleNameChange} />
        ) : (
          <SignIn />
        )}
      </section>
    </div>
  );
}

export default App;
