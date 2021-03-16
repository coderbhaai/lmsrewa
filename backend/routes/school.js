const express = require('express')
const router = express.Router();
var pool = require('./mysqlConnector')
const asyncMiddleware = require('./asyncMiddleware')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const nodemailer = require("nodemailer");
const func = require('./functions')

var bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: true }))
router.use(bodyParser.json())
const upload = require('express-fileupload')
const fs = require('fs')
router.use(upload())

const time = new Date().toISOString().slice(0, 19).replace('T', ' ')
const transporter = nodemailer.createTransport({ host: "smtpout.secureserver.net", port: 465, secure: true, auth: { user: 'contactus@thetrueloans.com', pass: 'contactus@123',  debug: true }, tls:{ rejectUnauthorized: false, secureProtocol: "TLSv1_method" } });


router.get('/schoolBasics', asyncMiddleware( async(req, res) => {
    let sql = `SELECT a.id, a.schoolId, a.type, a.name, a.tab1, a.tab2, a.tab3, a.updated_at, b.name as tab1Name, c.name as tab2Name, d.name as tab3Name FROM schoolbasics as a 
    left join schoolbasics as b on b.id = a.tab1 left join schoolbasics as c on c.id = a.tab2 left join schoolbasics as d on d.id = a.tab3;`
    pool.query(sql, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ data: results }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/addSchoolBasic', asyncMiddleware( async(req, res) => {
    let post= {
        'type':                 req.body.type,
        'schoolId':             req.body.schoolId,
        'name':                 req.body.name,
        'tab1':                 req.body.tab1,
        'tab2':                 req.body.tab2,
        'tab3':                 req.body.tab3,
        "created_at":           time,
        "updated_at":           time,
    }
    let sql = `INSERT INTO schoolbasics SET ?`
    pool.query(sql, post, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){
                const data = await func.getSchoolBasic(results.insertId)
                res.send({ success: true, data, message: 'Masters added successfuly' });
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/updateSchoolBasic', asyncMiddleware( async(req, res) => {
    let post= {
        'type':                 req.body.type,
        'schoolId':             req.body.schoolId,
        'name':                 req.body.name,
        'tab1':                 req.body.tab1,
        'tab2':                 req.body.tab2,
        'tab3':                 req.body.tab3,
        "updated_at":           time,
    }
    let sql = `UPDATE schoolbasics SET ? WHERE id = '${req.body.id}'`;
    pool.query(sql, post, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){
                const data = await func.getSchoolBasic(req.body.id)
                res.send({ success: true, data, message: 'Masters updated successfuly' });
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))




module.exports = router;