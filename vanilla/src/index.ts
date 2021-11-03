import { App } from './App';
import { ElementUtils } from './ElementUtils';

(function () {
  const body = document.getElementsByTagName("body")[0];

  ElementUtils.setStyles(body, { margin: "0" });

  const root = document.getElementById("root");
  root.appendChild(App());
})();
