const productoCategoria = document.querySelector("#nombre");

productoCategoria.getAttribute("idProducto");
let carrito = []
//localStorage.clear()
//localStorage.setItem("carrito",JSON.stringify(carrito));
function agregar(){
    let existe = false;
    let chango = JSON.parse(localStorage.getItem("carrito"))
    let item = {
        id: productoCategoria.getAttribute("idProducto"),
        quantity: 1
    }
    if(chango != null){
    chango.forEach(element => {
        if(element.id == productoCategoria.getAttribute("idProducto")){
            existe = true;
            console.log("true")
        }
    });}
    if(existe){
        let elemento = chango.filter(element=>{
            return element.id == productoCategoria.getAttribute("IdProducto")
        })
       
        let indice = chango.indexOf(elemento[0])
        chango[indice].quantity += 1
        
        localStorage.setItem("carrito",JSON.stringify(chango));
    }else{
        if(chango== null){
            carrito.push(item)
            localStorage.setItem("carrito",JSON.stringify(carrito))
        }
        else{
        chango.push(item);
        localStorage.setItem("carrito",JSON.stringify(chango))
        }
    }
    imprimir()
    console.log(localStorage.getItem("carrito"))
}








