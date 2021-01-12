const express = require('express')
var cors = require('cors')
const index = require("./routes/index")
const app = express()
var bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use("/", index)
const port = process.env.PORT || 3060;
app.listen(port, function listenHandler() { console.log(`Running on ${port}`) });