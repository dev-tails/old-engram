import "./SignupPage.scss";

import { Button, Divider, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { TermsOfServicePagePath } from "../../TermsOfServicePage/TermsOfServicePage";
import { signUp } from "../../UsersApi";
import { createLocalDevice } from "../../DeviceApi";
import { Note } from "../notes/NotesApi";
import { PrivacyPolicyPagePath } from "../PrivacyPolicyPage/PrivacyPolicyPage";
import { DividerWithText } from "../login/DividerWithText/DividerWithText";
import Axios from "axios";

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

  const handleEmailChanged: React.InputHTMLAttributes<HTMLInputElement>["onChange"] = (
    event
  ) => {
    setEmail(event.target.value);
  };

  const handleUseWithoutAccount = async () => {
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

        <div id="use-without-account">
          <Button
            onClick={handleUseWithoutAccount}
            variant="contained"
            color="primary"
          >
            Use Offline Without Account
          </Button>
        </div>

        <DividerWithText>Or</DividerWithText>

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
