import { Div } from '../components/Div';
import { setStyle } from '../utils/DomUtils';
import { RoomList } from './RoomList';
import { RoomView } from './RoomView';

export function Router() {
  const router = Div();

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
      router.append(RoomList());
    } else if (path.includes("rooms")) {
      const roomId = path.split("/")[2];
      router.append(RoomView({
        roomId
      }))
    }
  }

  init();

  return router;
}
