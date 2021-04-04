module.exports = (req,res,next) => {
    if(req.session.userVulkan){
        res.locals.user = req.session.userVulkan;
    }
    /*else{
        res.locals.user = undefined
    }*/
    next()
}