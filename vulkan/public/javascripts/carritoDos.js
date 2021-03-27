let carrito = []
//localStorage.clear()
//localStorage.setItem("carrito",JSON.stringify(carrito));
let productos= []

function agregar(titulo){
    let existe = false;
    let chango = JSON.parse(localStorage.getItem("carrito"))
    
    let item = {
        id: titulo.getAttribute("idProducto"),
        quantity: 1
    }
    if(chango != null){
    chango.forEach(element => {
        if(element.id == titulo.getAttribute("idProducto")){
            existe = true;
            console.log("true")
        }
    });}
    if(existe){
        let elemento = chango.filter(element=>{
            return element.id == titulo.getAttribute("IdProducto")
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







