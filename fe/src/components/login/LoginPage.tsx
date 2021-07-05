import './LoginPage.scss';

import { Button, Divider, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { createLocalDevice } from '../../DeviceApi';
import { objectIdFromDate } from '../../utils/ObjectId';
import { Note } from '../notes/NotesApi';
import { SignupPagePath } from '../SignupPage/SignupPage';
import { DividerWithText } from './DividerWithText/DividerWithText';

export type LoginPageProps = {};

export const LoginPagePath = "/login";

export default function LoginPage(props: LoginPageProps) {
  const history = useHistory();
  const [password, setPassword] = useState("testtest");
  const [username, setUsername] = useState("test");
  const [errors, setErrors] = useState<Note[]>([]);
  const [debug, setDebug] = useState("");

  const handleSignIn = () => {
    axios
      .post(
        "/api/users/login",
        { username, password },
        { withCredentials: true }
      )
      .then((res) => {
        return axios.get("/api/notes", { withCredentials: true });
      })
      .catch((err) => {
        let errorMessage = err.message;
        if (err.response?.status === 400) {
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

  const handleUsernameChanged: React.InputHTMLAttributes<HTMLInputElement>["onChange"] =
    (event) => {
      setUsername(event.target.value);
    };

  const handlePasswordChanged: React.InputHTMLAttributes<HTMLInputElement>["onChange"] =
    (event) => {
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
        <p>{debug}</p>
        <div className="logo">
          <img
            alt="engram logo"
            width="auto"
            height="256px"
            src="/images/logo.svg"
          />
        </div>

        <div className="errors">
          {errors.map((error) => {
            return error.body;
          })}
        </div>
        <TextField
          id="username"
          label="Email (or username)"
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
          color="primary"
        >
          Log In
        </Button>

        <DividerWithText>Or</DividerWithText>

        <div id="use-without-account">
          <Button onClick={handleUseWithoutAccount} variant="contained">
            Use Offline Without Account
          </Button>
        </div>

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
