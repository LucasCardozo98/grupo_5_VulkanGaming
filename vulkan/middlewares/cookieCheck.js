module.exports = (req,res,next)=>{
    if(req.cookies /*!= undefined*/){
        if(req.cookies.userVulkan){
        req.session.userVulkan = req.cookies.userVulkan
        }
    }
   
        
    console.log(req.cookies.userVulkan);
    console.log(req.session.userVulkan);
    next()
}