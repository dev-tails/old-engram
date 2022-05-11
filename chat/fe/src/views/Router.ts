import { Div } from '../components/Div';
import { setStyle } from '../utils/DomUtils';
import { RoomList } from './RoomList';
import { RoomView } from './RoomView';

export function Router() {
  const router = Div({
    class: 'router',
  });

  setStyle(router, {
    flexGrow: "1",
  })

  function init() {
    handleRouteUpdated();
  }

  window.addEventListener("popstate", handleRouteUpdated);

  function handleRouteUpdated() {
    router.innerHTML = "";
    const path = window.location.pathname;

    if (path === "/") {
      router.style.setProperty('display', 'block');
      router.append(RoomList());
    } else if (path.includes("rooms")) {
      router.style.setProperty('display', 'flex');
      // router.append(RoomList());
      const roomId = path.split("/")[2];
      router.append(RoomView({
        roomId
      }))
    }
  }

  init();

  return router;
}
