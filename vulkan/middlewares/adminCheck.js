module.exports = (req,res,next)=>{
    //REVISA LA SESION
    if(req.session.userVulkan){
        // REVISA QUE EL ROL DE LA SESION SEA ADMIN
        if(req.session.userVulkan.rol == "admin"){
            //SI ES ADMIN TE DEJA PASAR
            next()
        }
        else{
            // SI NO ES ADMIN TE REDIRIGE AL HOME
            res.redirect("/");
        }
    }
    else{
        // SI NO HAY SESION INICIADA TE REDIRIGE AL LOGIN
        res.redirect("/users/login");
    }
    
}