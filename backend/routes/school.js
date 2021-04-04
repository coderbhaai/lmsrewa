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

var date = new Date().toISOString().slice(0, 10)
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

router.get('/schoolAttendance/:id', asyncMiddleware( async(req, res) => {
    let sql = `SELECT a.id, a.schoolId, a.type, a.name, a.tab1, b.name as tab1Name FROM schoolbasics as a 
    left join schoolbasics as b on b.id = a.tab1 WHERE a.type IN ('Class', 'Subject') AND a.schoolId = '${req.params.id}';`
    pool.query(sql, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ data: results }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/schoolGroups/:id', asyncMiddleware( async(req, res) => {
    let sql = `SELECT id, name, schoolId, students, teachers FROM groups WHERE schoolId = '${req.params.id}';
                SELECT a.id, a.name, a.tab1, b.name as tab1Name FROM schoolbasics as a left join schoolbasics as b on b.id = a.tab1 WHERE a.schoolId = '${req.params.id}' AND a.type='Student';`
    pool.query(sql,[1,2], (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ groups: results[0], students: results[1] }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/addSchoolGroup', asyncMiddleware( async(req, res) => {
    let post= {
        'schoolId':             req.body.schoolId,
        'name':                 req.body.name,
        "created_at":           time,
        "updated_at":           time,
    }
    let sql = `INSERT INTO groups SET ?`
    pool.query(sql, post, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){
                const data = await func.getSchoolGroup(results.insertId)
                res.send({ success: true, data, message: 'Group created successfuly' });
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/updateGroupName', asyncMiddleware( async(req, res) => {
    let post= {
        'name':                 req.body.name,
        "updated_at":           time,
    }
    let sql = `UPDATE groups SET ? WHERE id = '${req.body.id}'`;
    pool.query(sql, post, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){
                const data = await func.getSchoolGroup(req.body.id)
                res.send({ success: true, data, message: 'Group updated successfuly' });
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/updateGroupStudents', asyncMiddleware( async(req, res) => {
    let post= {
        'students':                 req.body.students,
        "updated_at":               time,
    }
    let sql = `UPDATE groups SET ? WHERE id = '${req.body.id}'`;
    pool.query(sql, post, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){
                const data = await func.getSchoolGroup(req.body.id)
                res.send({ success: true, data, message: 'Group updated successfuly' });
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/schoolAttendanceStudents', asyncMiddleware( async(req, res) => {
    let sql = `SELECT a.id, a.name, a.tab1, b.name as tab1Name FROM schoolbasics as a left join schoolbasics as b on b.id = a.tab1 
    WHERE a.type = 'Student' AND a.schoolId = '${req.body.schoolId}' AND a.tab1 = '${req.body.classes}';`
    pool.query(sql, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ data: results }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/submitAttendance', asyncMiddleware( async(req, res) => {
    let post= {
        'date':                 date,
        'schoolId':             req.body.schoolId,
        'teacher':              req.body.teacher,
        'class':                req.body.classes,
        'subject':              req.body.subject,
        'present':              req.body.present,
        'absent':               req.body.absent,
        "created_at":           time,
        "updated_at":           time,
    }
    let sql = `INSERT INTO attendance SET ?`
    pool.query(sql, post, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ success: true, message: 'Attendance marked successfuly' }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/teacherAttendance', asyncMiddleware( async(req, res) => {
    let sql = `SELECT a.id, a.date, a.class, a.subject, a.present, a.absent, b.name as subjectName, c.name as className FROM attendance as a left join schoolbasics as b on b.id = a.subject left join schoolbasics as c on c.id = a.class WHERE a.schoolId = '${req.body.schoolId}' AND a.teacher = '${req.body.teacher}';
    SELECT DISTINCT a.class, b.name as className FROM attendance as a left join schoolbasics as b on b.id = a.class WHERE a.schoolId = '${req.body.schoolId}' AND a.teacher = '${req.body.teacher}';
    SELECT DISTINCT a.subject, b.name as subjectName FROM attendance as a left join schoolbasics as b on b.id = a.subject WHERE a.schoolId = '${req.body.schoolId}' AND a.teacher = '${req.body.teacher}';`
    pool.query(sql, [1,2,3], async(err, results) => {
        try{
            if(err){ throw err }
            if(results){
                res.send({ 
                    attendance: results[0],
                    classes: results[1],
                    subject: results[2],
                }); 
        }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/showAttendance', asyncMiddleware( async(req, res) => {
    const present = await func.getNames(req.body.present)
    const absent = await func.getNames(req.body.absent)
    res.send({ present, absent });
    // let sql = `SELECT id, name FROM schoolbasics WHERE id IN (${JSON.parse(req.body.present)});
    //            SELECT id, name FROM schoolbasics WHERE id IN (${JSON.parse(req.body.absent)});`
    // pool.query(sql, [1,2], async(err, results) => {
    //     try{
    //         if(err){ throw err }
    //         if(results){
    //             console.log(`results`, results)
    //             res.send({ 
    //                 present: results[0],
    //                 absent: results[1],
    //             });
    //         }
    //     }
    //     catch(e){ func.logError(e); res.status(500); return; }
    // })
}))

module.exports = router;