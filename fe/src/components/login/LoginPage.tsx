import React, { useState } from "react";
import TextBox from "../textbox/TextBox";
import "./LoginPage.scss";

export default function LoginPage() {
  const [username, setUsername] = useState("");

  const isPassword = !!username;

  const handleSubmit = (body: string) => {
    if (isPassword) {
      // TODO: Hit login API
    } else {
      setUsername(body);
    }
  }

  return (
    <div className="login-page">
      <TextBox hidden={isPassword} onSubmit={handleSubmit}/>
    </div>
  );
}
