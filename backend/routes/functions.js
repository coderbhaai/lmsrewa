var mysql = require('mysql')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
var pool = require('./mysqlConnector')
const time = new Date().toISOString().slice(0, 19).replace('T', ' ')
const transporter = nodemailer.createTransport({ host: "smtpout.secureserver.net", port: 465, secure: true, auth: { user: 'contactus@thetrueloans.com', pass: 'contactus@123',  debug: true }, tls:{ rejectUnauthorized: false, secureProtocol: "TLSv1_method" } });
const fs = require('fs')

const storage = './public/images/'

function printError(mesg){ console.log('mesg', mesg) }

function getBalance(id) {
    return new Promise((resolve, reject) => {
        let sql =   `SELECT balance from wallets WHERE userId = '${id}';`
        pool.query(sql, (err, results) => {
            try{
                if(err){ throw err }
                if(results[0]){ resolve(results[0].balance ) }else{ resolve(0)}
            }catch(e){ logError(e);return; }
        });
    });
}

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
        let sql =   `SELECT a.id, a.board, a.classes, a.subject, a.topic, a.subtopic, a.question, a.options, a.answer, a.difficulty, a.type, a.marks, a.source, a.status, a.owner, a.updated_at, b.name as className, c.name as subjectName, d.name as topicName, e.name as subTopicName, f.name as difficultyName, g.name as typeName from questionBank as a
                    left join basics as b on b.id = a.classes left join basics as c on c.id = a.subject left join basics as d on d.id = a.topic left join basics as e on e.id = a.subtopic left join basics as f on f.id = a.difficulty left join basics as g on g.id = a.type WHERE a.id = '${id}';`
        pool.query(sql, (err, results) => {
            try{
                if(err){ throw err }
                if(results){ resolve(results[0] ) }
            }catch(e){ logError(e);return; }
        });
    });
}

function getQuestions(data) {
    return new Promise((resolve, reject) => {
        let sql =   `SELECT a.id, a.type, a.question, a.options, a.answer, a.marks, b.name as typeName from questionbank as a left join basics as b on b.id = a.type where a.id IN (${data}) ;`
        pool.query(sql, (err, results) => {
            try{
                if(err){ throw err }
                if(results){ resolve(results ) }
            }catch(e){ logError(e);return; }
        });
    });

}

function createTest(data) {
    return new Promise((resolve, reject) => {
        let sql =   `SELECT id, answer, marks from questionBank WHERE JSON_CONTAINS(board, '${data[0]}') = 1
         AND classes = '${data[1]}' AND subject='${data[2]}' AND topic IN (${data[3]}) AND subTopic IN (${data[4]}) AND difficulty = '${data[5]}' AND type='${data[6]}'
          ORDER by RAND() LIMIT ${data[7]} ;`
        pool.query(sql, (err, results) => {
            try{
                if(err){ throw err }
                var questions = []
                var solution = []
                var marks = []
                var total = 0
                results.forEach(i => {
                    questions.push(i.id)
                    solution.push(i.answer)
                    marks.push(i.marks)
                    total = total + i.marks
                });
                if(results){ resolve([questions, solution, marks, total] ) }
            }catch(e){ logError(e);return; }
        });
    });
}

function calculateScore(solution, answer, marks) {
    console.log('solution', solution)
    console.log('answer', answer)
    console.log('marks', marks)
    return new Promise((resolve, reject) => {
        var score = 0
        solution.forEach((i,index) => {
            if(i==answer[index]){ 
                score = score + marks[index]
                console.log("right Answer", index+1 )
            }else{
                console.log('wrong answer', index+1)
            }
            console.log('score', score)
        });
        resolve(score)
    })
}


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

module.exports = { getBalance, printError, logError, storage, uploadImage, uploadDeleteImage, blogMetaName, blogMetaData, suggestBlogs, getInstitute, getQuestion, createTest, getQuestions, calculateScore };