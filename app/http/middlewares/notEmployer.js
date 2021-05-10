function notEmployer(req, res, next){
    if(!req.isAuthenticated()){
        return res.json({
          success:false,message:'Not logined'
        });
    }
    if(req.user.type == 1){
        return res.json({
          success:false,message:'Not Authorised , account is of Employer type'
        });
    }
    return next();
}

module.exports = notEmployer
