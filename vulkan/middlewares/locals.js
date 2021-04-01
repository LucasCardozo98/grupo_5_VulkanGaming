module.exports = (req,res,next) => {
    if(typeof req.session.userVulkan != "undefined"){
        res.locals.user = req.session.userVulkan;
    }
    /*else{
        res.locals.user = undefined
    }*/
    next()
}