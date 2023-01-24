import { Api } from "./Api";

export class UserApi extends Api {
  login(params: { email: string; password: string }) {
    return this.post("/api/users/login", params);
  }

  getSelf() {
    return this.get("/api/users/self");
  }
}

export const userApi = new UserApi();
