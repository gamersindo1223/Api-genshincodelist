require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
mongoose.set("strictQuery", true);
const datascheme = mongoose.model(
  "codelist",
  new mongoose.Schema({
    datalist: Object,
    updatelist: String,
    Find: String,
  })
);
mongoose.connect(process.env.DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const limiter = rateLimit({
  windowMs: 3000,
  max: 3,
  standardHeaders: true,
  message: {
    messge: `You requested too many time wait 3 seconds before requesting again`,
  },
  legacyHeaders: false,
})
app.use(cors(), bodyParser.json(), limiter);
app.get("/", async (req, res) => {
  res.send({
    message: "Please refer to the docs",
    docs: "genshincodeslist.is-an.app/docs",
  });
});
app.post("/update", async (req, res) => {
  if (req.headers.authorization !== process.env.POST_SECRET_KEY) {
    return res.status(400).json({ message: "Wrong Authorization Token!" });
  }
  datascheme.findOneAndDelete({ Find: "Web" }, async (err, data) => {
    if (data) {
      data = new datascheme({
        datalist: req.body,
        updatelist: new Date(),
        Find: "Web",
      });
      await data.save();
      return res.status(300).end();
    } else {
      data = data = new datascheme({
        datalist: req.body,
        updatelist: new Date(),
        Find: "Web",
      });
      await data.save();
      return res.status(300).end();
    }
  });
});
app.get("/code", async (req, res) => {
  datascheme.findOne({ Find: "Web" }, async (err, data) => {
    if (data) {
      res.status(300).json(data.datalist)
    }
    })
});

app.get("*", async (req, res) => {
  res.status(404).json({ message: "404 Not found" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
