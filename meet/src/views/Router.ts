import { Div } from '../../../ui/components/Div';
import { Home } from './Home';
import { Video } from './Video';

export function Router() {
  const router = Div({ styles: { height: '100%' } });

  function init() {
    handleRouteUpdated();
  }

  window.addEventListener('popstate', handleRouteUpdated);

  async function handleRouteUpdated() {
    router.innerHTML = '';

    const path = window.location.pathname;
    const urlPath = path.split('/');
    let roomId = '';
    if (urlPath[1]) {
      roomId = path;
    }

    switch (path) {
      case '/':
        router.append(Home());
        break;
      case roomId:
        router.append(Video());
        break;
      default:
        break;
    }
  }

  init();

  return router;
}
