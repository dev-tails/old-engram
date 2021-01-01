import './LoginPage.scss';

import { Button, Divider, TextField } from '@material-ui/core';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { objectIdFromDate } from '../../utils/ObjectId';
import { Note } from '../notes/NotesApi';
import { SignupPagePath } from '../SignupPage/SignupPage';

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
      .then((res) => {
        history.push("/");
      })
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

  return (
    <div className="login-page">
      <div className="container">
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
        <Button onClick={handleSignIn} size="small">
          Forgot Password
        </Button>
        <Link to={SignupPagePath}>
          <Button size="small">Sign Up</Button>
        </Link>
      </div>
    </div>
  );
}
