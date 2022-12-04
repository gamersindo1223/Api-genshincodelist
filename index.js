const express = require("express")
const path = require("path")
require("./scrap")
const app = express()
const cors = require("cors")
const port = 3000
const fs = require("fs")
const rateLimit = require("express-rate-limit")
const limiter = rateLimit({
  windowMs: 3000, // 15 minutes
  max: 3, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true,
  message: `You requested too many time wait 3 seconds before requesting again`, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use(limiter)
app.use(cors())
app.get('/codes-list', async (req, res) => {
  res.sendFile(path.join(__dirname + "/tmp/codes.txt"))
})
app.get('/', (req, res) => {
  const uptime = process.uptime();
  const hours = Math.trunc(uptime / 3600).toString().padStart(2, "0");
  const minutes = Math.trunc((uptime % 3600) / 60).toString().padStart(2, "0");
  const seconds = Math.trunc(uptime % 60).toString().padStart(2, "0");
  res.send(`The program has been running for 
${hours}:${minutes}:${seconds} \n Go to /api/genshin-codes to see the api`)
})
app.get('/api/genshin-codes', async (req, res) => {
  var text = fs.readFileSync(path.join(__dirname + "/tmp/codes.txt"), "utf-8");
  var textByLine = text.toString().split("\n").filter(element => {return element !== '';})
  const formattedcodes = []
  for(let i = 0; i < textByLine.length; i += 2){
      formattedcodes.push(textByLine[i] + "_" + textByLine[i+1])
  }
  res.json({ 
  activecodes: formattedcodes, 
  creator: "Gamers_indo1223", 
  scrappedweb: "https://www.eurogamer.net/genshin-impact-codes-livestream-active-working-how-to-redeem-9026", 
  hostedin: "cyclic", 
  })
})

app.listen(port, "127.0.0.1", () => {
  console.log(`Example app listening on port ${port}`)
})