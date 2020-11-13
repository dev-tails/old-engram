import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./LoginPage.scss";

export type LoginPageProps = {
  onLoggedIn: () => void;
};

export default function LoginPage(props: LoginPageProps) {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSignIn = () => {
    axios.post("/api/login", { username, password }).then((res) => {
      history.push("/notes");
      props.onLoggedIn();
    });
  };

  const handleSignUp = () => {
    axios.post("/api/signup", { username, password }).then((res) => {
      history.push("/notes");
      props.onLoggedIn();
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

  return (
    <div className="login-page">
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
