import React, { useState } from "react";
import axios from "axios";
import "./LoginPage.scss";

export type LoginPageProps = {};

export default function LoginPage(props: LoginPageProps) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignIn = () => {
    axios.post("/api/login", { username, password }).then((res) => {
      window.location.href = "/notes";
    });
  };

  const handleSignUp = () => {
    axios.post("/api/signup", { username, password }).then((res) => {
      window.location.href = "/notes";
    });
  };

  const handleUsernameChanged: React.InputHTMLAttributes<
    HTMLInputElement
  >["onChange"] = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChanged: React.InputHTMLAttributes<
    HTMLInputElement
  >["onChange"] = (event) => {
    setPassword(event.target.value);
  };

  const notes = ["Welcome to BrainStorm"];

  return (
    <div className="login-page">
      <div id="notes">
        {notes.map((note, index) => {
          return (
            <div key={index} className="note">
              <span className="note-body">{note}</span>
            </div>
          );
        })}
      </div>
      <div className="bottom-box">
        <input
          type="text"
          autoComplete="false"
          autoCapitalize="false"
          autoFocus={true}
          placeholder="username"
          onChange={handleUsernameChanged}
        ></input>
        <input
          type="password"
          autoComplete="false"
          autoCapitalize="false"
          placeholder="password"
          onChange={handlePasswordChanged}
        ></input>
        <button onClick={handleSignUp}>Sign Up</button>
        <button onClick={handleSignIn}>Sign In</button>
      </div>
    </div>
  );
}
