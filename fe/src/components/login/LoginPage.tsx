import React, { useState } from "react";
import axios from "axios";
import "./LoginPage.scss";
import { Header } from "../header/Header";

export type LoginPageProps = {};

export default function LoginPage(props: LoginPageProps) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignIn = () => {
    axios.post("/api/users/login", { username, password }).then((res) => {
      window.location.href = "/notes";
    });
  };

  const handleSignUp = () => {
    axios.post("/api/users/signup", { username, password }).then((res) => {
      window.location.href = "/notes";
    });
  };

  const handleUsernameChanged: React.InputHTMLAttributes<HTMLInputElement>["onChange"] = (
    event
  ) => {
    setUsername(event.target.value);
  };

  const handlePasswordChanged: React.InputHTMLAttributes<HTMLInputElement>["onChange"] = (
    event
  ) => {
    setPassword(event.target.value);
  };

  return (
    <div className="login-page">
      <Header title="Engram" />
      <div className="bottom-box">
        <input
          type="text"
          autoComplete="off"
          autoCapitalize="none"
          autoFocus={true}
          placeholder="username"
          onChange={handleUsernameChanged}
        ></input>
        <input
          type="password"
          autoComplete="off"
          autoCapitalize="none"
          placeholder="password"
          onChange={handlePasswordChanged}
        ></input>
        <button onClick={handleSignUp}>Sign Up</button>
        <button onClick={handleSignIn}>Sign In</button>
      </div>
    </div>
  );
}
