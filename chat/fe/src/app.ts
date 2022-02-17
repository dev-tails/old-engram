import { initializeRoomApi } from './apis/RoomApi';
import { initializeUserApi } from './apis/UserApi';
import { Header } from './views/Header';
import { Router } from './views/Router';

async function run() {
  const root = document.getElementById("root");

  await Promise.all([initializeRoomApi(), initializeUserApi()]);

  root.append(Header())

  const router = Router();

  root.append(router);
}

run();
