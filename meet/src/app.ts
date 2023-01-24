import { Router } from './views/Router';

async function run() {
  const root = document.getElementById('root');

  if (root) {
    const router = Router();
    root.append(router);
  }
}

run();
