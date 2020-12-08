import React, { useState } from "react";
import axios from "axios";
import "./LoginPage.scss";
import { Header } from "../header/Header";
import { useHistory } from "react-router-dom";
import { ListWidget } from "../widgets/ListWidget/ListWidget";
import { Note } from "../notes/NotesApi";
import { objectIdFromDate } from "../../utils/ObjectId";
import { signUp } from "../../UsersApi";

export type LoginPageProps = {};

export default function LoginPage(props: LoginPageProps) {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState<Note[]>([]);

  const handleSignIn = () => {
    axios
      .post("/api/users/login", { username, password })
      .then((res) => {
        history.push("/");
      })
      .catch((err) => {
        let errorMessage = err.message;
        if (err.response.status === 400) {
          errorMessage = "The username or password is incorrect";
        }

        setErrors([
          ...errors,
          {
            _id: objectIdFromDate(new Date()),
            body: errorMessage,
          },
        ]);
      });
  };

  const handleSignUp = async () => {
    try {
      await signUp({ username, password });
      history.push("/");
    } catch (err) {
      let errorMessage = err.message;
      setErrors([
        ...errors,
        {
          _id: objectIdFromDate(new Date()),
          body: errorMessage,
        },
      ]);
    }
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
      <Header title="engram" />
      <ListWidget items={errors} />
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
