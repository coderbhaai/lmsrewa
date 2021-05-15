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

router.get('/schoolOptions', asyncMiddleware( async(req, res) => {
    let sql = `SELECT id as value, name as text from institutes WHERE status=1;`
    pool.query(sql, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ data: results }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/adminBasics', asyncMiddleware( async(req, res) => {
    let sql = `SELECT a.id, a.type, a.name, a.tab1, a.tab2, a.tab3, a.updated_at, b.name as tab1Name, c.name as tab2Name, d.name as tab3Name FROM basics as a 
    left join basics as b on b.id = a.tab1 left join basics as c on c.id = a.tab2 left join basics as d on d.id = a.tab3;`
    pool.query(sql, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ data: results }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/addBasic', asyncMiddleware( async(req, res) => {
    let post= {
        'type':                 req.body.type,
        'name':                 req.body.name,
        'tab1':                 req.body.tab1,
        'tab2':                 req.body.tab2,
        'tab3':                 req.body.tab3,
        "created_at":           time,
        "updated_at":           time,
    }
    let sql = `INSERT INTO basics SET ?`
    pool.query(sql, post, (err, results) => {
        try{
            if(err){ throw err }
            if(results){
                let sql = `SELECT a.id, a.type, a.name, a.tab1, a.tab2, a.tab3, a.updated_at, b.name as tab1Name, c.name as tab2Name, d.name as tab3Name FROM basics as a 
                            left join basics as b on b.id = a.tab1 left join basics as c on c.id = a.tab2 left join basics as d on d.id = a.tab3 ORDER BY a.id DESC LIMIT 1;`
                pool.query(sql, (err2, results2) => {
                    try{
                        if(err2){ throw err2 }
                        if(results2){
                            res.send({ success: true, data: results2[0], message: 'Basic added successfuly' });
                        }
                    }catch(e){ func.logError(e); res.status(500); return; }
                })
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/updateBasic', asyncMiddleware( async(req, res) => {
    let post= {
        'type':                 req.body.type,
        'name':                 req.body.name,
        'tab1':                 req.body.tab1,
        'tab2':                 req.body.tab2,
        'tab3':                 req.body.tab3,
        "updated_at":           time,
    }
    let sql = `UPDATE basics SET ? WHERE id = '${req.body.id}'`;
    pool.query(sql, post, (err, results) => {
        try{
            if(err){ throw err }
            if(results){
                let sql = `SELECT a.id, a.type, a.name, a.tab1, a.tab2, a.tab3, a.updated_at, b.name as tab1Name, c.name as tab2Name, d.name as tab3Name FROM basics as a 
                            left join basics as b on b.id = a.tab1 left join basics as c on c.id = a.tab2 left join basics as d on d.id = a.tab3 WHERE a.id = ${req.body.id};`
                pool.query(sql, (err2, results2) => {
                    try{
                        if(err2){ throw err2 }
                        if(results2){
                            res.send({ success: true, data: results2[0], message: 'Basic updated successfuly' })
                        }
                    }catch(e){ func.logError(e); res.status(500); return; }
                })
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/adminBlogMeta', asyncMiddleware( async(req, res) => {
    let sql = `SELECT id, type, name, url FROM blog_metas ORDER BY id DESC`
    pool.query(sql, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ data: results }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/addBlogMeta', asyncMiddleware( async(req, res) => {
    let post= {
        "type":                 req.body.type,
        "name":                 req.body.name,
        "url":                  req.body.url,
        "created_at":           time,
        "updated_at":           time,
    }
    // if(req.body.type === 'page'){
    //     if(req.files.cover){
    //         var file = req.files.cover
    //         var filename = file.name
    //         file.mv(storage+'cover/'+filename, function(err){ if(err){ func.printError(err) } })
    //         post.name = filename
    //     }
    // }else{
    //     post.name = req.body.name
    // }    
    let sql = 'INSERT INTO blog_metas SET ?'
    pool.query(sql, post, (err, results) => {
        try{ 
            if(err) throw err;
            if(results){
                let sql = `SELECT id, type, name, url, updated_at FROM blog_metas ORDER BY id DESC LIMIT 1`
                pool.query(sql, (err, results2) => {
                    try{ 
                        if(err) throw err;
                        res.send({ success: true, data: results2[0], message: 'Blog meta added successfuly' });
                    }catch(e){ func.logError(e); res.status(403); return; }
                })
            }
        }catch(e){ func.logError(e); res.status(403); return; }
    })
}))

router.post('/updateBlogMeta', asyncMiddleware( async(req, res) => {
    let post= { 
        "type":                 req.body.type,
        "name":                 req.body.name,
        "url":                  req.body.url,
        "updated_at":           time
    }
    // if(req.body.type === 'page'){
    //     if(req.files.cover){
    //         var file = req.files.cover
    //         var filename = file.name
    //         var oldCover = req.body.oldCover
    //         if(oldCover){
    //             if (fs.existsSync(storage+'cover/'+oldCover)) { fs.unlinkSync(storage+'cover/'+oldCover) }
    //             file.mv(storage+'cover/'+filename, function(err){ if(err){ func.printError(err) } })
    //         }
    //         post.name = filename
    //     }
    // }else{
    //     post.name = req.body.name
    // }
    let sql = `UPDATE blog_metas SET ? WHERE id = ${req.body.id} `;
    pool.query(sql, post, (err, results) => {
        try{ 
            if(err) throw err;
            if(results){
                let sql = `SELECT id, type, name, url, updated_at FROM blog_metas WHERE id = ${req.body.id}`
                pool.query(sql, (err, results2) => {
                    try{ 
                        if(err) throw err;
                        res.send({ success: true, data: results2[0], message: 'Blog meta updated successfuly' })
                    }catch(e){ func.logError(e); res.status(403); return; }
                })
            }
        }catch(e){ func.logError(e); res.status(403); return; }
    })
}))

router.get('/adminBlogs',  asyncMiddleware( async(req, res) => {
    let sql = `SELECT a.id, a.title, a.url, a.coverImg, a.updated_at, b.image FROM blogs as a left join media as b on b.id = a.coverImg ORDER BY id DESC`
    pool.query(sql, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ data: results }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/blogMetaOptions', asyncMiddleware( async(req, res) => {
    let sql =   `SELECT name as text, id as value FROM blog_metas WHERE type = 'category';
                SELECT name as text, id as value FROM blog_metas WHERE type = 'tag';`
    pool.query(sql, [1, 2], (err, results) => {
        try{
            if(results){
                res.send({ 
                    catOptions:             results[0],
                    tagOptions:             results[1]
                });
            }else if(err){ throw err }
        }catch(e){
          func.logError(e)
          res.status(500);
          return;
        }
    });
}))

router.post('/addBlog', asyncMiddleware( async(req, res) => {
    let post= {
        'title':                req.body.title,
        'url':                  req.body.url,
        'content':              req.body.content,
        'category':             req.body.category,
        'tag':                  req.body.tag,
        "created_at":           time,
        "updated_at":           time,
    }
    if(req.files){
        const id = await func.uploadImage(req.files.file, 'blog') 
        post.coverImg = id
    }
    let sql = `INSERT INTO blogs SET ?`
    pool.query(sql, post, (err, results) => {
        try{
            if(err){ throw err }
            if(results){
                let sql2 = `SELECT a.id, a.title, a.url, a.coverImg, a.updated_at, b.image, b.id as mediaId FROM blogs as a left join media as b on b.id = a.coverImg ORDER BY a.id DESC LIMIT 1`
                pool.query(sql2, (err2, results2) => {
                    try{
                        if(err){ throw err2 }
                        res.send({ success: true, message: 'Blog added successfuly', data: results2[0] });
                    }catch(e){ func.logError(e); res.status(500); return; }
                })
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/getBlog/:id', asyncMiddleware( async(req, res) => {
    let sql = `SELECT a.id, a.title, a.url, a.coverImg, a.content, a.category, a.tag, a.updated_at, b.image, b.id as mediaId FROM blogs as a left join media as b on b.id = a.coverImg WHERE a.id = '${req.params.id}'`
    pool.query(sql, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){
                const catList = await func.blogMetaName('category', JSON.parse(results[0].category))
                const tagList = await func.blogMetaName('tag', JSON.parse(results[0].tag))
                res.send({ success: true, data: results[0], catList, tagList });
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/updateBlog', asyncMiddleware( async(req, res) => {
    let post= {
        'title':                req.body.title,
        'url':                  req.body.url,
        'content':              req.body.content,
        'category':             req.body.category,
        'tag':                  req.body.tag,
        "updated_at":           time,
    }
    if(req.files){
        await func.uploadDeleteImage(req.files.file, 'blog', req.body.mediaId, req.body.oldImage)
    }
    let sql = `UPDATE blogs SET ? WHERE id = ${req.body.id}`;
    pool.query(sql, post, (err, results) => {
        try{
            if(err){ throw err }
            if(results){
                let sql = `SELECT id, title, url, coverImg, category, tag, content, updated_at FROM blogs WHERE id = ${req.body.id}`
                pool.query(sql, (err2, results2) => {
                    try{
                        if(err2){ throw err2 }
                        if(results2){
                            res.send({ success: true, data: results2[0], message: 'Blog updated successfuly' });
                        }
                    }catch(e){ func.logError(e); res.status(500); return; }
                })
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/adminVideos',  asyncMiddleware( async(req, res) => {
    let sql = `SELECT id, type, url, video_name, video_class, video_sub, status, updated_at FROM videos ORDER BY id DESC`
    pool.query(sql, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ data: results }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/addVideo', asyncMiddleware( async(req, res) => {
    let post= {
        'type':                 req.body.type,
        'video_name':           req.body.name,
        'url':                  req.body.url,
        'video_class':          req.body.video_class,
        'video_sub':            req.body.sub,
        'status':               req.body.status,
        "created_at":           time,
        "updated_at":           time,
    }
    let sql = `INSERT INTO videos SET ?`
    pool.query(sql, post, (err, results) => {
        try{
            if(err){ throw err }
            if(results){
                let sql = `SELECT id, type, url, video_name, video_class, video_sub, status, updated_at FROM videos ORDER BY id DESC LIMIT 1`
                pool.query(sql, (err2, results2) => {
                    try{
                        if(err2){ throw err2 }
                        if(results2){
                            res.send({ success: true, data: results2[0], message: 'Video added successfuly' });
                        }
                    }catch(e){ func.logError(e); res.status(500); return; }
                })
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/updateVideo', asyncMiddleware( async(req, res) => {
    let post= {
        'type':                 req.body.type,
        'video_name':           req.body.name,
        'url':                  req.body.url,
        'video_class':          req.body.video_class,
        'video_sub':            req.body.sub,
        'status':               req.body.status,
        "updated_at":           time,
    }
    let sql = `UPDATE videos SET ? WHERE id = ${req.body.id}`;
    pool.query(sql, post, (err, results) => {
        try{
            if(err){ throw err }
            if(results){
                let sql2 = `SELECT id, type, url, video_name, video_class, video_sub, status, updated_at FROM videos WHERE id = ${req.body.id}`
                pool.query(sql2, (err2, results2) => {
                    try{
                        if(err2){ throw err2 }
                        if(results2){ res.send({ success: true, data: results2[0], message: 'Video updated successfuly' }); }
                    }catch(e){ func.logError(e); res.status(500); return; }
                })
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/adminMetas',  asyncMiddleware( async(req, res) => {
    let sql = `SELECT id, url, title, description, keyword, updated_at FROM metas ORDER BY id DESC`
    pool.query(sql, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ data: results }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/addMeta', asyncMiddleware( async(req, res) => {
    let post= {
        'url':                  req.body.url,
        'title':                req.body.title,
        'description':          req.body.description,
        'keyword':              req.body.keyword,
        "created_at":           time,
        "updated_at":           time,
    }
    let sql = `INSERT INTO metas SET ?`
    pool.query(sql, post, (err, results) => {
        try{
            if(err){ throw err }
            if(results){
                let sql = `SELECT id, url, title, description, keyword, updated_at FROM metas ORDER BY id DESC LIMIT 1`
                pool.query(sql, (err2, results2) => {
                    try{
                        if(err2){ throw err2 }
                        if(results2){
                            res.send({ success: true, data: results2[0], message: 'Meta added successfuly' });
                        }
                    }catch(e){ func.logError(e); res.status(500); return; }
                })
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/updateMeta', asyncMiddleware( async(req, res) => {
    let post= {
        'url':                  req.body.url,
        'title':                req.body.title,
        'description':          req.body.description,
        'keyword':              req.body.keyword,
        "updated_at":           time,
    }
    let sql = `UPDATE metas SET ? WHERE id = ${req.body.id}`;
    pool.query(sql, post, (err, results) => {
        try{
            if(err){ throw err }
            if(results){
                let sql2 = `SELECT id, url, title, description, keyword, updated_at FROM metas WHERE id = ${req.body.id}`
                pool.query(sql2, (err2, results2) => {
                    try{
                        if(err2){ throw err2 }
                        if(results2){ res.send({ success: true, data: results2[0], message: 'Meta updated successfuly' }); }
                    }catch(e){ func.logError(e); res.status(500); return; }
                })
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/videos', asyncMiddleware( async(req, res) => {
    let sql =   `SELECT id, type, url, video_name, video_class, video_sub FROM videos;
                SELECT DISTINCT video_class FROM videos`
    pool.query(sql, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ 
                res.send({ 
                    data:       results[0],
                    classes:    results[1]
                });
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/subjects/:slug', asyncMiddleware( async(req, res) => {
    let sql =   `SELECT DISTINCT video_sub FROM videos WHERE video_class= '${req.params.slug}'`
    pool.query(sql, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ data: results }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/addComment', asyncMiddleware( async(req, res, next) => {
    let post= {
        "user":                     req.body.name,
        "email":                    req.body.email,
        "comment":                  req.body.comment,
        "blogId":                   req.body.blogId,
        "c_order":                  req.body.order,
        "status":                   0,
        "commentId":                req.body.commentId,
        "created_at":               time,
        "updated_at":               time,
    }
    let sql = 'INSERT INTO comments SET ?'
    pool.query(sql, post, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ success: true, message: 'Comment submitted for approval' }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/updateComment', asyncMiddleware( async(req, res) => {
    let post= {
        'user':                 req.body.name,
        'email':                req.body.email,
        'comment':              req.body.comment,
        'status':               req.body.status,
        "updated_at":           time,
    }
    let sql = `UPDATE comments SET ? WHERE id = ${req.body.id}`;
    pool.query(sql, post, (err, results) => {
        try{
            if(results){
                let sql =   `SELECT a.id, a.blogId, a.c_order, a.commentId, a.user, a.email, a.comment, a.status, a.updated_at, b.url, b.title FROM comments as a
                    left join blogs as b on b.id = a.blogId WHERE a.id = ${req.body.id}`
                pool.query(sql, (err2, results2) => {
                    try{
                        if(results2){
                            res.send({ success: true, data: results2[0], message: 'Comment updated successfuly' });
                        }else if(err2){ throw err2 }
                    }catch(e){
                      func.logError(e)
                      res.status(500);
                      return;
                    }
                })
            }else if(err){ throw err }
        }catch(e){
          func.logError(e)
          res.status(500);
          return;
        }
    })
}))

router.get('/adminComments', asyncMiddleware( async(req, res) => {
    let sql =   `SELECT a.id, a.blogId, a.c_order, a.commentId, a.user, a.email, a.comment, a.status, a.updated_at, b.url, b.title FROM comments as a
                left join blogs as b on b.id = a.blogId  ORDER BY a.id DESC`
    pool.query(sql, (err, results) => {
        try{
            if(results){ res.send({ data: results }); }else if(err){ throw err }
        }catch(e){
          func.logError(e)
          res.status(500);
          return;
        }
    })
}))

router.get('/adminInstitutes', asyncMiddleware( async(req, res) => {
    let sql = `SELECT id, type, name, email, phone, status, updated_at from institutes`
    pool.query(sql, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ data: results }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/addInstitute', asyncMiddleware( async(req, res, next) => {
    let post= {
        'type':                     req.body.type,
        'name':                     req.body.name,
        'email':                    req.body.email,
        'phone':                    req.body.phone,
        'status':                   req.body.status,
        "created_at":               time,
        "updated_at":               time,
    }
    let sql = 'INSERT INTO institutes SET ?'
    pool.query(sql, post, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){ 
                const data = await func.getInstitute(results.insertId)
                res.send({ success: true, data, message: 'Institute added successfully' }); 
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/updateInstitute', asyncMiddleware( async(req, res, next) => {
    let post= {
        'type':                     req.body.type,
        'name':                     req.body.name,
        'email':                    req.body.email,
        'phone':                    req.body.phone,
        'status':                   req.body.status,
        "updated_at":               time,
    }
    let sql = `UPDATE institutes SET ? WHERE id = ${req.body.id}`;
    pool.query(sql, post, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){
                const data = await func.getInstitute(req.body.id)
                res.send({ success: true, data, message: 'Institute updated successfully' }); 
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/changeInstituteStatus', asyncMiddleware( async(req, res, next) => {
    let post= {
        "status":                   req.body.status,
        "updated_at":               time,
    }
    let sql = `UPDATE institutes SET ? WHERE id = ${req.body.id}`
    pool.query(sql, post, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){ 
                const data = await func.getInstitute(req.body.id)
                res.send({ success: true, data, message: 'Institute status changed successfully' }); 
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/questionOptions',  asyncMiddleware( async(req, res) => {
    let sql = `SELECT id, type, name, tab1, tab2, tab3 FROM basics as a WHERE type IN ('Class', 'Board', 'Subject', 'Topic', 'SubTopic', 'Difficulty', 'Type');`
    pool.query(sql, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ data: results }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/adminQuestions', asyncMiddleware( async(req, res) => {
    let sql =   `SELECT a.id, a.board, a.classes, a.subject, a.topic, a.subtopic, a.question, a.options, a.answer, a.difficulty, a.type, a.marks, a.source, a.status, a.owner, a.updated_at, b.name as className, c.name as subjectName, d.name as topicName, e.name as subTopicName, f.name as difficultyName, g.name as typeName from questionBank as a
    left join basics as b on b.id = a.classes left join basics as c on c.id = a.subject left join basics as d on d.id = a.topic left join basics as e on e.id = a.subtopic left join basics as f on f.id = a.difficulty left join basics as g on g.id = a.type;`
    pool.query(sql, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ data: results }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/addQuestion', asyncMiddleware( async(req, res, next) => {
    let post= {
        'board':                    req.body.board,
        'classes':                  req.body.classes,
        'subject':                  req.body.subject,
        'topic':                    req.body.topic,
        'subtopic':                 req.body.subtopic,
        'difficulty':               req.body.difficulty,
        'type':                     req.body.type,
        'marks':                    req.body.marks,
        'source':                   req.body.source,
        'status':                   req.body.status,
        'owner':                    1,
        'question':                 req.body.question,
        'options':                  req.body.options,
        'question':                 req.body.question,
        "created_at":               time,
        "updated_at":               time,
    }
    let sql = 'INSERT INTO questionbank SET ?'
    pool.query(sql, post, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){ 
                const data = await func.getQuestion(results.insertId)
                res.send({ success: true, data, message: 'Question added successfully' }); 
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/getQuestion/:id', asyncMiddleware( async(req, res) => {
    let sql =   `SELECT id, board, classes, subject, topic, subtopic, question, options, answer, difficulty, type, marks, source, status, owner from questionBank WHERE id = '${req.params.id}';`
    pool.query(sql, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ data: results[0] }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/updateQuestionFilter/:id', asyncMiddleware( async(req, res) => {
    let sql =   `SELECT classes, subject, topic, subtopic from questionBank WHERE id = '${req.params.id}';`
    pool.query(sql, (err, results) => {
        try{
            if(err){ throw err }
            if(results){
                if(results[0]){
                    let sql2 =   `SELECT id, type, name, tab1, tab2, tab3 from basics WHERE tab1 = '${results[0].classes}';`
                    pool.query(sql2, (err2, results2) => {
                        try{
                            if(err2){ throw err2 }
                            if(results2){ res.send({ success: true, data: results2, quest: results[0] }); }
                        }catch(e){ func.logError(e); res.status(500); return; }
                    })
                }
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/updateQuestion', asyncMiddleware( async(req, res, next) => {
    let post= {
        'board':                    req.body.board,
        'classes':                  req.body.classes,
        'subject':                  req.body.subject,
        'topic':                    req.body.topic,
        'subtopic':                 req.body.subtopic,
        'difficulty':               req.body.difficulty,
        'type':                     req.body.type,
        'marks':                    req.body.marks,
        'source':                   req.body.source,
        'status':                   req.body.status,
        'owner':                    1,
        'question':                 req.body.question,
        'answer':                   req.body.answer,
        'options':                  req.body.options,
        'question':                 req.body.question,
        "created_at":               time,
        "updated_at":               time,
    }
    let sql = `UPDATE questionbank SET ? WHERE id = ${req.body.id}`;
    pool.query(sql, post, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){
                const data = await func.getQuestion(req.body.id)
                res.send({ success: true, data, message: 'Question updated successfully' }); 
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/questionSummary', asyncMiddleware( async(req, res) => {
    let sql =   `SELECT id,	classes, subject, topic, subTopic, difficulty, type, count, updated_at FROM questsummary;`
    pool.query(sql, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ data: results }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/changeQuestionStatus', asyncMiddleware( async(req, res, next) => {
    let post= {
        "status":                   req.body.status,
        "updated_at":               time,
    }
    let sql = `UPDATE questionbank SET ? WHERE id = ${req.body.id}`
    pool.query(sql, post, async(err, results) => {
        try{
            if(err){ throw err }
            if(results){ 
                const data = await func.getQuestion(req.body.id)
                res.send({ success: true, data, message: 'Question status changed successfully' }); 
            }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.get('/onlineTestSeries', asyncMiddleware( async(req, res) => {
    let sql = `SELECT a.id, a.type, a.name, a.tab1, a.tab2, a.tab3, a.updated_at, b.name as tab1Name, c.name as tab2Name, d.name as tab3Name FROM basics as a 
    left join basics as b on b.id = a.tab1 left join basics as c on c.id = a.tab2 left join basics as d on d.id = a.tab3 WHERE a.type IN ('Class', 'Board', 'Subject', 'Topic', 'SubTopic', 'Difficulty', 'Type', 'PaperOptions');`
    pool.query(sql, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ data: results }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))


// Change DB
// router.post('/changeClass', asyncMiddleware( async(req, res, next) => {
//     let sql =   `SELECT id, class from test_papers;`
//     pool.query(sql, (err, results) => {
//         try{
//             if(err){ throw err }
//             if(results){ 
//                 results.forEach((i, index) => {
//                     if(i.class=='XII'){ var code = 19 }
//                     if(i.class=='JEE'){ var code = 20 }
//                     const post ={ 'class': code }
//                     let sql = `UPDATE test_papers SET ? WHERE id = ${i.id}`;
//                     pool.query(sql, post, async(err, results) => {
//                         try{
//                             if(err){ throw err }
//                         }catch(e){ func.logError(e); res.status(500); return; }
//                     })                    
//                 });
//             }
//         }catch(e){ func.logError(e); res.status(500); return; }
//     })    
// }))

// router.post('/changeDifficulty', asyncMiddleware( async(req, res, next) => {
//     let sql =   `SELECT id, difficulty from test_papers;`
//     pool.query(sql, (err, results) => {
//         try{
//             if(err){ throw err }
//             if(results){ 
//                 results.forEach((i, index) => {
//                     if(i.difficulty=='Easy'){ var code = 22 }
//                     if(i.difficulty=='Medium'){ var code = 23 }
//                     if(i.difficulty=='Hard'){ var code = 24 }
//                     const post ={ 'difficulty': code }
//                     let sql = `UPDATE test_papers SET ? WHERE id = ${i.id}`;
//                     pool.query(sql, post, async(err, results) => {
//                         try{
//                             if(err){ throw err }
//                         }catch(e){ func.logError(e); res.status(500); return; }
//                     })                    
//                 });
//             }
//         }catch(e){ func.logError(e); res.status(500); return; }
//     })    
// }))

// router.post('/changeType', asyncMiddleware( async(req, res, next) => {
//     let sql =   `SELECT id, type from test_papers;`
//     pool.query(sql, (err, results) => {
//         try{
//             if(err){ throw err }
//             if(results){ 
//                 results.forEach(i => {
//                     if(i.type=='mcq'){ var code = 25 }
//                     if(i.type=='subjective'){ var code = 26 }
//                     const post ={ 'type': code }
//                     let sql = `UPDATE test_papers SET ? WHERE id = ${i.id}`;
//                     pool.query(sql, post, async(err, results) => {
//                         try{
//                             if(err){ throw err }
//                         }catch(e){ func.logError(e); res.status(500); return; }
//                     })                    
//                 });
//             }
//         }catch(e){ func.logError(e); res.status(500); return; }
//     })    
// }))

// router.post('/changeSubject', asyncMiddleware( async(req, res, next) => {
//     let sql =   `SELECT id, class, subject from test_papers;`
//     pool.query(sql, (err, results) => {
//         try{
//             if(err){ throw err }
//             if(results){ 
//                 results.forEach((i, index) => {
//                     if(i.class==19){ var code = 28 }
//                     if(i.class==20){ var code = 29 }
//                     const post ={ 'subject': code }
//                     let sql = `UPDATE test_papers SET ? WHERE id = ${i.id}`;
//                     pool.query(sql, post, async(err, results) => {
//                         try{
//                             if(err){ throw err }
//                         }catch(e){ func.logError(e); res.status(500); return; }
//                     })                    
//                 });
//             }
//         }catch(e){ func.logError(e); res.status(500); return; }
//     })    
// }))

// router.post('/changeTopic', asyncMiddleware( async(req, res, next) => {
//     let sql =   `SELECT id, class, subject, topic from test_papers`
//     pool.query(sql, (err, results) => {
//         try{
//             if(err){ throw err }
//             if(results){ 
//                 results.forEach((i, index) => {
//                     if(i.class==20 && i.subject==29 && i.topic== 'electrostatics'){ var code=30 }
//                     if(i.class==20 && i.subject==29 && i.topic== 'Current electricity'){ var code=31 }
//                     if(i.class==20 && i.subject==29 && i.topic== 'Moving charges and magnetism'){ var code=32 }
//                     if(i.class==20 && i.subject==29 && i.topic== 'Electromagnetic waves'){ var code=33 }
//                     if(i.class==20 && i.subject==29 && i.topic== 'Modern Physics'){ var code=34 }
//                     if(i.class==20 && i.subject==29 && i.topic== 'The Special Theory of Relativity'){ var code=35 }
//                     if(i.class==20 && i.subject==29 && i.topic== 'mechanics'){ var code=36 }
//                     if(i.class==20 && i.subject==29 && i.topic== 'Electromagnetic Induction'){ var code=37 }
//                     if(i.class==20 && i.subject==29 && i.topic== 'Optics'){ var code=38 }
//                     if(i.class==19 && i.subject==28 && i.topic== 'electrostatics'){ var code=39 }
//                     if(i.class==19 && i.subject==28 && i.topic== 'Current electricity'){ var code=40 }
//                     if(i.class==19 && i.subject==28 && i.topic== 'Moving charges and magnetism'){ var code=41 }
//                     if(i.class==19 && i.subject==28 && i.topic== 'Electromagnetic waves'){ var code=42 }
//                     if(i.class==19 && i.subject==28 && i.topic== 'Modern Physics'){ var code=43 }
//                     if(i.class==19 && i.subject==28 && i.topic== 'The Special Theory of Relativity'){ var code=44 }
//                     if(i.class==19 && i.subject==28 && i.topic== 'mechanics'){ var code=45 }
//                     if(i.class==19 && i.subject==28 && i.topic== 'Electromagnetic Induction'){ var code=46 }
//                     if(i.class==19 && i.subject==28 && i.topic== 'Optics'){ var code=47 }
//                     if(code){
//                         const post ={ 'topic': code }
//                         let sql = `UPDATE test_papers SET ? WHERE id = ${i.id}`;
//                         pool.query(sql, post, async(err, results) => {
//                             try{
//                                 if(err){ throw err }
//                             }catch(e){ func.logError(e); res.status(500); return; }
//                         })
//                     }else{
//                     }
//                 });
//             }
//         }catch(e){ func.logError(e); res.status(500); return; }
//     })    
// }))

// router.post('/changeStatus', asyncMiddleware( async(req, res, next) => {
//     let sql =   `SELECT id, status from test_papers;`
//     pool.query(sql, (err, results) => {
//         try{
//             if(err){ throw err }
//             if(results){ 
//                 results.forEach((i,index) => {
//                     const post ={ 'status': 1 }
//                     let sql = `UPDATE test_papers SET ? WHERE id = ${i.id}`;
//                     pool.query(sql, post, async(err, results) => {
//                         try{
//                             if(err){ throw err }
//                         }catch(e){ func.logError(e); res.status(500); return; }
//                     })                    
//                 });
//             }
//         }catch(e){ func.logError(e); res.status(500); return; }
//     })    
// }))

// router.post('/changeSubTopic', asyncMiddleware( async(req, res, next) => {
//     let sql =   `SELECT id, class, subject, topic, subTopic from test_papers;`
//     pool.query(sql, (err, results) => {
//         try{
//             if(err){ throw err }
//             if(results){ 
//                 results.forEach((i,index) => {
//                     if(i.class==20 && i.subject==29 && i.topic==30 && i.subTopic=="Electric  Field and Potential"){ var code =	48 }
//                     if(i.class==20 && i.subject==29 && i.topic==30 && i.subTopic=="Gauss law"){ var code =	49 }
//                     if(i.class==20 && i.subject==29 && i.topic==30 && i.subTopic=="Capacitor"){ var code =	50 }
//                     if(i.class==20 && i.subject==29 && i.topic==31 && i.subTopic=="Electric Current in Conductors"){ var code =	58 }
//                     if(i.class==20 && i.subject==29 && i.topic==32 && i.subTopic=="Magnetic Field"){ var code =	68 }
//                     if(i.class==20 && i.subject==29 && i.topic==32 && i.subTopic=="Magnetic Field due to a Current"){ var code =	69 }
//                     if(i.class==20 && i.subject==29 && i.topic==31 && i.subTopic=="Alternating Current"){ var code =	59 }
//                     if(i.class==20 && i.subject==29 && i.topic==33 && i.subTopic=="Electromagnetic waves"){ var code =	75 }
//                     if(i.class==20 && i.subject==29 && i.topic==34 && i.subTopic=="Electric Current Through Gases"){ var code =	76 }
//                     if(i.class==20 && i.subject==29 && i.topic==34 && i.subTopic=="Photoelectric Effect and Wave-Particle Duality"){ var code =	77 }
//                     if(i.class==20 && i.subject==29 && i.topic==34 && i.subTopic=="Bhor's Model and Physics of the Atom"){ var code =	78 }
//                     if(i.class==20 && i.subject==29 && i.topic==34 && i.subTopic=="X-Rays"){ var code =	79 }
//                     if(i.class==20 && i.subject==29 && i.topic==34 && i.subTopic=="Semiconductors and Semiconductor Devices"){ var code =	80 }
//                     if(i.class==20 && i.subject==29 && i.topic==34 && i.subTopic=="The Nucleus"){ var code =	81 }
//                     if(i.class==20 && i.subject==29 && i.topic==35 && i.subTopic=="The Special Theory of Relativity"){ var code =	82 }
//                     if(i.class==20 && i.subject==29 && i.topic==36 && i.subTopic=="Rest and Motion: Kinematics"){ var code =	83 }
//                     if(i.class==20 && i.subject==29 && i.topic==36 && i.subTopic=="Laws of motion"){ var code =	84 }
//                     if(i.class==20 && i.subject==29 && i.topic==31 && i.subTopic=="Thermal and Chemical Effects of Electric Current"){ var code =	60 }
//                     if(i.class==20 && i.subject==29 && i.topic==32 && i.subTopic=="Permanent Magnets"){ var code =	70 }
//                     if(i.class==20 && i.subject==29 && i.topic==32 && i.subTopic=="Magnetic Properties of Matter"){ var code =	71 }
//                     if(i.class==20 && i.subject==29 && i.topic==36 && i.subTopic=="FRICTION"){ var code =	85 }
//                     if(i.class==20 && i.subject==29 && i.topic==36 && i.subTopic=="CIRCULAR MOTION"){ var code =	86 }
//                     if(i.class==20 && i.subject==29 && i.topic==38 && i.subTopic=="Light Waves"){ var code =	99 }
//                     if(i.class==20 && i.subject==29 && i.topic==38 && i.subTopic=="Geometrical Optics"){ var code =	100 }
//                     if(i.class==20 && i.subject==29 && i.topic==36 && i.subTopic=="Work and Energy"){ var code =	87 }
//                     if(i.class==20 && i.subject==29 && i.topic==38 && i.subTopic=="Optical Instruments"){ var code =	101 }
//                     if(i.class==20 && i.subject==29 && i.topic==38 && i.subTopic=="Dispersion and Spectra"){ var code =	102 }
//                     if(i.class==20 && i.subject==29 && i.topic==38 && i.subTopic=="Speed of Light"){ var code =	103 }
//                     if(i.class==20 && i.subject==29 && i.topic==38 && i.subTopic=="Photometry"){ var code =	104 }
//                     if(i.class==20 && i.subject==29 && i.topic==36 && i.subTopic=="Center of Mass Linear Momentum, Collision"){ var code =	88 }
//                     if(i.class==20 && i.subject==29 && i.topic==36 && i.subTopic=="ROTATIONAL MECHANICS"){ var code =	89 }
//                     if(i.class==20 && i.subject==29 && i.topic==36 && i.subTopic=="Introduction to Physics"){ var code =	90 }
//                     if(i.class==20 && i.subject==29 && i.topic==36 && i.subTopic=="Gravitation"){ var code =	91 }
//                     if(i.class==20 && i.subject==29 && i.topic==36 && i.subTopic=="Simple Harmonic Motion"){ var code =	92 }
//                     if(i.class==20 && i.subject==29 && i.topic==36 && i.subTopic=="Fluid Mechanics"){ var code =	93 }
//                     if(i.class==20 && i.subject==29 && i.topic==30 && i.subTopic=="Charge and Coulomb’s Law"){ var code =	52 }
//                     if(i.class==20 && i.subject==29 && i.topic==36 && i.subTopic=="Some Mechanical property of Matter"){ var code =	94 }
//                     if(i.class==20 && i.subject==29 && i.topic==30 && i.subTopic=="Electric Dipole"){ var code =	53 }
//                     if(i.class==20 && i.subject==29 && i.topic==30 && i.subTopic=="Grouping of Capacitors"){ var code =	54 }
//                     if(i.class==20 && i.subject==29 && i.topic==30 && i.subTopic=="Critical Thinking Questions"){ var code =	55 }
//                     if(i.class==20 && i.subject==29 && i.topic==30 && i.subTopic=="Graphical Questions"){ var code =	56 }
//                     if(i.class==20 && i.subject==29 && i.topic==30 && i.subTopic=="Assertion & Reason"){ var code =	57 }
//                     if(i.class==20 && i.subject==29 && i.topic==36 && i.subTopic=="Wave Motion Waves on a Strin"){ var code =	95 }
//                     if(i.class==20 && i.subject==29 && i.topic==36 && i.subTopic=="Sound Waves"){ var code =	96 }
//                     if(i.class==20 && i.subject==29 && i.topic==31 && i.subTopic=="Grouping of Resistances"){ var code =	61 }
//                     if(i.class==20 && i.subject==29 && i.topic==31 && i.subTopic=="Kirchhoff's Law, Cells"){ var code =	62 }
//                     if(i.class==20 && i.subject==29 && i.topic==31 && i.subTopic=="Different Measuring Instruments"){ var code =	63 }
//                     if(i.class==20 && i.subject==29 && i.topic==31 && i.subTopic=="Critical Thinking Objective Question"){ var code =	64 }
//                     if(i.class==20 && i.subject==29 && i.topic==31 && i.subTopic=="Thermo - Electricity"){ var code =	67 }
//                     if(i.class==20 && i.subject==29 && i.topic==32 && i.subTopic=="Motion of Charged Particle In Magnetic Field"){ var code =	72 }
//                     if(i.class==20 && i.subject==29 && i.topic==32 && i.subTopic=="Force and Torque on a Current Carrying Conductor"){ var code =	73 }
//                     if(i.class==20 && i.subject==29 && i.topic==32 && i.subTopic=="Critical Thinking"){ var code =	74 }
//                     if(i.class==19 && i.subject==28 && i.topic==39 && i.subTopic=="Electric  Field and Potential"){ var code =	105 }
//                     if(i.class==19 && i.subject==28 && i.topic==39 && i.subTopic=="Gauss law"){ var code =	106 }
//                     if(i.class==19 && i.subject==28 && i.topic==39 && i.subTopic=="Capacitor"){ var code =	107 }
//                     if(i.class==19 && i.subject==28 && i.topic==40 && i.subTopic=="Electric Current in Conductors"){ var code =	108 }
//                     if(i.class==19 && i.subject==28 && i.topic==40 && i.subTopic=="Thermal and Chemical Effects of Electric Current"){ var code =	109 }
//                     if(i.class==19 && i.subject==28 && i.topic==41 && i.subTopic=="Magnetic Field"){ var code =	110 }
//                     if(i.class==19 && i.subject==28 && i.topic==41 && i.subTopic=="Magnetic Field due to a Current"){ var code =	111 }
//                     if(i.class==19 && i.subject==28 && i.topic==41 && i.subTopic=="Permanent Magnets"){ var code =	112 }
//                     if(i.class==19 && i.subject==28 && i.topic==41 && i.subTopic=="Magnetic Properties of Matter"){ var code =	113 }
//                     if(i.class==19 && i.subject==28 && i.topic==46 && i.subTopic=="Electromagnetic Induction"){ var code =	114 }
//                     if(i.class==19 && i.subject==28 && i.topic==40 && i.subTopic=="Alternating Current"){ var code =	115 }
//                     if(i.class==19 && i.subject==28 && i.topic==42 && i.subTopic=="Electromagnetic waves"){ var code =	116 }
//                     if(i.class==19 && i.subject==28 && i.topic==43 && i.subTopic=="Electric Current Through Gases"){ var code =	117 }
//                     if(i.class==19 && i.subject==28 && i.topic==43 && i.subTopic=="Photoelectric Effect and Wave-Particle Duality"){ var code =	118 }
//                     if(i.class==19 && i.subject==28 && i.topic==43 && i.subTopic=="Bhor's Model and Physics of the Atom"){ var code =	119 }
//                     if(i.class==19 && i.subject==28 && i.topic==43 && i.subTopic=="X-Rays"){ var code =	120 }
//                     if(i.class==19 && i.subject==28 && i.topic==43 && i.subTopic=="Semiconductors and Semiconductor Devices"){ var code =	121 }
//                     if(i.class==19 && i.subject==28 && i.topic==43 && i.subTopic=="The Nucleus"){ var code =	122 }
//                     if(i.class==19 && i.subject==28 && i.topic==44 && i.subTopic=="The Special Theory of Relativity"){ var code =	123 }
//                     if(i.class==19 && i.subject==28 && i.topic==47 && i.subTopic=="Light Waves"){ var code =	124 }
//                     if(i.class==19 && i.subject==28 && i.topic==47 && i.subTopic=="Geometrical Optics"){ var code =	125 }
//                     if(i.class==19 && i.subject==28 && i.topic==47 && i.subTopic=="Optical Instruments"){ var code =	126 }
//                     if(i.class==19 && i.subject==28 && i.topic==47 && i.subTopic=="Dispersion and Spectra"){ var code =	127 }
//                     if(i.class==19 && i.subject==28 && i.topic==47 && i.subTopic=="Speed of Light"){ var code =	128 }
//                     if(i.class==19 && i.subject==28 && i.topic==47 && i.subTopic=="Photometry"){ var code =	129 }
//                     if(code){
//                         const post ={ 'subTopic': code }
//                         let sql = `UPDATE test_papers SET ? WHERE id = ${i.id}`;
//                         pool.query(sql, post, async(err, results) => {
//                             try{
//                                 if(err){ throw err }
//                             }catch(e){ func.logError(e); res.status(500); return; }
//                         })
//                     }else{
//                     }
//                 });
//             }
//         }catch(e){ func.logError(e); res.status(500); return; }
//     })    
// }))


// router.post('/changeSubTopic', asyncMiddleware( async(req, res, next) => {
//     let sql =   `SELECT id, class, subject, topic, subTopic from test_papers WHERE subTopic LIKE '%Electric%';`
//     pool.query(sql, (err, results) => {
//         try{
//             if(err){ throw err }
//             if(results){ 
//                 results.forEach((i,index) => {
//                     if(i.class==20 && i.subject==29 && i.topic==30){ var code =	48 }
//                     if(i.class==19 && i.subject==28 && i.topic==39){ var code =	105 }
//                     if(code){
//                         const post ={ 'subTopic': code }
//                         let sql = `UPDATE test_papers SET ? WHERE id = ${i.id}`;
//                         pool.query(sql, post, async(err, results) => {
//                             try{
//                                 if(err){ throw err }
//                             }catch(e){ func.logError(e); res.status(500); return; }
//                         })
//                     }else{
//                     }
//                 });
//             }
//         }catch(e){ func.logError(e); res.status(500); return; }
//     })    
// }))


// router.post('/changeBoard', asyncMiddleware( async(req, res, next) => {
//     let sql =   `SELECT id from test_papers;`
//     pool.query(sql, (err, results) => {
//         try{
//             if(err){ throw err }
//             if(results){ 
//                 results.forEach((i,index) => {
//                         const post ={ 'board': '[9,10,11,12]' }
//                         let sql = `UPDATE test_papers SET ? WHERE id = ${i.id}`;
//                         pool.query(sql, post, async(err, results) => {
//                             try{
//                                 if(err){ throw err }
//                             }catch(e){ func.logError(e); res.status(500); return; }
//                         })
//                 });
//             }
//         }catch(e){ func.logError(e); res.status(500); return; }
//     })    
// }))

// router.post('/count', asyncMiddleware( async(req, res, next) => {
//     let sql =   `SELECT DISTINCT id, name FROM basics WHERE type= 'Class';
//                 SELECT DISTINCT id, name FROM basics WHERE type= 'Difficulty';
//                 SELECT DISTINCT id, name FROM basics WHERE type= 'Type';
//                 SELECT DISTINCT id, name, tab1 FROM basics WHERE type= 'Subject';
//                 SELECT DISTINCT id, name, tab1, tab2 FROM basics WHERE type= 'Topic';
//                 SELECT DISTINCT id, name, tab1, tab2, tab3 FROM basics WHERE type= 'SubTopic';
//                 SELECT DISTINCT id, class, subject, topic, subTopic, difficulty, type FROM test_papers;
//                 `
//     pool.query(sql, [1,2,3,4,5,6,7], async(err, results) => {
//         try{
//             if(err){ throw err }
//             if(results){ 
//                 // results[0].forEach(i => {
//                 //     results[1].forEach(j => {
//                 //         results[2].forEach(k => {
//                 //             results[3].filter(l=>l.tab1 == i.id).forEach(l => {
//                 //                 results[4].filter(m=>m.tab1 == i.id && m.tab2 == l.id).forEach(m => {
//                 //                     results[5].filter(n=>n.tab1 == i.id && n.tab2 == l.id && n.tab3 == m.id ).forEach((n, index) => {
//                 //                         if(n.id){
//                 //                         var xx = results[6].filter(o=>o.class==i.id && o.difficulty==j.id && i.type==k.id && o.subject == l.id && o.topic == m.id && o.subTopic == n.id).length
//                 //                             let post={
//                 //                                 'classes': i.id,
//                 //                                 'subject': l.id,
//                 //                                 'difficulty': j.id,
//                 //                                 'type': k.id,
//                 //                                 'topic': m.id,
//                 //                                 'subTopic': n.id
//                 //                             }
//                 //                             let sql = `INSERT INTO questsummary SET ?`
//                 //                         }else{
//                 //                         }
//                 //                     });
//                 //                 });
//                 //             });
//                 //         });
//                 //     });
//                 // });
//             }
//         }catch(e){ func.logError(e); res.status(500); return; }
//     })    
// }))

// const post ={ 'board': '[9,10,11,12]' }
//                         let sql = `UPDATE test_papers SET ? WHERE id = ${i.id}`;
//                         pool.query(sql, post, async(err, results) => {
//                             try{
//                                 if(err){ throw err }
//                             }catch(e){ func.logError(e); res.status(500); return; }
//                         })
// Change DB



module.exports = router;