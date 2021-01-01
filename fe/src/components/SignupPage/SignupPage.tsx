import './SignupPage.scss';

import { Button, Divider, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { signUp } from '../../UsersApi';
import { Note } from '../notes/NotesApi';

export type SignupPageProps = {};

export const SignupPagePath = "/signup";

export default function SignupPage(props: SignupPageProps) {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState<Note[]>([]);

  const handleSignUp = async () => {
    try {
      await signUp({ username, password });
      history.push("/");
    } catch (err) {
      let errors = [err.message];

      if (err?.response?.data?.errors) {
        errors = err?.response?.data?.errors;
      }

      setErrors(errors);
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
    <div className="signup-page">
      <div className="container">
        <div className="errors">
          {errors.map((error) => {
            return error;
          })}
        </div>
        <TextField
          id="username"
          autoComplete="off"
          autoCapitalize="none"
          autoFocus={true}
          label="Username"
          fullWidth
          onChange={handleUsernameChanged}
        />
        <TextField
          id="password"
          label="Password"
          type="password"
          autoComplete="off"
          autoCapitalize="none"
          fullWidth
          onChange={handlePasswordChanged}
        />
        <Button
          id="signup-button"
          fullWidth
          onClick={handleSignUp}
          variant="contained"
        >
          Sign Up
        </Button>
        <Divider />
        <Link to="/login">
          <Button size="small">Log In</Button>
        </Link>
      </div>
    </div>
  );
}
