import { Dispatch } from "redux";

import { Note } from "../../components/notes/NotesApi";
import * as UserApi from "../../UsersApi";

export type LogoutAction = {
  type: "LOGOUT";
};

export type FetchUserAction = {
  type: "FETCH_USER";
  payload: Note | null;
};

export async function fetchUser(dispatch: Dispatch) {
  let user = null;
  try {
    user = await UserApi.getMe();
  } catch (err) {
    console.error(err);
  }

  dispatch({ type: "FETCH_USER", payload: user });
  return user;
}

type ApiErrorRespomnse = {
  errors: string[];
};

type LoginResponse = UserApi.User & ApiErrorRespomnse;

export async function login(
  dispatch: Dispatch,
  params: UserApi.LoginParams
): Promise<void> {
  // const user: LoginResponse = await UserApi.login(params);
  // if (!user.errors) {
  //   dispatch({ type: "LOGIN", payload: user });
  // }
  // return user;
}

export async function logout(dispatch: Dispatch) {
  await UserApi.logout();
  dispatch({ type: "LOGOUT" });
}

export async function signup(dispatch: Dispatch, params: UserApi.SignUpParams) {
  const user = await UserApi.signup(params);
  if (!user.errors) {
    dispatch({ type: "SIGNUP", payload: user });
  }
  return user;
}
