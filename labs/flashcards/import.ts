import papaparse from "papaparse";

const csvInput = document.getElementById("csv-file") as HTMLInputElement;
csvInput.addEventListener("change", () => {
  const file = csvInput.files[0];
  var reader = new FileReader();
  reader.readAsText(file, "UTF-8");
  reader.onload = function (evt) {
    const csvText = evt.target.result;
    const parseResult = papaparse.parse(csvText);

    let cards = [];
    for (const data of parseResult.data) {
      cards.push({
        front: data[0],
        back: data[1],
      });
    }

    localStorage.setItem("cards", JSON.stringify(cards));
  };
});
