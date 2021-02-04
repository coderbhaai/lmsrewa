const express = require('express')
const router = express.Router()
var pool = require('./mysqlConnector')
const asyncMiddleware = require('./asyncMiddleware')
const func = require('./functions')
const time = new Date().toISOString().slice(0, 19).replace('T', ' ')
const nodemailer = require("nodemailer");
router.use('/auth', require('./auth'))
router.use('/admin', require('./admin'))
const transporter = nodemailer.createTransport({ host: "smtpout.secureserver.net", port: 465, secure: true, auth: { user: 'contactus@thetrueloans.com', pass: 'contactus@123',  debug: true }, tls:{ rejectUnauthorized: false, secureProtocol: "TLSv1_method" } });


router.get('/blog', asyncMiddleware( async(req, res, next) => {
    let sql = `SELECT a.id, a.title, a.url, a.coverImg, a.updated_at, b.image FROM blogs as a left join media as b on b.id = a.coverImg ORDER BY id DESC;`
    pool.query(sql, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ data: results }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/single/:url', asyncMiddleware( async(req, res, next) => {
    let sql = `SELECT a.id, a.title, a.url, a.coverImg, a.content, a.updated_at, b.image FROM blogs as a left join media as b on b.id = a.coverImg WHERE a.url = '${req.params.url}';`
    pool.query(sql, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ data: results[0] }) }
        }catch(e){ func.logError(e); res.status(500); return; }
    });
}))

router.get('/suggestBlogs', asyncMiddleware( async(req, res, next) => {
    let sql = `SELECT a.id, a.title, a.url, a.coverImg, a.updated_at, b.image FROM blogs as a left join media as b on b.id = a.coverImg ORDER by RAND() LIMIT 6;`
    pool.query(sql, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ data: results }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))











module.exports = router;