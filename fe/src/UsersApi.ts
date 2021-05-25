import axios from "axios";

export type LoginParams = {
  username: string;
  password: string;
};

export async function login(params: LoginParams) {
  await axios.post("/api/users/login", params);
  clearCache();
}

export type SignUpParams = {
  username: string;
  password: string;
  email: string;
};

export async function signUp(params: SignUpParams) {
  const res = await axios.post("/api/users/signup", params, {
    validateStatus: (status) => status === 200,
  });
  clearCache();
  return res;
}

export async function logout() {
  await axios.post("/api/users/logout");
  clearCache();
}

export type User = {
  _id: string;
  username: string;
  email: string;
};

let getMePromise: Promise<any> | null = null;

export async function getMe(): Promise<User> {
  if (!getMePromise) {
    getMePromise = axios.get("/api/users/me");
  }
  const res = await getMePromise;
  return res.data;
}

export async function isAuthenticatedUser() {
  try {
    await getMe();
    return true;
  } catch (err) {}

  return false;
}

export async function clearCache() {
  getMePromise = null;
}
