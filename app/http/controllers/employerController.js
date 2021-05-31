const User = require('../../model/user');
const Job = require('../../model/job');
const Experience=require('../../model/experience');
const Application = require('../../model/application');
const Sra=require('../../model/sra')
const bcrypt = require('bcryptjs');
const authController = require('./authController');
function employerController(){

    return {
        
        async getJobs(req,res){
            const url=req.protocol+'://'+req.get('host')+'/';
            try {
                let jobs = await Job.find({approved : 1}).populate("employer");
                let user=null;
                if(req.user){
                 user= await User.findById(req.user._id);
                }
               /* return res.status(200).json({
                    message: 'Success',
                    jobs : jobs
                });*/
                res.json({
                  success:true,
                    jobs : jobs,
                    user :user,
                    url:url
                });
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }
        },
        async getJobsPart(req,res){
            try {
                let jobs = await User.findById(req.user._id,{jobs:1}).populate("jobs");
               /* return res.status(200).json({
                    message: 'Success',
                    jobs : jobs
                });*/
                res.json({
                  success:true,
                    jobs : jobs.jobs
                });
            } catch (error) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }
        },
        async getJobApplicant(req,res){
            try {
                const url=req.protocol+'://'+req.get('host')+'/';
                let job = await  Job.findById(req.body.id).populate({path:"applied",populate:{path:"user",populate:{path:"experience"}}}).populate({path:"applied",populate:{path:'experiences'}});
                res.json({
                  success:true,
                  applicant : job.applied,
                  url: url
                });
            } catch (error) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }
        },
        async postJobs(req,res){
            try {
                let title = req.body.title;let info = req.body.info;
                let {company,venue,experience,salary,jobType,area,skillsRequired,skillsDeveloped}=req.body;
                console.log(req.body);
                if(!title || !info || !company || !venue || !experience || !salary || !jobType || !area || title == "" || info == "" || company == "" || venue == "" || experience == "" || salary == "" || jobType=="" || area=="" ){
                return res.status(500).json({
                    message: 'No fields can be empty'
                });
                }
                const newjob = new Job({
                    title : title,
                    info : info,
                    company: company,
                    venue: venue,
                    experience: experience,
                    salary: salary,
                    employer : req.user._id,
                    jobType:jobType,
                    area:area,
                    skillsDeveloped:skillsDeveloped,
                    skillsRequired:skillsRequired
                });
                await newjob.save();
                User.findById(req.user._id,async function(err,doc){
                    if(err){
                        return res.status(500).json({
                            message: 'Internal server error'
                        });
                    }
                    doc.jobs.push(newjob._id);
                    doc.save();
                   /* return res.status(200).json({
                        message: 'Success',
                        employer : doc
                    });*/
                    res.redirect('/api/jobs');
                });

            } catch (error) {
                return res.status(500).json({
                    message: error
                });
            }
        },
        async viewJob(req,res){
            let id = req.params.id;
            try {
                let job = await Job.findById(id).populate("applied");
                let employer = false;
                if(req.user.type === 1)
                employer = true;

                res.json({
                  success:true,
                    job : job,
                    employer : employer
                })
            } catch (error) {
                return res.status(500).json({
                    message: error.message
                });
            }
        },
        async editUser(req,res){
            let {name,info,password,passd} = req.body;

            if(name == "" || info == ""  || passd == "" || name == null || info == null  || passd == null){
                return res.status(500).json({
                    message: 'No fields can be empty'
                });
            }
            bcrypt.compare(passd, req.user.password).then(async (match)=>{
                if(!match){
                    return res.status(500).json({
                        message: 'Please enter the correct old password'
                    });
                }
                else{

                    try {
                     const hashedPass = await bcrypt.hash(password, 10);
                     const filter = { _id : req.user._id };
                     const upd = { name : name,
                                 info : info
                          };
                          if(password){
                            upd.password = hashedPass;
                          }
                          if(req.file){
                             upd.profileImage=req.file.path;
                         }
                         console.log(upd);
                     const update = { $set: {
                         ...upd
                     }};
                         console.log(update);

                     let doc = await User.findOneAndUpdate(filter, update, {
                                      new: true
                                 });
                                /* return res.status(200).json({
                                     message: 'Success',
                                     user : doc
                                 });*/
                                 req.user = await doc;
                                 res.redirect('..');

                     } catch (error) {
                         return res.status(500).json({
                             message: error.message
                         });
                     }
                }

            }).catch((err)=>{
                return res.status(500).json({
                    message: err.message
                });
            })

        },
        async editEmployer(req,res){
            let {name,organizationType} = req.body;

            if(name == "" || organizationType == ""   || name == null || organizationType == null  ){
                return res.status(500).json({
                    message: 'No fields can be empty'
                });
            }

                    try {
                     const filter = { _id : req.user._id };
                     const upd = { name : name,
                                 organizationType : organizationType
                          };
                         
                          if(req.file){
                             upd.profileImage=req.file.path;
                         }
                         console.log(upd);
                     const update = { $set: {
                         ...upd
                     }};
                         console.log(update);

                     let doc = await User.findOneAndUpdate(filter, update, {
                                      new: true
                                 });
                                /* return res.status(200).json({
                                     message: 'Success',
                                     user : doc
                                 });*/
                                 req.user = await doc;
                                 res.json({
                                     success:true,
                                     message:"Successfully updated employer id"
                                 })

                                 } catch (error) {
                         return res.status(500).json({
                             message: error.message
                         });
                     }
              

        },
        async editSra(req,res){
            let {queA1,queA2,queA3,queA4,queB1,queB2,queB3,queB4,queC1,queC2,queC3,queC4,queD1,queD2,queD3,queD4,queE1,queE2,queE3,queE4} = req.body;
            console.log(req.body);
            if(queA1 == "" || queA2 == ""  || queA3 == "" || queA4 == "" || queB1 == ""  || queB2 == "" || queB3==""||queB4==""||queC1==""||queC2==""||queC3==""||queC4==""||queD1==""||queD2==""||queD3==""||queD4==""||queE1==""||queE2==""||queE3==""||queE4==""||queA1 == null || queA2 == null  || queA3 == null || queA4 == null || queB1 == null  || queB2 == null || queB3==null||queB4==null||queC1==null||queC2==null||queC3==null||queC4==null||queD1==null||queD2==null||queD3==null||queD4==null||queE1==null||queE2==null||queE3==null||queE4==null){
                return res.status(500).json({
                    message: 'No fields can be empty'
                });
            }
                   
                    try {
                        const user=User.findById(req.user._id);
                        if(user.sra==null){
                            const sra=new Sra({
                                queA1:queA1,
                                queA2:queA2,
                                queA3:queA3,
                                queA4:queA4,
                                queB1:queB1,
                                queB2:queB2,
                                queB3:queB3,
                                queB4:queB4,
                                queC1:queC1,
                                queC2:queC2,
                                queC3:queC3,
                                queC4:queC4,
                                queD1:queD1,
                                queD2:queD2,
                                queD3:queD3,
                                queD4:queD4,
                                queE1:queE1,
                                queE2:queE2,
                                queE3:queE3,
                                queE4:queE4
                            })
                            sra.save();
                            User.findById(req.user._id,(err,doc)=>{
                                doc.sra=sra;
                                doc.save();
                            })
                        }
                     else{
                     const upd = {  
                        queA1:queA1,
                        queA2:queA2,
                        queA3:queA3,
                        queA4:queA4,
                        queB1:queB1,
                        queB2:queB2,
                        queB3:queB3,
                        queB4:queB4,
                        queC1:queC1,
                        queC2:queC2,
                        queC3:queC3,
                        queC4:queC4,
                        queD1:queD1,
                        queD2:queD2,
                        queD3:queD3,
                        queD4:queD4,
                        queE1:queE1,
                        queE2:queE2,
                        queE3:queE3,
                        queE4:queE4
                          };
                         
                     const update = { $set: {
                         ...upd
                     }};
                         console.log(update);

                     let doc = await Sra.findOneAndUpdate({_id:user.sra}, update, {
                                      new: true
                                 });
                                }
                                return res.status(200).json({
                                    success:true,
                                    message: 'Success',
                                });

                     } catch (error) {
                         console.log(error);
                         return res.status(500).json({
                             message: error.message
                         });
                     }


        },
        async addPriority(req,res){
            try {
                let {locationPriority,areaPriority}=req.body;
                console.log(req.body);
                User.findById(req.user._id,async function(err,doc){
                    if(err){
                        return res.status(500).json({
                            message: 'Internal server error'
                        });
                    }
                    doc.locationPriority=locationPriority;
                    doc.areaPriority=areaPriority;
                    doc.save();
                   /* return res.status(200).json({
                        message: 'Success',
                        employer : doc
                    });*/
                    res.redirect('/api/jobs');
                });

            } catch (error) {
                return res.status(500).json({
                    message: error
                });
            }
        },
        async addExperience(req,res){
            try {
                let {jobTitle,companyName,location,duration,description}=req.body;
                console.log(req.body);
                if(!jobTitle || !companyName|| !location || !duration || !description || jobTitle=="" || companyName== "" || location=="" || duration ==""|| description=="" ){
                return res.status(500).json({
                    message: 'No fields can be empty'
                });
                }
                const newExperience=new Experience({
                    jobTitle:jobTitle,
                    companyName:companyName,
                    location:location,
                    duration:duration,
                    description:description,
                    user:req.user._id
                })
                newExperience.save();
                User.findById(req.user._id,async function(err,doc){
                    if(err){
                        return res.status(500).json({
                            message: 'Internal server error'
                        });
                    }
                    doc.experience.push(newExperience._id);
                    doc.save();
                   return res.status(200).json({
                        success: true,
                        experience : newExperience
                    });
                });

            } catch (error) {
                return res.status(500).json({
                    message: error
                });
            }
        },
        async deleteUser(req,res){
            try {
                let jobs = await User.findById(req.user._id,{jobs : 1});
                for(let i=0;i<jobs.jobs.length;i++){
                    Job.deleteMany({_id:jobs.jobs[i]},function(err){
                        if(err){
                            res.send(err);
                        }
                    })
                }

                User.deleteOne({_id:req.user._id},function(err){
                    if(err)
                     res.send(err);
                     else{
                        authController().logout;
                        res.status(200).json({
                           message: 'Success'
                       });
                     }
                });

            } catch (error) {
                return res.status(500).json({
                    message: error
                });
            }
        },
        async deleteJob(req,res){
            let jId=req.body.id;
            try{
                await Job.findOneAndDelete({_id:jId},(err)=>{
                    if(err)
                    res.send(err);
                    else
                    res.status(200).json({
                        success:true,
                        message:"Successfully deleted job"
                    })
                })
            }catch (error) {
                return res.status(500).json({
                    success:false,
                    message: error
                });
        }},
        async applyJob(req,res){
            let jId = req.body.id;
            console.log(req.body);
            let {firstName,lastName,description,areaExperience,areaInterested,experiences}=req.body;
            try {
                if(firstName==null||lastName==null||description==null||areaInterested==null||firstName==''||lastName==''||description==''||areaInterested==''){
                    return res.status(500).json({
                        message: 'No fields can be empty'
                    });
                }
                Job.findById(jId,async function(err,doc){
                        const application=new Application({
                            firstName:firstName,
                            lastName:lastName,
                            description:description,
                            areaExperience:areaExperience,
                            areaInterested:areaInterested,
                            job:jId,
                            user:req.user._id,
                            experiences:[]
                        })
                        experiences.forEach(exp=>{
                            if(!application.experiences)
                            application.experiences=[];
                            application.experiences.push(exp);
                        });
                        await application.save();
                        await doc.applied.push(application);
                        await doc.save();
                        User.findById(req.user._id,async function(err,docc){
                            if(err){
                                return res.status(500).json({
                                    message: 'Internal server error'
                                });
                            }
                            else{
                                docc.jobs.push(jId);
                            await docc.save();
                            res.redirect('/api/jobs');
                            }

                })

                      
            })
            } catch (error) {
                return res.status(500).json({
                    message: error.message
                });
            }
        },
        async viewApplied(req,res){
            let jId = req.body.id;
            try {
                let applied = await Job.findById(jId,{applied:1}).populate({path:'applied',populate:{path:'experiences'}});
                console.log(applied);
                /*return res.status(200).json({
                    message: 'Success',
                    job : doc
                });*/
                res.json({
                  success:true,
                    users : applied.applied
                })

            } catch (error) {
                return res.status(500).json({
                    message: error.message
                });
            }
        },
        async acceptApplied(req,res){
            let jId = req.body.id;
            try {
                await Job.findById(jId,(err,foundJob)=>{
                    if(err)
                    return err;
                    else{
                        var applicant=foundJob.applied.map(fj=> fj.user );
                        console.log(applicant);
                        var applicationId="";
                        if(applicant.indexOf(req.body.user)!=-1){
                            applicationId=foundJob.applied[applicant.indexOf(req.body.user)];
                        foundJob.applied.splice(applicant.indexOf(req.body.user),1);}
                        if(req.body.btn==1)
                        foundJob.accepted.push(applicationId);
                        foundJob.save();
                    }
                })
                
                res.json({
                  success:true,
                  message:"done"
                })

            } catch (error) {
                return res.status(500).json({
                    success:false,
                    message: error.message
                });
            }
        },
        async viewUser(req,res){
          const url=req.protocol+'://'+req.get('host')+'/';
            let id = req.body.id;
            if(!id){
                id = req.user._id;
            }
            try {
                let user = await User.findById(id).populate({path:'jobs',populate:{path:'employer'}}).populate('articles').populate('experience').populate('sra').populate({
                  path:'courses',
                  populate:{
                    path:'author'
                  }
                });
                let application=await Application.find({user:id});
                console.log(application);
                res.json({
                  success:true,
                    user : user,
                    logged : req.user,
                    url:url,
                    application:application
                });
            } catch (error) {
                return res.status(500).json({
                    message: 'Internal server error'
                });
            }
        },
        async editJob(req,res){
                  let id = req.body.id;
                  let info = req.body.info;
                  let title = req.body.title;
                  if(info == "" || title == "" || info == null || title == null){
                      console.log(req.body);

                      return res.status(500).json({
                          message: 'No fields can be empty'
                      });
                  }
                  else{
                      try {

                          const filter = { _id : id};
                      const upd = { title : title,
                                  info : info,
                                  approved : 0
                           };
                      const update = { $set: {
                          ...upd
                      }};
                              let job = await Job.findOneAndUpdate(filter, update, {
                                           new: true
                              });
                       res.redirect('..');
                      } catch (error) {
                          return res.status(500).json({
                              message: error.message
                          });
                      }
                  }
              },
              async editJobRequest(req,res){
                  let id = req.body.id;
                  try {
                      let job = await Job.findById(id);
                      res.json({
                        success:true,
                          job :job
                      })
                  } catch (error) {
                      return res.status(500).json({
                          message: error.message
                      });
                  }
              }


    }
}
module.exports = employerController;
