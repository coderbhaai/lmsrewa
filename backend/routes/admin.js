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

router.get('/adminBasics', asyncMiddleware( async(req, res) => {
    let sql = `SELECT id, type, name, tab1, tab2, tab3, updated_at FROM basics;`
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
    console.log('Adding Comment in backend', req.body)
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

module.exports = router;