module.exports = (req,res,next) => {
    if(typeof req.session.user != "undefined"){
        res.locals.user = req.session.user;
    }
    /*else{
        res.locals.user = undefined
    }*/
    next()
}