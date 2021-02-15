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
    let sql = `SELECT id as value, name as text from users WHERE role='Owner' AND status=1;`
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
                let sql = `SELECT id, type, name, tab1, tab2, tab3, updated_at FROM basics ORDER BY id DESC LIMIT 1`
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
                let sql = `SELECT id, type, name, tab1, tab2, tab3, updated_at FROM basics WHERE id = ${req.body.id}`
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
    let sql = `SELECT id, name, email, status, updated_at from users WHERE role='Owner';`
    pool.query(sql, (err, results) => {
        try{
            if(err){ throw err }
            if(results){ res.send({ data: results }); }
        }catch(e){ func.logError(e); res.status(500); return; }
    })
}))

router.post('/changeInstituteStatus', asyncMiddleware( async(req, res, next) => {
    let post= {
        "status":                   req.body.status,
        "updated_at":               time,
    }
    let sql = `UPDATE users SET ? WHERE id = ${req.body.id}`
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
    let sql = `SELECT id, type, name, tab1, tab2, tab3 FROM basics as a WHERE type IN ('Class', 'Board', 'Subject', 'Topic', 'SubTopic', 'Difficulty', 'Question Type');`
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






module.exports = router;