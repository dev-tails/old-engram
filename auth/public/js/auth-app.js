(() => {
  // ../ui/components/Div.ts
  function Div() {
    return document.createElement("div");
  }

  // ../ui/components/Input.ts
  function Input() {
    return document.createElement("input");
  }

  // ../ui/components/Button.ts
  function Button() {
    return document.createElement("button");
  }

  // src/AuthApp.ts
  var root = document.getElementById("root");
  var authForm = Div();
  var emailInput = Input();
  emailInput.placeholder = "email";
  authForm.append(emailInput);
  var passwordInput = Input();
  passwordInput.placeholder = "password";
  passwordInput.type = "password";
  authForm.append(passwordInput);
  var submitButton = Button();
  submitButton.innerText = "Log in";
  authForm.append(submitButton);
  submitButton.addEventListener("click", async () => {
    try {
      const res = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: emailInput.value,
          password: passwordInput.value
        })
      });
      if (res.ok) {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        console.log(params.redirect_to);
        window.location.href = params.redirect_to;
      } else {
        alert("Failed to log in");
      }
    } catch (err) {
      alert(err.message);
    }
  });
  root.append(authForm);
})();
