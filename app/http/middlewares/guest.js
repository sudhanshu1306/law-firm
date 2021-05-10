function guest(req, res, next){
    if(!req.isAuthenticated()){
        return next();
    }
    return res.redirect('/api/');
}

module.exports = guest;