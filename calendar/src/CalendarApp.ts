import { Button } from '../../ui/components/Button';
import { Div } from '../../ui/components/Div';

const root = document.getElementById("root");

const header = Div();
header.style.display = "flex";
header.style.justifyContent = "space-between";

const leftHeader = Div();
leftHeader.style.display = "flex";
header.append(leftHeader);

const todayButton = Button();
todayButton.innerText = "Today";
leftHeader.append(todayButton);

const leftButton = Button();
leftButton.innerText = "<";
leftButton.style.marginLeft = "4px";
leftHeader.append(leftButton);

const rightButton = Button();
rightButton.innerText = ">";
rightButton.style.marginLeft = "4px";
leftHeader.append(rightButton);

const monthText = Div();
monthText.innerText = "February 2022";
monthText.style.marginLeft = "4px";
leftHeader.append(monthText);

const usernameText = Div();
header.append(usernameText);

const loginButton = Button();
loginButton.style.display = "none";
loginButton.innerText = "Login";

loginButton.addEventListener("click", () => {
  window.location.href =
    "http://xyzdigital.local?redirect_to=http://calendar.xyzdigital.local";
});

header.append(loginButton);

root.append(header);

async function init() {
  const res = await fetch("/api/users/self");
  const jsonData = await res.json();
  if (jsonData.data) {
    usernameText.innerText = jsonData.data.name;
  } else {
    loginButton.style.display = "block";
  }
}

init();
