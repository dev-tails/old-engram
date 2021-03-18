import axios from "axios";
import { addUser, getUser } from "./db/db";

export type SignUpParams = {
  username: string;
  password: string;
  email: string;
};

export async function createLocalUser() {
  const localUser = await hasLocalUser();
  if (!localUser) {
    await addUser();
  }
}

export async function hasLocalUser(): Promise<boolean> {
  const user = await getUser();
  return user ? true : false;
}

export async function signUp(params: SignUpParams) {
  return axios.post("/api/users/signup", params, {
    validateStatus: (status) => status === 200,
  });
}

export async function logout() {
  await axios.post("/api/users/logout");
}

export async function getMe() {
  const res = await axios.get("/api/users/me");
  return res.data;
}
