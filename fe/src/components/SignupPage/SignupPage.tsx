import './SignupPage.scss';

import { Button, Divider, TextField } from '@material-ui/core';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { createLocalDevice } from '../../DeviceApi';
import { TermsOfServicePagePath } from '../../TermsOfServicePage/TermsOfServicePage';
import { signUp } from '../../UsersApi';
import { trackEvent } from '../../utils/AnalyticsUtils';
import { DividerWithText } from '../login/DividerWithText/DividerWithText';
import { Note } from '../notes/NotesApi';
import { PrivacyPolicyPagePath } from '../PrivacyPolicyPage/PrivacyPolicyPage';

export type SignupPageProps = {};

export const SignupPagePath = "/signup";

export default function SignupPage(props: SignupPageProps) {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Note[]>([]);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    async function getSignupEnabled() {
      const res = await Axios.get("/api/users/signup/enabled");
      setEnabled(res.data.enabled);
    }
    getSignupEnabled();
  }, []);

  const handleSignUp = async () => {
    try {
      await signUp({ username, password, email });
      history.push("/");
    } catch (err) {
      let errors = [err.message];

      if (err?.response?.data?.errors) {
        errors = err?.response?.data?.errors;
      }

      setErrors(errors);
    }
  };

  const handleUsernameChanged: React.InputHTMLAttributes<HTMLInputElement>["onChange"] =
    (event) => {
      setUsername(event.target.value);
    };

  const handlePasswordChanged: React.InputHTMLAttributes<HTMLInputElement>["onChange"] =
    (event) => {
      setPassword(event.target.value);
    };

  const handleEmailChanged: React.InputHTMLAttributes<HTMLInputElement>["onChange"] =
    (event) => {
      setEmail(event.target.value);
    };

  const handleUseWithoutAccount = async () => {
    trackEvent("signup");
    await createLocalDevice();
    history.push("/");
  };

  return (
    <div className="signup-page">
      <div className="container">
        <div className="logo">
          <img
            alt="engram logo"
            width="auto"
            height="256px"
            src="/images/logo.svg"
          />
        </div>

        {enabled ? (
          <div className="signup">
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
              id="email"
              type="email"
              autoCapitalize="none"
              label="Email"
              fullWidth
              onChange={handleEmailChanged}
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
              color="primary"
            >
              Sign Up
            </Button>
            <p style={{ textAlign: "center" }}>
              By signing up, you agree to our{" "}
              <Link to={TermsOfServicePagePath}>Terms</Link> and{" "}
              <Link to={PrivacyPolicyPagePath}>Privacy Policy</Link>
            </p>
          </div>
        ) : (
          <p>
            The full version of engram is currently in beta. Add your email to
            the{" "}
            <a href="https://mailchi.mp/f3d84b89e0d3/engram-beta-waitlist">
              waitlist
            </a>{" "}
            to be contacted as soon as more spots open!
          </p>
        )}

        <DividerWithText>Or</DividerWithText>

        <div id="use-without-account">
          <Button onClick={handleUseWithoutAccount} variant="contained">
            Try Offline Without Account
          </Button>
        </div>

        <Divider />
        <Link to="/login">
          <Button size="small">Log In</Button>
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
