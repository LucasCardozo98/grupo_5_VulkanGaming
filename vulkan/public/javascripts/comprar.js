
localStorage.removeItem("sesion");
const formulario = document.querySelector("#formulario")





function vaciar(id){
    if(id == "escribir"){
        let carrito = []
        localStorage.setItem("carrito",JSON.stringify(carrito));
        localStorage.setItem("idCompra","escribir");
    }else{
    let carrito = JSON.parse(localStorage.getItem("carrito"))
    let nuevoCarrito = carrito.filter(element=>{
        return element.id != id
    })
    localStorage.setItem("carrito",JSON.stringify(nuevoCarrito));
    localStorage.setItem("idCompra","escribir");
    }
}
function postearCompra (event){
    const form = document.querySelector("#formularioPago");
    event.preventDefault()
    let carrito = JSON.parse(localStorage.getItem("carrito"))
        if(localStorage.getItem("idCompra") == "escribir"){
            
            const ids = carrito.map(element=>{
                return [element.id, element.quantity, element.price]
            })
            ids.forEach((element,index) => {
                preguntar(element[0],element[1],element[2],ids,index);
            
               
            });
            
        }else{
            console.log("se compra el producto con id"+ localStorage.getItem("idCompra"));
            
            let producto = carrito.find(element=>{
                return element.id == localStorage.getItem("idCompra");
            })
            preguntar(producto.id,producto.quantity,producto.price);
            
        }
}

function preguntar(idProduct,cantidad,precio,array="a",index="a"){
    const form = document.querySelector("#formularioPago");
    const metodoDePago = document.querySelector("#metodoDePago");
    const idUser = document.querySelector("#usuario");
    const idUserValor = idUser.getAttribute("idUser");
    let data =  {idFormaDePago: metodoDePago.value
    ,idUser: idUserValor, idProduct: idProduct,cantidad: cantidad,precio: precio}
    const delay = 2700;
    function seguir(){
        if(array.length -1 == index){
            window.location.reload()
        }else if(array == "a" && index == "a"){
            window.location.reload()
        }
    }
   
    
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
        if(data.mensaje == "no hay stock del producto"){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `No hay stock de ${data.data.name}!`,
                footer: '<button onClick="seguir()">Why do I have this issue?</button>'
              })
            
            
             
        }else if(data.mensaje == "exitoso"){
            vaciar(idProduct);
            imprimir()
            setTimeout(seguir,delay);

        }
    })
    .catch(error=>{
        console.log(error);
    })
}

