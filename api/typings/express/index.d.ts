declare namespace Express {
  export interface Request {
    services?: { userService: import('../../auth/UserService').UserService };
  }
}