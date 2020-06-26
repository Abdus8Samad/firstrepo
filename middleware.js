function isAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
        res.redirect('/');
}

const func  = {
    isAuthenticated
}

module.exports = func;