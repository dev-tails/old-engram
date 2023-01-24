import { Div } from '../../../ui/components/Div';
import { Home } from './Home';
import { Videocall } from './Videocall';

export function Router() {
  const router = Div({ styles: { height: '100%', overflow: 'hidden' } });

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
        router.append(Videocall());
        break;
      default:
        break;
    }
  }

  init();

  return router;
}
