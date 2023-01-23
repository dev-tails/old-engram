const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, () => console.log('Listening on port 3000'));
