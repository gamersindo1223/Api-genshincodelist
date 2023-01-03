require("dotenv").config()
const express = require('express')
const app = express();
const cors = require('cors')
const port = process.env.PORT || 3000
const rateLimit = require("express-rate-limit")
const Api = require("./Api")
const limiter = rateLimit({
  windowMs: 3000,
  max: 3,
  standardHeaders: true,
  message: { messge: `You requested too many time wait 3 seconds before requesting again` },
  legacyHeaders: false,
})

app.use(limiter)
app.use(cors())
app.get("/", async (req, res) => {
  res.send({ message: "Please refer to the docs", docs: "genshincodeslist.is-an.app/docs" })
  res.send({message: "Please refer to the docs", docs: "genshincodeslist.is-an.app/docs"})
})
app.get("/code", Api.genshin)
app.get("*", async (req, res) => {
  res.status(404).json({ message: '404 Not found' })
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
  console.log("Press Ctrl+C to quit.")
})
