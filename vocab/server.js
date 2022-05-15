const fs = require("fs");
const express = require("express");

const words = [];
const csvFilename = "public/words.csv";

const wordsCsvContents = String(fs.readFileSync(csvFilename));
const rows = wordsCsvContents.split("\n");
for (const row of rows) {
  const cols = row.split(",");
  words.push({
    id: Number(cols[0]),
    en: cols[1],
    bg: cols[2],
    pos: Number(cols[3]),
  });
}

const app = express();

app.use(express.json());

app.post("/api/vocab", (req, res) => {
  let nextId = 1;
  if (words.length) {
    nextId = words[words.length - 1].id + 1;
  }

  const newWord = {
    ...req.body,
    id: nextId,
  };

  const existingWordIndex = words.findIndex((word) => {
    return word.en === newWord.en || word.bg === newWord.bg;
  });
  if (existingWordIndex >= 0) {
    return res.sendStatus(400);
  }

  fs.appendFileSync(
    csvFilename,
    `${newWord.id},${newWord.en},${newWord.bg},${newWord.pos}\n`
  );
  words.push(newWord);
  res.sendStatus(200);
});

app.use(express.static("public"));

app.listen(1338, () => {
  console.log("http://localhost:1338");
});
