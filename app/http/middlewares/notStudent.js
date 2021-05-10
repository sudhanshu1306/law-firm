function notStudent(req, res, next){
    if(!req.isAuthenticated()){
        return res.json({
          success:false,message:'Not logined'
        });
    }
    if(req.user.type == 2){
        return res.json({
          success:false,message:'Not Authorised account is of student type'});
    }
    return next();
}

module.exports = notStudent
