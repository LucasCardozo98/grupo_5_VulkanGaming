module.exports = {
    //MOSTRAR RENDERIZA LA VISTA HOME LLAMADA INDEX Y SU CSS
    mostrar: (req, res) => {
        res.render("index", { css: '/stylesheets/index.css' });
    },
}