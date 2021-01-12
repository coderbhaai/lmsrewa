const express = require('express')
const router = express.Router()
var pool = require('./mysqlConnector')
const asyncMiddleware = require('./asyncMiddleware')
const func = require('./functions')
const time = new Date().toISOString().slice(0, 19).replace('T', ' ')
const nodemailer = require("nodemailer");
var bodyParser = require('body-parser')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
var cookieParser = require('cookie-parser')
router.use(cookieParser())


router.use('/auth', require('./auth'))

const transporter = nodemailer.createTransport({ host: "smtpout.secureserver.net", port: 465, secure: true, auth: { user: 'contactus@thetrueloans.com', pass: 'contactus@123',  debug: true }, tls:{ rejectUnauthorized: false, secureProtocol: "TLSv1_method" } });

module.exports = router;