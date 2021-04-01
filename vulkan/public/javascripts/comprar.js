
localStorage.removeItem("sesion");
const formulario = document.querySelector("#formulario")





function vaciar(id){
    if(id == "escribir"){
        let carrito = []
        localStorage.setItem("carrito",JSON.stringify(carrito));
        localStorage.removeItem("idCompra");
    }else{
    let carrito = JSON.parse(localStorage.getItem("carrito"))
    let nuevoCarrito = carrito.filter(element=>{
        return element.id != id
    })
    localStorage.setItem("carrito",JSON.stringify(nuevoCarrito));
    localStorage.removeItem("idCompra");
    }
}
function postearCompra (event){
    event.preventDefault()
    let carrito = JSON.parse(localStorage.getItem("carrito"))
        if(localStorage.getItem("idCompra") == "escribir"){
            
            const ids = carrito.map(element=>{
                return [element.id, element.quantity, element.price]
            })
            ids.forEach(element => {
               preguntar(element[0],element[1],element[2]); 
            });
            console.log(ids)
            console.log("se compra todo señores");
        }else{
            console.log("se compra el producto con id"+ localStorage.getItem("idCompra"));
            
            let producto = carrito.find(element=>{
                return element.id == localStorage.getItem("idCompra");
            })
           preguntar(producto.id,producto.quantity,producto.price);
        }
}

function preguntar(idProduct,cantidad,precio){
    const metodoDePago = document.querySelector("#metodoDePago");
    const idUser = document.querySelector("#usuario");
    const idUserValor = idUser.getAttribute("idUser");
    let data =  {idFormaDePago: metodoDePago.value
    ,idUser: idUserValor, idProduct: idProduct,cantidad: cantidad,precio: precio}
    
    fetch("http://localhost:3000/products/pagar",{
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response=>{
        return response.json()
    })
    .then(data=>{
        console.log(data.data);
    })
    .catch(error=>{
        console.log(error);
    })
}