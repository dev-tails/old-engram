declare namespace Express {
  export interface Request {
    services?: { 
      roomService: import('../../rooms/RoomService').RoomService
      userService: import('../../auth/UserService').UserService
    };
  }
}