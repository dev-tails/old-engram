import { baseUrl } from "./Api";

export type User = {
  _id: string;
  username: string;
  email: string;
}

export type LoginParams = {
  username: string;
  password: string;
}

export async function login(options: LoginParams) {
  const res = await fetch(`${baseUrl}/api/users/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(options),
  });
  return res.json();
}

export async function logout() {
  const res = await fetch(`${baseUrl}/api/users/logout`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

export type SignUpParams = {
  username: string;
  email: string;
  password: string;
}

export async function signup(params: SignUpParams) {
  const res = await fetch(`${baseUrl}/api/users/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });
  return res.json();
}

export async function getMe() {
  const res = await fetch(`${baseUrl}/api/users/me`);
  return res.json();
}