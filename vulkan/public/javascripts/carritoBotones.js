let botones = document.querySelectorAll(".botones");
console.log(botones)
//botones.addEventListener("click",capturar)
botones.forEach(element => {
    element.addEventListener("click",capturar)
});

/*function capturar(){
    agregar(this.getAttribute("idProducto"));
}*/
function capturar(event){
    console.log()
    agregar(event.srcElement.attributes.idProducto.value)
}