const words = require("../data/data");
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const generateSingle = () => {
  const generatedWord = words[Math.floor(Math.random() * words.length)];
  return { word: generatedWord };
};

const generateMultiple = (number) => {
  const generatedWords = Array.from({ length: number }, () => ({
    word: words[Math.floor(Math.random() * words.length)],
  }));
  fs.writeFileSync(
    path.join(__dirname, "../generated/restOut.json"),
    JSON.stringify(generatedWords)
  );
  return { words: generatedWords };
};

app.get("/single", (req, res) => {
  res.json(generateSingle()).send();
});

app.get("/multiple", (req, res) => {
  const number = isNaN(parseInt(req.query.number))
    ? 1
    : parseInt(req.query.number);
  res.json(generateMultiple(number)).send();
});

module.exports = (port) => {
  app.listen(port, () => {
    console.log("Rest Server running at PORT:", port);
  });
};
