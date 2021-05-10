function employer(req, res, next){
    if(!req.isAuthenticated()){
        return res.json({
          success:false,
          message:'Not logined'
        });
    }
    if(req.user.type != 1){
        return res.json({
          success:false,
          message:'Account is not a type of employer'
        });
    }
    return next();
}

module.exports = employer
