const bg = document.getElementById("bg");
const en = document.getElementById("en");
const pos = document.getElementById("pos");
const save = document.getElementById("save");

save.addEventListener("click", async () => {
  await fetch("/api/vocab", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      bg: bg.value,
      en: en.value,
      pos: pos.value,
    }),
  });
  bg.value = "";
  en.value = "";
});

const text = document.getElementById("text");
const highlighted = document.getElementById("highlighted");
const btnHighlight = document.getElementById("btn-highlight");

btnHighlight.addEventListener("click", async () => {
  const res = await fetch("/api/highlight", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      body: text.value
    }),
  });
  const { html } = await res.json();
  highlighted.innerHTML = html;
})
