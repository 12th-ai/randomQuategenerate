const express = require("express");
const cors = require("cors");
const quote = require("./quote.json");
const app = express();
const cron = require("node-cron");

let quoteslenth = quote.length;

let randomquoteIndex;

app.get("/", (req, res) => {
  randomquoteIndex = (Math.random() * quoteslenth) | 0;
  res.send(quote[randomquoteIndex]);
});

cron.schedule("* * * * *", (req, res) => {
  randomquoteIndex = (Math.random() * quoteslenth) | 0;
  console.log("Random Quote:", quote[randomquoteIndex]);
  res.send("random quote generated : ", quote[randomquoteIndex]);
});

setInterval(() => {
  if (quoteslenth > 0) {
    let randomquoteIndex = Math.floor(Math.random() * quoteslenth);

    const generatedQuote = quote[randomquoteIndex];

    console.log(generatedQuote);

    quote.splice(randomquoteIndex, 1);

    quoteslenth = quote.length;
  } else {
    console.log("no more quote");
  }
}, 3000); // 3000 milliseconds = 3 seconds

app.listen(300, () => {
  console.log("app is learnng");
});
