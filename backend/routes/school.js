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
}))

router.post('/getLeads', asyncMiddleware( async(req, res) => {
    let sql = `SELECT a.id, a.schoolId, a.name, a.email, a.phone, a.source, a.status, a.counsellor, a.updated_at, b.name as counsellorName, b.role as counsellorRole FROM leads as a left join users as b on b.id= a.counsellor WHERE a.schoolId = '${req.body.schoolId}';
                SELECT id, name, role FROM users WHERE institute = '${req.body.schoolId}' AND status=1;`
    pool.query(sql, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ leads: results[0], counsellors: results[1] }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/addLead', asyncMiddleware( async(req, res) => {
    let post= {
        'schoolId':             req.body.schoolId,
        'name':                 req.body.name,
        'email':                req.body.email,
        'phone':                req.body.phone,
        'source':               req.body.source,
        'status':               req.body.status,
        "created_at":           time,
        "updated_at":           time,
    }
    let log ={
        "schoolId":                 req.body.schoolId,
        "type":                     "Single",
        "entry":                    "Lead added in system",
        "loggedby":                 req.body.loggedby,
        "created_at":               time,
        "updated_at":               time,
    }
    let sql = `INSERT INTO leads SET ?`
    pool.query(sql, post, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){ 
                log['leadId'] = results.insertId
                await func.addLog(log)
                const data = await func.getSingleLead(results.insertId)
                res.send({ success: true, data, message: "Lead added successfully" });
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/updateLead', asyncMiddleware( async(req, res) => {
    let post= {
        'name':                 req.body.name,
        'email':                req.body.email,
        'phone':                req.body.phone,
        'source':               req.body.source,
        'status':               req.body.status,
        "updated_at":           time,
    }
    let log ={
        "schoolId":                 req.body.schoolId,
        "type":                     "Single",
        "leadId":                   req.body.id,
        "loggedby":                 req.body.loggedby,
        "created_at":               time,
        "updated_at":               time,
    }
    let sql = `UPDATE leads SET ? WHERE id = '${req.body.id}'`;
    pool.query(sql, post, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){ 
                const data = await func.getSingleLead(req.body.id)
                if(req.body.changes.length){
                    var text = ''
                    req.body.changes.forEach(i => text += ` ${i}.`);
                    log['entry'] = `lead updated with changes: ${text}`
                    await func.addLog(log)
                }
                res.send({ data, message: "Lead updated successfully" }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/uploadExcelUsers', asyncMiddleware( async(req, res) => {
    var values = [];
    for(var i=0; i< req.body.jsonData.length; i++)
    values.push([
        req.body.jsonData[i].schoolId,
        req.body.jsonData[i].name,
        req.body.jsonData[i].email,
        req.body.jsonData[i].phone,
        req.body.jsonData[i].status,
        req.body.jsonData[i].source,
        time, 
        time
    ]);
    let log ={
        "schoolId":                 req.body.schoolId,
        "type":                     "Multiple",
        "entry":                    "Lead added in system",
        "loggedby":                 req.body.loggedby,
        "created_at":               time,
        "updated_at":               time,
    }
    pool.query(`INSERT INTO leads (schoolId, name, email, phone, status, source, created_at, updated_at) VALUES ?`, [values], async(err, results) => {
        try{
            if(err){ throw err }
            if(results){
                let sql2 = `SELECT * FROM leads ORDER BY id DESC LIMIT ${results.affectedRows};`
                pool.query(sql2, async(err2, results2) => {
                    try{
                        if(err2){ throw err2 }
                        if(results2){ 
                            var id = []
                            results2.forEach(i => { id.push(i.id) });
                            log['leadId'] = JSON.stringify(id)
                            await func.addLog(log)
                            res.send({ success: true, data: results2, message: "Leads uploaded successfully" }); 
                        }
                    }catch(e){ func.logError(e); res.status(500); return; }
                })
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/getTeam', asyncMiddleware( async(req, res) => {
    let sql = `SELECT a.id, a.name, a.email, a.status, a.institute, a.role, a.updated_at, b.id as teamId FROM users as a left JOIN team as b on b.userid = a.id WHERE a.institute = '${req.body.id}' AND b.id IS NULL;
    SELECT a.id as teamId, a.schoolId, a.userId, a.changeroles, a.sendemail, a.sendsms, a.sendwhatsapp, a.status as teamStatus, a.updated_at, b.name, b.email, b.role, b.status FROM team as a left JOIN users as b on b.id = a.userId WHERE a.schoolId = '${req.body.id}';`
    pool.query(sql, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ 
                users: results[0],
                team: results[1],
            }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/addToTeam', asyncMiddleware( async(req, res) => {
    let post= {
        'schoolId' :            req.body.schoolId,
        'userId' :              req.body.userId,
        'changeroles' :         req.body.changeroles,
        'sendemail' :           req.body.sendemail,
        'sendsms' :             req.body.sendsms,
        'sendwhatsapp' :        req.body.sendwhatsapp,
        'status':               req.body.status,
        "created_at":           time,
        "updated_at":           time,
    }
    let sql = `INSERT INTO team SET ?`
    pool.query(sql, post, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){ 
                await func.changeUserStatus(req.body.userId, req.body.status )
                const data = await func.getTeamMember(results.insertId )
                res.send({ success: true, data, message: 'Member added to team Succesfully' }); 
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/updateTeam', asyncMiddleware( async(req, res) => {
    let post= {
        'changeroles' :         req.body.changeroles,
        'sendemail' :           req.body.sendemail,
        'sendsms' :             req.body.sendsms,
        'sendwhatsapp' :        req.body.sendwhatsapp,
        'status':               req.body.status,
        "updated_at":           time,
    }
    let sql = `UPDATE team SET ? WHERE id = '${req.body.id}'`; 
    pool.query(sql, post, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){
                await func.updateRole(req.body.userId, req.body.role)
                const data = await func.getTeamMember(req.body.id)
                res.send({ success: true, data, message: 'Team updated successfuly' });
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/getLeadLog/:id', asyncMiddleware( async(req, res) => {
    let sql = `SELECT a.id, a.schoolId, a.type, a.leadId, a.entry, a.loggedby, a.created_at, b.name as loggedByName FROM leadlog as a left join users as b on b.id = a.loggedby WHERE a.leadId = '${req.params.id}' OR JSON_CONTAINS(a.leadId, '${req.params.id}') = 1 ORDER BY a.id DESC;`
    pool.query(sql, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ data: results }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/addCounsellor', asyncMiddleware( async(req, res) => {
    let post= {
        'counsellor':               req.body.counsellorSelected,
        "updated_at":               time,
    }
    let log ={
        "schoolId":                 req.body.schoolId,
        "type":                     req.body.type,
        "leadId":                   req.body.leadId,
        "entry":                    `${req.body.counsellorName} was alloted as counsellor`,
        "loggedby":                 req.body.loggedby,
        "created_at":               time,
        "updated_at":               time,
    }

    let sql = `UPDATE leads SET ? WHERE id IN (${JSON.parse(req.body.id)});`
    pool.query(sql, post, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){
                const data = await func.getUpdatedLeads(req.body.id)
                await func.addLog(log)
                res.send({ success:true, data, message: "Leads updated successfully" }); 
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/changeLeadStatus', asyncMiddleware( async(req, res, next) => {
    let post= {
        "status":                   req.body.status,
        "updated_at":               time,
    }
    if(req.body.status==0){ var status = 'Not Active' }else{ var status = 'Active' }
    let log ={
        "schoolId":                 req.body.schoolId,
        "type":                     req.body.type,
        "leadId":                   req.body.id,
        "entry":                    `Status changed to ${status}`,
        "loggedby":                 req.body.loggedby,
        "created_at":               time,
        "updated_at":               time,
    }
    let sql = `UPDATE leads SET ? WHERE id = ${req.body.id}`
    pool.query(sql, post, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){ 
                const data = await func.getLead(req.body.id)
                await func.addLog(log)
                res.send({ success: true, data, message: 'Lead status changed successfully' });
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/feeStructure', asyncMiddleware( async(req, res) => {
    let sql = `SELECT id, schoolId, name, classes, period, amount, status, updated_at FROM fees;
                SELECT id, name from schoolbasics WHERE type = 'Class' AND schoolId = '${req.body.schoolId}'`
    pool.query(sql, [1,2], async(err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ fees: results[0], classes: results[1] }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/addFeeStructure', asyncMiddleware( async(req, res) => {
    let post= {
        'schoolId' :            req.body.schoolId,
        'name' :                req.body.name,
        'classes' :             req.body.classes,
        'period' :              req.body.period,
        'amount' :              req.body.amount,
        'status' :              req.body.status,
        "created_at":           time,
        "updated_at":           time,
    }
    let sql = `INSERT INTO fees SET ?`
    pool.query(sql, post, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){ 
                const data = await func.getFeeStructure(results.insertId)
                res.send({ success: true, data, message: "Fees Added succesfully" }); 
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/changeFeeStatus', asyncMiddleware( async(req, res, next) => {
    let post= {
        "status":                   req.body.status,
        "updated_at":               time,
    }
    let sql = `UPDATE fees SET ? WHERE id = ${req.body.id}`
    pool.query(sql, post, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){
                const data = await func.getFeeStructure(req.body.id)
                res.send({ success: true, data, message: 'Fee status changed successfully' });
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/updateFeeStructure', asyncMiddleware( async(req, res) => {
    let post= {
        'name' :                req.body.name,
        'classes' :             req.body.classes,
        'period' :              req.body.period,
        'amount' :              req.body.amount,
        'status' :              req.body.status,
        "updated_at":           time,
    }
    let sql = `UPDATE fees SET ? WHERE id = '${req.body.id}'`; 
    pool.query(sql, post, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){
                const data = await func.getFeeStructure(req.body.id)
                res.send({ success: true, data, message: 'Fees updated successfuly' });
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/classSelInFees', asyncMiddleware( async(req, res) => {
    let sql = `SELECT id, name, tab1 FROM schoolbasics WHERE schoolId='${req.body.schoolId}' AND type='Student' AND tab1='${req.body.classes}';`
    pool.query(sql, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){ 
                res.send({ data: results }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/feeManagement', asyncMiddleware( async(req, res) => {
    let sql = `SELECT id, name from schoolbasics WHERE type = 'Class' AND schoolId = '${req.body.schoolId}';
                SELECT id, name, classes, period, amount from fees WHERE status= 1 AND schoolId = '${req.body.schoolId}';
                SELECT a.id, a.schoolID, a.student, a.classes, a.mode, a.fees, a.feeAmount as feeCollected, a.remarks, a.updated_at, b.name as studentName, b.tab1, c.name as className, d.name as feeName, d.period, d.amount as feeAmount from feerecords as a 
                left join schoolbasics as b on b.id = a.student left join schoolbasics as c on c.id = a.classes left join fees as d on d.id = a.fees
                WHERE a.schoolId = '${req.body.schoolId}';
                `
    pool.query(sql, [1,2], async(err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ classes: results[0], fees: results[1], feeRecords: results[2] }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/addFees', asyncMiddleware( async(req, res) => {
    let post= {
        'schoolId' :            req.body.schoolId,
        'student' :             req.body.student,
        'classes' :             req.body.classes,
        'fees' :                req.body.fees,
        'feeAmount' :           req.body.feeAmount,
        'remarks' :             req.body.remarks,
        'mode' :                req.body.mode,
        "created_at":           time,
        "updated_at":           time
    }
    let sql = `INSERT INTO feerecords SET ?`
    pool.query(sql, post, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){
                const data = await func.getFeeDetails(results.insertId )
                res.send({ success: true, data, message: 'Fee added Succesfully' });
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/feeRegister', asyncMiddleware( async(req, res) => {
    let post= {
        'schoolId' :            req.body.schoolId,
        'studentId' :           req.body.student,
        'classes' :             req.body.classes,
        'year' :                req.body.year,
        "created_at":           time,
        "updated_at":           time,
    }
    for (let index = 0; index < JSON.parse(req.body.fees).length; index++) {
        let query = {
            schoolId :          req.body.schoolId,
            studentId :         req.body.student,
            classes :           req.body.classes,
            year :              req.body.year,
            type :              JSON.parse(req.body.fees)[index][1]
        }
        let results = await func.checkFeeRecord(query)
        if(results){
            if(results.id){
                let post2= {
                    'period' :            JSON.stringify( JSON.parse(results.period).concat(JSON.parse(req.body.fees)[index][3])),
                    'amount' :            results.amount + JSON.parse(req.body.fees)[index][2],
                    "updated_at":         time,
                }
                let sql2 = `UPDATE feeregister SET ? WHERE id = '${results.id}'`; 
                await pool.query(sql2, post2);
            }else{
                post['period'] = JSON.stringify(JSON.parse(req.body.fees)[index][3])
                post['type'] = JSON.parse(req.body.fees)[index][1]
                post['amount'] = JSON.stringify(JSON.parse(req.body.fees)[index][2])
                await func.insertFeeRecord(post)
            }
        }
    };
}))

router.post('/updateFeeRemarks', asyncMiddleware( async(req, res) => {
    let post= {
        'remarks' :             req.body.remarks,
        "updated_at":           time,
    }
    let sql = `UPDATE feerecords SET ? WHERE id = '${req.body.id}'`; 
    pool.query(sql, post, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){
                const data = await func.getFeeDetails(req.body.id)
                res.send({ success: true, data, message: 'Fee Record updated successfuly' });
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/filterFeeRecords', asyncMiddleware( async(req, res) => {
    let sql = `SELECT a.id, a.schoolID, a.student, a.classes, a.mode a.fees, a.feeAmount as feeCollected, a.remarks, a.updated_at, b.name as studentName, b.tab1, c.name as className, d.name as feeName, d.period, d.amount as feeAmount from feerecords as a 
                left join schoolbasics as b on b.id = a.student left join schoolbasics as c on c.id = a.classes left join fees as d on d.id = a.fees
                WHERE a.schoolId = '${req.body.schoolId}' AND b.name LIKE '%${req.body.filterBy}%';`
    pool.query(sql, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ data: results }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/pendingFee', asyncMiddleware( async(req, res) => {
    let sql = `SELECT a.id as studentId, a.schoolId, a.name, a.tab1, b.name as className, c.fees, c.mode, c.feeAmount, c.remarks, c.updated_at from schoolbasics as a left join schoolbasics as b on b.id = a.tab1
                left join feerecords as c on c.student = a.id WHERE a.schoolId = '${req.body.schoolId}' AND a.type = 'Student';
                SELECT id, name, classes, period, amount from fees WHERE status= 1 AND schoolId = '${req.body.schoolId}';`
    pool.query(sql, [1,2], async(err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ pendingFee: results[0], feeRecords: results[1] }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

module.exports = router;