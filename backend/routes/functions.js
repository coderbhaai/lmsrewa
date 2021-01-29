var mysql = require('mysql')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
var pool = require('./mysqlConnector')
const time = new Date().toISOString().slice(0, 19).replace('T', ' ')
const transporter = nodemailer.createTransport({ host: "smtpout.secureserver.net", port: 465, secure: true, auth: { user: 'contactus@thetrueloans.com', pass: 'contactus@123',  debug: true }, tls:{ rejectUnauthorized: false, secureProtocol: "TLSv1_method" } });
const fs = require('fs')

const storage = './public/images/'
// const storage = '/var/www/amitkk.com/public_html/public/images/'
  
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
    

    console.log('e', e)
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
    console.log('e', e)
}

module.exports = { logError, storage, uploadImage, uploadDeleteImage, blogMetaName };