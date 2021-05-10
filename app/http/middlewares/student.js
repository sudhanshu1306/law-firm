function student(req, res, next){
    if(!req.isAuthenticated()){
        return res.json({
          success:false,message:'Not logined'
        });
    }
    if(req.user.type != 2){
        return res.json({
          success:false,message:'Account is not a type of student'
        });
    }
    return next();
}

module.exports = student
