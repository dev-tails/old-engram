import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import TextBox from "../textbox/TextBox";
import axios from "axios";
import "./LoginPage.scss";

export default function LoginPage() {
  const history = useHistory();
  const [username, setUsername] = useState("");

  const isPassword = !!username;

  const handleSubmit = (body: string) => {
    if (isPassword) {
      axios.post("/api/login", { username, password: body }).then((res) => {
        history.push("/notes");
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
