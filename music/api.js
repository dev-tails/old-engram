const express = require("express");
const fs = require("fs");

const app = express();

app.use("/data", express.static("data"));

app.get("", (req, res) => {
  let bodyHtml = "";

  const artists = fs.readdirSync("data/artists");
  for (const artist of artists) {
    bodyHtml += `<h1>${artist}</h1>`;
    const albums = fs.readdirSync(`data/artists/${artist}`);
    for (const album of albums) {
      bodyHtml += `<h2>${album}</h2>`;
      const tracks = fs.readdirSync(`data/artists/${artist}/${album}`);
      for (const track of tracks) {
        bodyHtml += `<h3>${track.split(".")[0]}</h3>`;
        bodyHtml += `<audio controls src="/data/artists/${artist}/${album}/${track}"></audio>`
      }
    }
  }

  const dearMarie = "data/artists/john-mayer/DearMarie.m4a";
  res.send(`
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Music</title>
  </head>
  <body>
    ${bodyHtml}
  </body>
  </html>
  `);
});

app.listen(1342, () => {
  console.log("http://localhost:1342");
});
