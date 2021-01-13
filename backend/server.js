const express = require('express')
var cors = require('cors')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
var cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(cors())
const index = require("./routes/index")
app.use("/", index)
const port = process.env.PORT || 3060;
app.listen(port, function listenHandler() { console.log(`Running on ${port}`) });