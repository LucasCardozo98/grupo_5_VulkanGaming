module.exports = (req,res,next)=>{
    //SI HAY UNA SESION INICIADA TE DEJA PASAR Y SI NO 
    // TE ENVIA A INICIAR SESION
    if(req.session.userVulkan){
        next()
    }
    else{
        res.redirect("/users/login")
    }
}