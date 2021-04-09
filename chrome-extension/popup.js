function formatDate(date) {
  const offset = date.getTimezoneOffset();
  const dateWithOffset = new Date(date.getTime() - offset * 60 * 1000);
  return dateWithOffset.toISOString().split("T")[0];
}

window.onload = async function () {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  const submitButton = document.getElementById("submit");
  const noteBodyElement = document.getElementById("noteBody");
  const noteBody = "[" + tab.title + "]" + "(" + tab.url + ")";
  noteBodyElement.value = noteBody;

  submitButton.addEventListener("click", async () => {
    const url = "https://engram.xyzdigital.com/api/notes";
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ body: noteBody, date: formatDate(new Date()) }),
    });
    window.close();
  });
};
