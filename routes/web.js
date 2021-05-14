const authController = require('../app/http/controllers/authController');
const employerController = require('../app/http/controllers/employerController');
const adminController = require('../app/http/controllers/adminController');
const articleController = require('../app/http/controllers/articleController');
const courseAuthorController = require('../app/http/controllers/courseAuthorController');
const discussionController = require('../app/http/controllers/discussionController');
const auth = require('../app/http/middlewares/auth');
const admin = require('../app/http/middlewares/admin');
const student = require('../app/http/middlewares/student');
const employer = require('../app/http/middlewares/employer');
const notStudent = require('../app/http/middlewares/notStudent');
const notEmployer = require('../app/http/middlewares/notEmployer');
const registered = require('../app/http/middlewares/registered');
const passport = require('passport');
const guest = require('../app/http/middlewares/guest');
const multer=require('multer');
const Article = require('../app/model/article');

function initRoute(app) {

  app.get('/api/',function(req,res){
    res.redirect('/api/jobs');
  })

  app.get('/api/login', function(req,res){
      res.json({success:true,message:"welcome to login"});
  })

    app.post('/api/login', authController().postLogin)

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
          var ext=file.mimetype.substring(file.mimetype.indexOf("/")+1);
          cb(null, Date.now() +"."+ ext) //Appending extension
        }
      });

      const uploadDp=multer({storage:storage,
        fileFilter: function (req, file, callback) {
          var ext = file.mimetype;
          if(ext !== 'image/png' && ext !== 'image/jpg' && ext !== 'image/jpeg') {
              return callback(new Error('Only images are allowed'))
          }
          callback(null, true)
      },
      limits:{
          fileSize: 1024 * 1024
      }});
      const dp =uploadDp.single('pic');

      const uploadQa=multer({storage:storage,
        fileFilter: function (req, file, callback) {
          var ext = file.mimetype;
          if(ext !== 'image/png' && ext !== 'image/jpg' && ext !== 'image/gif' && ext !== 'image/jpeg') {
              return callback(new Error('Only images are allowed'))
          }
          callback(null, true)
      },
      limits:{
          fileSize: 1024 * 1024 * 10
      }
      });
      const qa=uploadQa.array('pics',10);

      const uploadVd=multer({storage:storage,
        fileFilter: function (req, file, callback) {
          var ext = file.mimetype;
          if(ext !== 'video/mp4') {
              return callback(new Error('Only mp4 are allowed'))
          }
          callback(null, true)
      },
      limits:{
          fileSize: 1024 * 1024 * 500
      }
      });

      const vd =uploadVd.single('video');

      app.get('/api/register',async function(req,res){
        res.render('signup');
      })
    app.post('/api/register',dp, authController().postRegister)

    app.post('/api/logout', authController().logout);

    app.get('/api/jobs',employerController().getJobs)

    app.post('/api/jobsParti',auth,employerController().getJobsPart)

    app.post('/api/jobApplicant',auth,employer,employerController().getJobApplicant)


    app.post('/api/jobs',auth,employer,employerController().postJobs)

    app.post('/api/applyJobs',auth,notEmployer,employerController().applyJob)

    app.post('/api/editJob',auth,employerController().editJobRequest);

    app.post('/api/editJobForm',auth,employerController().editJob)

    app.get('/api/viewJob/:id',auth,employerController().viewJob);

    app.post('/api/acceptApplied',auth,employer,employerController().acceptApplied);
    
    app.post('/api/deleteJob',auth,employer,employerController().deleteJob);
    
    app.get('/api/editUser',auth,async function(req,res){
       res.json({
         success:true,
         user : req.user
       })
    })
    app.post('/api/editEmployer',auth,employer,dp,employerController().editEmployer);

    app.post('/api/editUser',auth,dp,employerController().editUser)

    app.post('/api/deleteUser',auth,employerController().deleteUser)

    app.get('/api/adminJobs',admin,adminController().getAdminJobs)

    app.post('/api/adminJobs',admin,adminController().postAdminJobs)

    app.get('/api/adminArticles',admin,adminController().getAdminArticle)

    app.post('/api/adminArticles',admin,adminController().postAdminArticle)

    app.get('/api/adminVideos',admin,adminController().getAdminVideos)

    app.post('/api/adminVideos',admin,adminController().postAdminVideos)


    app.get('/api/articles',articleController().getArticle)

    app.post('/api/article',auth,articleController().postArticle)
    app.get('/api/article/:id',auth,articleController().individualArticle)

    app.post('/api/likeArticle',auth,articleController().likeArticle)

    app.get('/api/likedUsers/:articleId',auth,articleController().likedUsers)

    app.post('/api/getComment',auth,articleController().getComment)

    app.post('/api/postComment',auth,articleController().postComment)

    app.post('/api/likeComment',auth,articleController().likeComment)

    app.post('/api/getReply',auth,articleController().getReply)

    app.post('/api/postReply',auth,articleController().postReply)

    app.post('/api/editArticle',auth,async function(req,res){
       let id = req.body.id;
       let article = await Article.findById(id);
        res.json({
          success:true,
            article : article
        })
    })

    app.get('/api/viewArticle/:id',auth,articleController().viewArticle)

    app.post('/api/editArticleForm',auth,articleController().editArticle)

   // app.post('/api/likeReply',auth,articleController().likeReply)

    app.get('/api/getcourse',courseAuthorController().getCourse)

    app.post('/api/postCourse',auth,notStudent,dp,courseAuthorController().postCourse)

    app.post('/api/getLessons',auth,courseAuthorController().getLessons)

    app.post('/api/postLessons',auth,notStudent,courseAuthorController().postLessons)

    app.post('/api/postVideo',auth,notStudent,vd,courseAuthorController().postVideo)

    app.get('/api/getVideo/:id',auth,courseAuthorController().getVideo)

    app.get('/api/viewCourse/:id',auth,courseAuthorController().viewCourse)

    app.post('/api/getVideoEJS',auth,registered,async function(req,res){
        res.json({
          success:true,
          id : req.body.id
        });
    })

    app.post('/api/registerForCourse',auth,student,courseAuthorController().registerForCourse)

    app.get('/api/getQuestion',discussionController().getQuestion)

    app.post('/api/postQuestion',auth,qa,discussionController().postQuestion)

    app.post('/api/getSpecificQuestion',discussionController().getPartiQuestion)

    app.get('/api/question/:id',discussionController().getPartialQuestion)

    app.post('/api/getAnswer',discussionController().getAnswer)

    app.post('/api/postAnswer',auth,qa,discussionController().postAnswer)

    app.post('/api/likeQuestion',auth,discussionController().likeQuestion)

    app.post('/api/likeAnswer',auth,discussionController().likeAnswer)

    app.post('/api/postAnswerReply',auth,discussionController().postReply)

    app.post('/api/viewProfile',auth,employerController().viewUser)

    //changed code by me
    app.get("/api/viewAddArticle",auth,(req,res)=>{
      res.render("addArticle");
    });
    app.get("/api/viewAddJob",auth,(req,res)=>{
      res.render("addJob");
    });
    app.get("/api/viewAddCourse",auth,(req,res)=>{
      res.render("addCourse");
    })
    app.get("/api/viewAddLesson/:id",auth,(req,res)=>{
      res.json({
        success:true,
        id:req.params.id
      });
    })

    app.get("/api/viewAddVideo/:id",auth,(req,res)=>{
      res.json({
        success:true,
        id:req.params.id
      });
    })
    app.get("/api/viewAddQuestion",auth,(req,res)=>{
      res.render("addQuestion");
    });
   app.get("/checkLogin",(req,res)=>{
     res.json({
       success:req.isAuthenticated(),
     })
   });
   app.get("/api/checkLogin",(req,res)=>{
    res.json({
      success:req.isAuthenticated(),
    })
  });
}
module.exports = initRoute;
