const db = require("../database/models");

module.exports = {
    //MOSTRAR RENDERIZA LA VISTA HOME LLAMADA INDEX Y SU CSS
    mostrar: (req, res) => {
        db.Product.findAll({
            where: {
                visible: 1
            }
        })
        .then(products=>{
            res.render("index", { css: '/stylesheets/index.css',products });
        })
        .catch(error=>{
            res.send(error);
        })
    },
}