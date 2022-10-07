import firebase from "firebase/compat/app";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FiLock } from "react-icons/fi";
import { HiOutlineX } from "react-icons/hi";
import google from "./google.png";

const SignIn = ({ auth, firestore }) => {
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
};

export default SignIn;
