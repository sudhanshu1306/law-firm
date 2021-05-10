function admin(req, res, next){
    if(!req.isAuthenticated()){
        return res.json({
          success:false,
          message:'Not logined'
        });
    }
    if(req.user.type != 0){
        return res.json({
          success:false,
          message:'Not Authorised'
        });
    }
    return next();
}

module.exports = admin
