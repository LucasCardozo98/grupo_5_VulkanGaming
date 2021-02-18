const fs = require("fs");
const products = JSON.parse(fs.readFileSync("./data/users.json", "utf-8"));

module.exports = {
    mostrar: (req, res) => {
        res.render("register", { css: '/stylesheets/register.css' });
    },
    showEditar: (req, res) => {
        res.render("userEdit", { css: '/stylesheets/userEdit.css' });
    }

}