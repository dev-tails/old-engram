import { User } from "../../api/UserApi";

const INITIAL_STATE = null;

type LoginAction = {
  type: "LOGIN";
  payload: User;
};

type SignupAction = {
  type: "SIGNUP";
  payload: User;
};

type LogoutAction = {
  type: "LOGOUT";
  payload: User;
};

const UserReducer = (
  state = INITIAL_STATE,
  action: LoginAction | LogoutAction | SignupAction
) => {
  switch (action.type) {
    case "LOGIN":
    case "SIGNUP":
      return action.payload;
    case "LOGOUT":
        return null;
    default:
      return state;
  }
};

export default UserReducer;
