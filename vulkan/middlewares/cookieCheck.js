module.exports = (req,res,next)=>{
    if(req.cookie != undefined){
        if(req.cookie.userVulkan){
        req.session.user = res.cookie.userVulkan
        }
    }
   
        
    
    next()
}