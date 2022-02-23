(() => {
  // ../ui/components/Button.ts
  function Button() {
    return document.createElement("button");
  }

  // ../ui/components/Div.ts
  function Div() {
    return document.createElement("div");
  }

  // src/CalendarApp.ts
  var root = document.getElementById("root");
  var header = Div();
  header.style.display = "flex";
  header.style.justifyContent = "space-between";
  var leftHeader = Div();
  leftHeader.style.display = "flex";
  header.append(leftHeader);
  var todayButton = Button();
  todayButton.innerText = "Today";
  leftHeader.append(todayButton);
  var leftButton = Button();
  leftButton.innerText = "<";
  leftButton.style.marginLeft = "4px";
  leftHeader.append(leftButton);
  var rightButton = Button();
  rightButton.innerText = ">";
  rightButton.style.marginLeft = "4px";
  leftHeader.append(rightButton);
  var monthText = Div();
  monthText.innerText = "February 2022";
  monthText.style.marginLeft = "4px";
  leftHeader.append(monthText);
  var usernameText = Div();
  header.append(usernameText);
  var loginButton = Button();
  loginButton.style.display = "none";
  loginButton.innerText = "Login";
  loginButton.addEventListener("click", () => {
    window.location.href = "http://xyzdigital.local?redirect_to=http://calendar.xyzdigital.local";
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
})();
