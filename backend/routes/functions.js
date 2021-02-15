var mysql = require('mysql')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
var pool = require('./mysqlConnector')
const time = new Date().toISOString().slice(0, 19).replace('T', ' ')
const transporter = nodemailer.createTransport({ host: "smtpout.secureserver.net", port: 465, secure: true, auth: { user: 'contactus@thetrueloans.com', pass: 'contactus@123',  debug: true }, tls:{ rejectUnauthorized: false, secureProtocol: "TLSv1_method" } });
const fs = require('fs')

// const storage = '/var/www/amitkk.com/public_html/public/images/'
const storage = './public/images/'

function getInstitute(id) {
    return new Promise((resolve, reject) => {
        let sql =   `SELECT id, name, email, status, updated_at from users WHERE id = '${id}'`
        pool.query(sql, (err, results) => {
            try{
                if(err){ throw err }
                if(results){ resolve(results[0] ) }
            }catch(e){ logError(e); return; }
        });
    });
}

function getQuestion(id) {
    return new Promise((resolve, reject) => {
        let sql =   `SELECT id, board, classes, subject, topic, subtopic, question, options, answer, difficulty, type, marks, source, status, owner, updated_at from questionBank WHERE id = '${id}';`
        pool.query(sql, (err, results) => {
            try{
                if(err){ throw err }
                if(results){ resolve(results[0] ) }
            }catch(e){ logError(e);return; }
        });
    });
}

function printError(mesg){ console.log('mesg', mesg) }

function blogMetaData(id) {
    return new Promise((resolve, reject) => {
        let sql =   `SELECT title, url FROM blogs ORDER BY id DESC;
                    SELECT name, url FROM blog_metas WHERE type = 'category';
                    SELECT name, url FROM blog_metas WHERE type = 'tag';
                    SELECT id, blogId, c_order, commentId, user, email, comment, updated_at FROM comments WHERE blogId = '${id}' AND status='1' AND c_order= '0' ORDER BY id DESC;
                    SELECT id, blogId, c_order, commentId, user, email, comment, updated_at FROM comments WHERE blogId = '${id}' AND status='1' AND c_order= '1' ORDER BY id ASC`
        pool.query(sql, [1, 2, 3, 4, 5], (err, results) => {
            try{
                if(err){ throw err }
                if(results){ resolve(results ) }
            }catch(e){ logError(e); return; }
        });
    });
}

function suggestBlogs() {
    return new Promise((resolve, reject) => {
        let sql = `SELECT a.id, a.title, a.url, a.coverImg, a.content, a.updated_at, b.image FROM blogs as a left join media as b on b.id = a.coverImg ORDER by RAND() LIMIT 6;`
      pool.query(sql, (err, rows) => {
        try{
            if(err){ throw err }
            if(rows){ resolve(rows ) }
        }catch(e){ logError(e); return; }
      });
    });
}

function uploadImage(file, folder){
    return new Promise((resolve, reject) => {
        // var filename = file.name
        var filename = Date.now() + '-' + file.name;
        file.mv(storage+folder+'/'+filename, function(err){ if(err){ logError(err) } })
        let post= {
            'image' :                       filename,
            'fileURL' :                     storage+folder+'/'+filename,
            "created_at":                   time,
            "updated_at":                   time,
        }
        let sql = `INSERT INTO media SET ?`
        pool.query(sql, post, (err, results) => {
            try{
                if(err){ throw err }
                if(results){ resolve( results.insertId ) }
            }catch(e){ logError(e); return; }
        })
    });
}

function uploadDeleteImage(file, folder, id, image){
    return new Promise((resolve, reject) => {
        // var filename = file.name
        var filename = Date.now() + '-' + file.name;
        file.mv(storage+folder+'/'+filename, function(err){ if(err){ logError(err) } })
        let post= {
            'image' :                       filename,
            'fileURL' :                     storage+folder+'/'+filename,
            "updated_at":                   time,
        }
        let sql = `UPDATE media SET ? WHERE id = ${id}`;
        pool.query(sql, post, (err, results) => {
            try{
                if(err){ throw err }
                if(results){ 
                    if (fs.existsSync(storage+folder+'/'+image)) { fs.unlinkSync(storage+folder+'/'+image) }
                    resolve( true )
                }
            }catch(e){ logError(e); return; }
        })
    });
}

function blogMetaName(type, data) {
    var list = []
    return new Promise((resolve, reject) => {
        if(data.length>0){
            for(var i = 0; i < data.length; i++){
                let sql = `SELECT name, id, url FROM blog_metas WHERE type = '${type}' AND id = '${data[i]}';`
                pool.query(sql, (err, results) => {
                    try{ 
                        if(err) throw err;
                        list.push(results[0])
                        if(i == data.length){ resolve(list) }
                    }catch(e){ logError(e); return; }
                });
            }
        }else{
            resolve(list)
        }
    });
}

function sendMailOnError(e) {
    const mailBody =`
        <h2><strong>Hi</h2>
        <p>There has been error in India Enigma. Please check if website is running or not.</p>
        <p>Then check the log</p>
        ${e}<br/>
        // ${func}
        <p>Warm Regards</p>
        <p>Team AmitKK</p>
    `
    let mailOptions = { to: 'amit.khare588@gmail.com', from: 'amit@amitkk.com', subject: "Error on ✔ www.indiaenigma.com", html: mailBody }
    transporter.sendMail( mailOptions, (error, info)=>{
        res.send({ success: true, message: "Please check your mail" })
    })
}
  
function logError(e){
    // sendMailOnError(e)
    printError(e)
}

module.exports = { printError, logError, storage, uploadImage, uploadDeleteImage, blogMetaName, blogMetaData, suggestBlogs, getInstitute, getQuestion };