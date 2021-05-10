function auth(req, res, next){
    if(!req.isAuthenticated()){
        return res.json({
          success:false,message:'Not logined'});
    }
    return next();
}

module.exports = auth
