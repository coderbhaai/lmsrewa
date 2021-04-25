const express = require('express')
const router = express.Router();
var pool = require('./mysqlConnector')
const asyncMiddleware = require('./asyncMiddleware')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const nodemailer = require("nodemailer");
const func = require('./functions')

var bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())
// var cookieParser = require('cookie-parser')
// router.use(cookieParser())

const time = new Date().toISOString().slice(0, 19).replace('T', ' ')

const transporter = nodemailer.createTransport({ host: "smtpout.secureserver.net", port: 465, secure: true, auth: { user: 'contactus@thetrueloans.com', pass: 'contactus@123',  debug: true }, tls:{ rejectUnauthorized: false, secureProtocol: "TLSv1_method" } });

router.post('/register', asyncMiddleware( async(req, res, next) => {
    if(req.body.password !== req.body.confirm_password ){
        res.send({ success: false, message: "Passwords Mismtach" })
    }else {
        let sql = `SELECT id FROM users WHERE email='${req.body.email}'`
        pool.query(sql, (err, results) => {
            try{
                if(err){ throw err }
                if(results){
                    if(results[0]){
                        res.send({ success: false, message: "Email already registered" }) 
                    } else {
                        let post= {
                            'name':                       req.body.name, 
                            'email':                      req.body.email,
                            'role':                       req.body.role,
                            'status':                     req.body.status,
                            'institute':                  req.body.institute,
                            "created_at":                 time,
                            "updated_at":                 time,
                        }
                        const user={
                            name:                       req.body.name, 
                            email:                      req.body.email,
                            role:                       req.body.role,
                        }
                        jwt.sign({ user }, 'secretkey', (err, token)=>{
                            if(token){
                                post.token  = token
                                bcrypt.genSalt(10, (err2, salt)=>{
                                    if(err2) throw err2;
                                    bcrypt.hash(req.body.password, salt, (err3, hash)=>{
                                        try{
                                            if(err3) throw err3;
                                            post.password = hash
                                            let sql2 = `INSERT INTO users SET ?`
                                            pool.query(sql2, post, (err4, results2) => {
                                                try{
                                                    if(err4){ throw err4 }
                                                    if(results2){ res.send({ success: true, user: user, message: 'Registration successful !!!' }) }
                                                }catch(e){ func.logError(e); res.status(500); return; }
                                            })
                                        }catch(e){ func.logError(e); res.status(500); return; }
                                    })
                                })
                            }
                        })
                    }
                }
            }catch(e){ func.logError(e); res.status(500); return; }
        })
    }
}))

router.post('/login', asyncMiddleware( async(req, res, next) => {
    let sql = `SELECT id, name, email, role, password, status, institute from users WHERE email = '${req.body.email}'`
    pool.query(sql, async(err, results) => {
        try{
            if(err){ throw err }
            if(results && results.length){
                if(results[0]){                    
                    if(results[0].status !== 1){
                        res.send({ success: false, message: "You have not been approved yet" })
                    }else 
                    if(results[0].institute){
                        var balance = await func.getBalance(results[0].institute)
                        const check = await checkStatusOfInstitute(results[0].institute)
                        if(check){
                            const login = await initiateLogin(req.body.email, req.body.password)
                            if(login[0]){
                                res.cookie('token', login[1].token)
                                res.send({ success: true, user: login[1], balance, message: login[2] }) 
                            }else{
                                res.send({ success: false, message: login[2] })
                            }
                        }else{
                            res.send({ success: false, message: "Your Organisation has not been approved yet" })
                        }
                    }else{
                        const login = await initiateLogin(req.body.email, req.body.password)
                        var balance = await func.getBalance(results[0].id)
                        if(login[0]){
                            res.cookie('token', login[1].token)
                            res.send({ success: true, user: login[1], balance, message: login[2] }) 
                        }else{
                            res.send({ success: false, message: login[2] })
                        }
                    }
                }
            }else{ resolve([false, {}, "No Account by this name"]) }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))


function checkStatusOfInstitute(id){
    return new Promise((resolve, reject) => {
        let sql = `SELECT status from users WHERE id = '${id}'`
        pool.query(sql, async(err, results) => {
            try{
                if(err){ throw err }
                if(results && results.length){
                    if(results[0].status ==1){ resolve(true) }else{resolve(false)}
                }else{ resolve([false, {}, "No Account by this name"]) }
            }catch(e){ func.logError(e); res.status(500); return; }
        })
    });
}

function initiateLogin(email, password){
    return new Promise((resolve, reject) => {
        let sql = `SELECT id, name, email, role, password, status, institute from users WHERE email = '${email}'`
        pool.query(sql, async(err, results) => {
            try{
                if(err){ throw err }
                if(results && results.length){
                    if(results[0]){
                        bcrypt.compare(password, results[0].password)
                        .then(isMatch=>{
                            if(isMatch){
                                const user={ id: results[0].id, name: results[0].name, email: results[0].email, role: results[0].role, institute: results[0].institute }
                                jwt.sign({ user }, 'secretkey', (err, token)=>{
                                    if(err) throw err;
                                    user.token = token
                                    user.auth = true
                                    let sql2 = `UPDATE users SET token = '${token}', updated_at = '${time}' WHERE id = '${results[0].id}'`
                                    pool.query(sql2, (err2, results2) => {
                                        try{
                                            if(err2){ throw err2 }
                                            if(results2){ resolve([true, user, "Welcome to Study Spectrum"]) }
                                        }catch(e){ func.logError(e); res.status(500); return; }
                                    })
                                })
                            }else{ resolve([false, {}, "Password is Incorrect"]) }
                        })
                    }
                }else{ resolve([false, {}, "No Account by this name"]) }
            }catch(e){ func.logError(e); res.status(500); return; }
        })
    });
}

router.post('/forgotPassword', asyncMiddleware( async(req, res, next) => {
    let sql =   `SELECT id, name FROM users WHERE email='${req.body.email}';
                SELECT token FROM password_resets WHERE email='${req.body.email}'`
    pool.query(sql, [1,2], (err, results) => {
        try{
            if(!results[0][0]){ 
                res.send({ success: false, message: "No Account by this name" }) 
            } else{
                let post= {
                    "created_at":                   time,
                    "token":                        Math.random().toString(36).substr(2) +  Math.random().toString(36).substr(2)
                }
                var name = results[0][0].name
                if(results[1][0]){
                    var sql2 = `UPDATE password_resets SET ? WHERE email = '${req.body.email}'`;
                }else{
                    post.email = req.body.email
                    var sql2 = `INSERT INTO password_resets SET ?`
                }
                pool.query(sql2, post, (err2, results2) => {
                    try{
                        if(results2){ 
                            const mailBody =`
                                <h2><strong>Dear ${name}</strong></h2>
                                <p>You requested for a password reset. Please click on the below link to reset the password.</p>
                                <a href="http://localhost:3000/reset-password/${post.token}"><button>Reset Pasword</button></a>
            
                                <p>Connect with us if you have not requested this.</p><br/>
                                <p>Warm Regards</p>
                                <p>Team Reward Eagle</p>
                            `
                            let mailOptions = { to: req.body.email, from: '"ContactUs"<contactus@rewardeagle.com>', cc: `amit.khare588@gmail.com`, subject: "Password reset request ✔ www.rewardeagle.com", html: mailBody }
                            transporter.sendMail( mailOptions, (error, info)=>{
                                res.send({ success: true, message: "Please check your mail" })
                            })
                        }else if(err2){ throw err2 }
                    }catch(e){ func.logError(e); res.status(500); return; }
                })
            }
            if(err){ throw err }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/resetPassword', asyncMiddleware( async(req, res, next) => {
    let sql =   `SELECT id, name, role FROM users WHERE email='${req.body.email}';
                SELECT token FROM password_resets WHERE email='${req.body.email}' AND token='${req.body.token}'`
    pool.query(sql, [1,2], (err, results) => {
        try{
            if(err){ throw err }
            if(results){
                if(!results[0][0]){ 
                    res.send({ success: false, message: "No Account by this name" }) 
                }else if(req.body.password !== req.body.confirm_password){
                    res.send({ success: false, message: "Passwords Mismatch" }) 
                }else if(!results[1][0]){
                    res.send({ success: false, message: "You did not ask for password reset" }) 
                }else{
                    let post= {
                        "updated_at":                 time,
                    }
                    const user={
                        name:                       results[0][0].name, 
                        email:                      req.body.email,
                        role:                       results[0][0].role,
                    }
                    jwt.sign({ user }, 'secretkey', (err, token)=>{
                        if(token){
                            post.token  = token
                            bcrypt.genSalt(10, (err, salt)=>{
                                if(err) throw err;
                                bcrypt.hash(req.body.password, salt, (err, hash)=>{
                                    if(err) throw err;
                                    post.password = hash
                                    var sql2 = `UPDATE users SET ? WHERE email = '${req.body.email}'`;
                                    pool.query(sql2, post, (err2, results2) => {
                                        try{
                                            if(err2){ throw err2 }
                                            if(results2){
                                                let sql3 = `DELETE FROM password_resets WHERE email='${req.body.email}' AND token='${req.body.token}'`
                                                pool.query(sql3, (err3, results3) => {
                                                    try{
                                                        if(err3){ throw err3 }
                                                        if(results3){ res.send({ success: true, message: 'Password reset, Please login!!!' }) }
                                                    }catch(e){ func.logError(e); res.status(500); return; }
                                                })
                                            }
                                        }catch(e){ func.logError(e); res.status(500); return; }
                                    })
                                })
                            })
                        }
                    })
                }
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/logout', asyncMiddleware( async(req, res, next) => {
    res.clearCookie('token')
    let sql = `SELECT id, email, token from users WHERE id = '${req.body.id}';`
    pool.query(sql, async(err, results) => {
        try{
            if(err){ throw err }
            var sql2 = `UPDATE users SET token = Null, updated_at = '${time}' WHERE id = '${results[0].id}';`
            pool.query(sql2, (err2, results2) => {
                try{
                    if(err2){ throw err2 }
                    if(results2){ res.send({ success: true, message: "You are logged Out" }) }
                }catch(e){ func.logError(e); res.status(500); return; }
            })
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))
module.exports = router;