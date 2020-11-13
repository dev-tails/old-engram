import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TextBox from "../textbox/TextBox";
import axios from "axios";
import "./LoginPage.scss";

export type LoginPageProps = {
  onLoggedIn: () => void;
}

export default function LoginPage(props: LoginPageProps) {
  const history = useHistory();
  const [username, setUsername] = useState("");

  const isPassword = !!username;

  const handleSubmit = (body: string) => {
    if (isPassword) {
      axios.post("/api/login", { username, password: body }, { withCredentials: true }).then((res) => {
        history.push("/notes");
        props.onLoggedIn();
      });
    } else {
      setUsername(body);
    }
  };

  return (
    <div className="login-page">
      <TextBox
        hidden={isPassword}
        hint={isPassword ? "password" : "username"}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
