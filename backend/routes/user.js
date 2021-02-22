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

let today = new Date().toISOString().slice(0, 10)
const time = new Date().toISOString().slice(0, 19).replace('T', ' ')
const transporter = nodemailer.createTransport({ host: "smtpout.secureserver.net", port: 465, secure: true, auth: { user: 'contactus@thetrueloans.com', pass: 'contactus@123',  debug: true }, tls:{ rejectUnauthorized: false, secureProtocol: "TLSv1_method" } });

router.post('/createTest', asyncMiddleware( async(req, res) => {
    console.log('create test')
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

router.post('/submitAnswer', asyncMiddleware(async(req, res) => {
    console.log('req.body', req.body)
    if(req.body.answer == req.body.solution){
        await func.increaseScore(req.body.dpId, req.body.marks)
        var message = "Right Answer, Well done"
    }else{
        var message = "Wrong Answer, Try another one"
    }
    let post= {
        'answer':                       req.body.answerList,
        "updated_at":                   time,
    }
    let sql = `UPDATE dailypractice SET ? WHERE id = ${req.body.dpId} AND userId = ${req.body.userId}`;
    pool.query(sql, post, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){ 
                const details = await func.getdpDetails(req.body.dpId)
                console.log('details in submit', details)
                res.send({ success: true, details, message}); 
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/dailyPracticeData', asyncMiddleware((req, res) => {
    let sql = `SELECT a.id, a.package, a.validfrom, a.validto, a.status, b.board, b.classes FROM packagesubscription as a left join students as b on b.userId = a.userId WHERE a.userId='${req.body.userId}';`
    pool.query(sql, async(err, results) => {
        try{
            if(err){ throw err }
            if(results && results[0]){
                var today = new Date();
                if(today<results[0].validto){
                    let sql = `SELECT id, type, name, tab1, tab2, tab3 FROM basics WHERE tab1='${results[0].classes}';`
                    pool.query(sql, async(err2, results2) => {
                        try{
                            if(err2){ throw err2 }
                            if(results2){ res.send({ success: true, data: results2, message: 'Happy Practicing' }); }
                        }catch(e){ func.logError(e); res.status(500); return; }
                    })
                }else{
                    res.send({ success: false, message: 'Your subscription has expired' });
                }
            }else{
                res.send({ success: false, message: 'You have not subscribed the package yet' });
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/startDailyPractice', asyncMiddleware((req, res) => {
    console.log('req.body', req.body)    
    let sql = `SELECT id, date, questions, solution, answer, marks, total, score FROM dailypractice WHERE userId='${req.body.userId}' AND date= '${today}';`
    pool.query(sql, async(err, results) => {
        try{           
            if(err){ throw err }
            console.log('results[0]', results[0])
            if(results && results[0]){
                if(results[0].answer){
                    if(JSON.parse(results[0].questions).length==JSON.parse(results[0].answer).length){
                        const newQ = await func.getNewQuestion(req.body.subTopic, JSON.parse(results[0].questions))
                        const xx = await func.updatePractice(results[0].id, [newQ.id, newQ.solution, newQ.marks])
                        console.log('check', xx)
                        const details = await func.getdpDetails(results[0].id)
                        console.log('details 1', details)
                        res.send({ success: true, data: newQ, details, id: results[0].id, message: 'Try this question' });
                    }else{
                        var id = JSON.parse(results[0].questions).slice(-1)[0]
                        const sameQ = await func.sameQuestion(id)
                        const details = await func.getdpDetails(id)
                        console.log('details 2', details)
                        res.send({ success: true, data: sameQ, details, id: results[0].id, message: 'Happy Practicing' });
                    }
                }else{
                    var id = JSON.parse(results[0].questions).slice(-1)[0]
                    const sameQ = await func.sameQuestion(id)
                    const details = await func.getdpDetails(id)
                    console.log('details 3', details)
                    res.send({ success: true, data: sameQ, details, id: results[0].id, message: 'Happy Practicing' });
                }
            }else{
                var exclude=[];
                const newQ = await func.getNewQuestion(req.body.subTopic, exclude)
                const xx = await func.insertPractice(req.body.userId, [newQ.id, newQ.solution, newQ.marks] )
                console.log('xx', xx)
                const details = await func.getdpDetails(xx.insertId)
                console.log('details 4', details)
                res.send({ success: true, data: newQ, details, id: xx.insertId, message: 'Happy Practicing' });
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/nextQuestion', asyncMiddleware(async(req, res) => {
    console.log('req.body', req.body) 
    const newQ = await func.getNewQuestion(req.body.subTopic, req.body.exclude)
    console.log('newQ in nextQuestion', newQ)

    const xx = await func.updatePractice(req.body.userId, [newQ.id, newQ.solution, newQ.marks] )
    console.log('xx', xx)
    // res.send({ success: true, data: newQ });



    // let sql = `SELECT id, date, questions, solution, answer, marks, total, score FROM dailypractice WHERE userId='${req.body.userId}' AND date= '${today}';`
    // pool.query(sql, async(err, results) => {
    //     try{
    //         const newQ = await func.getNewQuestion(req.body.subTopic)
    //         console.log('newQ', newQ)
    //         if(err){ throw err }
    //         // console.log('results[0]', results[0])
    //         if(results && results[0]){
    //         //     var today = new Date();
    //         //     if(today<results[0].validto){
    //         //         let sql = `SELECT id, type, name, tab1, tab2, tab3 FROM basics WHERE tab1='${results[0].classes}';`
    //         //         pool.query(sql, async(err2, results2) => {
    //         //             try{
    //         //                 if(err2){ throw err2 }
    //         //                 if(results2){ res.send({ success: true, data: results2, message: 'Happy Practicing' }); }
    //         //             }catch(e){ func.logError(e); res.status(500); return; }
    //         //         })
    //         //     }else{
    //         //         res.send({ success: false, message: 'Your subscription has expired' });
    //         //     }
    //         // }else{
    //             res.send({ success: false, message: 'You have not subscribed the package yet' });
    //         }else{
    //             const xx = await func.insertPractice(req.body.userId, [newQ.id, newQ.solution, newQ.marks] )
    //             console.log('xx', xx)
    //             res.send({ success: true, data: newQ });
    //         }
    //     }catch(e){ func.logError(e); res.status(500); return; }
    // })
}))

module.exports = router;