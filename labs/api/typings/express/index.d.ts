declare namespace Express {
  export interface Request {
    services?: { 
      fileService: import('../../auth/FileService').FileService;
      pageService: import("../../pages/PageService").PageService;
      roomService: import('../../rooms/RoomService').RoomService;
      userService: import('../../auth/UserService').UserService;
    };
  }
}