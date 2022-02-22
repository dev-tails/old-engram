import { Div } from '../../ui/components';
import { Button } from '../../ui/components/Button';
import { Input } from '../../ui/components/Input';

const root = document.getElementById("root");

const authForm = Div();

const emailInput = Input();
emailInput.placeholder = "email";
authForm.append(emailInput);

const passwordInput = Input();
passwordInput.placeholder = "password";
passwordInput.type = "password";
authForm.append(passwordInput);

const submitButton = Button();
submitButton.innerText = "Log in";
authForm.append(submitButton);

submitButton.addEventListener("click", async () => {
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
})

root.append(authForm);
