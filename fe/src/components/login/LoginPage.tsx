import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TextBox from "../textbox/TextBox";
import axios from "axios";
import "./LoginPage.scss";

export type LoginPageProps = {
  onLoggedIn: () => void;
};

export default function LoginPage(props: LoginPageProps) {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = () => {
    axios.post("/api/login", { username, password }).then((res) => {
      history.push("/notes");
      props.onLoggedIn();
    });
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          autoComplete="false"
          autoCapitalize="false"
          autoFocus={true}
          placeholder="Username"
        ></input>
        <input
          type="password"
          autoComplete="false"
          autoCapitalize="false"
          placeholder="Password"
        ></input>
      </form>
    </div>
  );
}
