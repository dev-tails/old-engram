const baseURL = "http://localhost:1337"

export function setURL(url: string) {
  history.pushState({}, "", new URL(`${baseURL}${url}`));
  window.dispatchEvent(new Event('popstate'));
}
