const bg = document.getElementById("bg");
const en = document.getElementById("en");
const pos = document.getElementById("pos");
const save = document.getElementById("save");

save.addEventListener("click", async () => {
  console.log("click")
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
