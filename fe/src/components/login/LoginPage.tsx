import "./LoginPage.scss";

import { Button, Divider, TextField } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { objectIdFromDate } from "../../utils/ObjectId";
import { Note } from "../notes/NotesApi";
import { SignupPagePath } from "../SignupPage/SignupPage";
import { DividerWithText } from "./DividerWithText/DividerWithText";
import { createLocalDevice } from "../../DeviceApi";

export type LoginPageProps = {};

export const LoginPagePath = "/login";

export default function LoginPage(props: LoginPageProps) {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState<Note[]>([]);

  const handleSignIn = () => {
    axios
      .post("/api/users/login", { username, password })
      .then(navigateToHome)
      .catch((err) => {
        let errorMessage = err.message;
        if (err.response.status === 400) {
          errorMessage = "The username or password is incorrect";
        }

        setErrors([
          {
            _id: objectIdFromDate(new Date()),
            body: errorMessage,
          },
        ]);
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

  const handleUseWithoutAccount = async () => {
    await createLocalDevice();
    navigateToHome();
  };

  const navigateToHome = () => {
    history.push("/");
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="logo">
          <img
            alt="engram logo"
            width="auto"
            height="256px"
            src="/images/logo.svg"
          />
        </div>

        <div id="use-without-account">
          <Button
            onClick={handleUseWithoutAccount}
            variant="contained"
            color="primary"
          >
            Use Without Account
          </Button>
        </div>

        <DividerWithText>Or</DividerWithText>

        <div className="errors">
          {errors.map((error) => {
            return error.body;
          })}
        </div>
        <TextField
          id="username"
          label="Username"
          fullWidth
          autoComplete="off"
          autoCapitalize="none"
          autoFocus={true}
          onChange={handleUsernameChanged}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          fullWidth
          autoComplete="off"
          autoCapitalize="none"
          onChange={handlePasswordChanged}
        />
        <Button
          id="login-button"
          fullWidth
          onClick={handleSignIn}
          variant="contained"
        >
          Log In
        </Button>
        <Divider />
        <a
          href={`mailto:engram@xyzdigital.com?subject=Engram: Reset Password Request&body=Username: ${username}`}
        >
          <Button size="small">Forgot Password</Button>
        </a>
        <Link to={SignupPagePath}>
          <Button size="small">Sign Up</Button>
        </Link>
        <div style={{ float: "right" }}>
          <Link to={{ pathname: "https://engramhq.xyz" }} target="_blank">
            <Button size="small">About</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
