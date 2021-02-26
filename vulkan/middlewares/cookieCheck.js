module.exports = (req,res,next)=>{
    if(req.cookie.userVulkan){
        req.session.user = req.cookie.userVulkan
    }
}