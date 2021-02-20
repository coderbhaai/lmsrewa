const express = require('express')
const router = express.Router();
var pool = require('./mysqlConnector')
const asyncMiddleware = require('./asyncMiddleware')
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

router.post('/createTest', asyncMiddleware( async(req, res) => {
    var data = await func.createTest(JSON.parse(req.body.filter))
    let post= {
        'userId':               req.body.userId,
        'filter':               req.body.filter,
        'questions':            JSON.stringify(data[0]),
        'solution':             JSON.stringify(data[1]),
        'marks':                JSON.stringify(data[2]),
        'total':                data[3],
        'status':               1,
        "created_at":           time,
        "updated_at":           time,
    }
    let sql = `INSERT INTO testpaper SET ?`
    pool.query(sql, post, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ success: true, data: results.insertId, message: 'Best of Luck for the test' }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/checkQuestSummary', asyncMiddleware( async(req, res) => {
    if(req.body.difficultySelected){ var difficulty=`AND difficulty='${req.body.difficultySelected}'`}else{ var difficulty=''}
    if(req.body.typeSelected){ var type= `AND type = ${req.body.typeSelected}`}else{ var type=''}
    let sql = `SELECT classes, subject, topic, subTopic, difficulty, type, count FROM questsummary WHERE classes=${req.body.classSelected} AND subject='${req.body.subjectSelected}' ${difficulty} ${type};`
    pool.query(sql, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ success: true, data: results  }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/testPaper', asyncMiddleware((req, res) => {
    let sql = `SELECT filter, questions, solution, marks, answer, total, score, updated_at FROM testpaper WHERE id=${req.body.id} AND userId='${req.body.userId}';`
    pool.query(sql, async(err, results) => {
        try{
            if(err){ throw err }
            if(results && results[0]){
                if(results[0].answer){
                    var message = 'Take another test'
                    var solved = true
                }else{
                    var solved = false
                    var message = 'Best of Luck for the test'
                }
                const questions = await func.getQuestions(JSON.parse(results[0].questions))
                res.send({ success: true, data: results[0], questions, message, solved });
            }else{
                res.send({ success: false, message: 'You are not authorised' });
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/submitTest', asyncMiddleware(async(req, res) => {
    const score = await func.calculateScore(JSON.parse(req.body.solution), JSON.parse(req.body.answer), JSON.parse(req.body.marks))  
    let post= {
        'answer':                       req.body.answer,
        "updated_at":                   time,
        "score":                        score,
    }
    let sql = `UPDATE testpaper SET ? WHERE id = ${req.body.id} AND userId = ${req.body.userId}`;
    pool.query(sql, post, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){
                res.send({ success: true, answer: req.body.answer, score, message: 'Test submitted successfully', solved: true });
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))



module.exports = router;