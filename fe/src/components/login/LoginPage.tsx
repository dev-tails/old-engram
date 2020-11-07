import React, { useState } from "react";
import TextBox from "../textbox/TextBox";
import axios from "axios";
import "./LoginPage.scss";

export default function LoginPage() {
  const [username, setUsername] = useState("");

  const isPassword = !!username;

  const handleSubmit = (body: string) => {
    if (isPassword) {
      axios.post("/api/login", { username, password: body }).then((res) => {
        console.log(res);
      });
    } else {
      setUsername(body);
    }
  };

  return (
    <div className="login-page">
      <TextBox hidden={isPassword} onSubmit={handleSubmit} />
    </div>
  );
}
