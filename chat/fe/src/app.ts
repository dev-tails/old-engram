import { Router } from './views/Router';

const root = document.getElementById("root");

const btnLogin = document.getElementById("login");
btnLogin.addEventListener("click", async function () {
  const email = prompt("email");
  const password = prompt("password");

  const res = await fetch("/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (res.ok) {
    btnLogin.style.display = "none";
  }
});

const router = Router();

root.append(router);