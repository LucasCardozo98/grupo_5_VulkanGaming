
//localStorage.clear()
const listaProductos = document.querySelector("#carrito");
oldHTML = `<li id="vacio">El carrito esta vacío <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Lime_checkbox-checked.svg/1024px-Lime_checkbox-checked.svg.png" alt=""></li>`
listaProductos.innerHTML = oldHTML
const congratulations = `<li id="contratulations">Felicidades tu compra fue realizada con exito <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Lime_checkbox-checked.svg/1024px-Lime_checkbox-checked.svg.png" alt=""> </li>`

listaProductos.style.listStyle = "none"
let carrito = JSON.parse(localStorage.getItem("carrito"));
let productos = [];

function escribir (id){
    if(id == "escribir"){
    let tarjetas = carrito.map(element=>{
        return `<li id="${element.id}"><div class="card"><div class="img"><img src="/images/${element.image}" alt=""></div><div class="content"><div class="title">${element.name}</div><div class="price">$${element.price}</div><div class="title">Unidades: ${element.quantity}</div><div class="btn"><button onClick="comprar(${element.id})" idProducto="${element.id}"><i class="fas fa-cart-plus"></i>Comprar</button><button onClick="eliminar(${element.id})">Eliminar</button></div></li>`
    })
    if(tarjetas.length > 0){
        listaProductos.innerHTML = " "
        listaProductos.innerHTML = `${tarjetas}`
    }else{
        listaProductos.innerHTML = oldHTML;
    }
}else{
    let tarjetas = carrito.map(element=>{
        if(element.id == id){
            
            return `<li id="${element.id}"><div class="card"><div class="img"><img src="/images/${element.image}" alt=""></div><div class="content"><div class="title">${element.name}</div><div class="price">$${element.price}</div><div class="title">Unidades: ${element.quantity}</div><div class="btn"><button onClick="comprar(${element.id})" idProducto="${element.id}"><i class="fas fa-cart-plus"></i>Comprar</button><button onClick="eliminar(${element.id})">Eliminar</button></div></li>`

        }
    })
    if(tarjetas.length > 0){
        listaProductos.innerHTML = " "
        listaProductos.innerHTML = `${tarjetas}`
    }else{
        listaProductos.innerHTML = oldHTML;
    }
}
}
if(window.location.href == "http://localhost:3000/products/cart"){
    escribir("escribir")
}else if(localStorage.getItem("idCompra")!= null){
    escribir(localStorage.getItem("idCompra"));
}else{
    listaProductos.innerHTML = congratulations;
}


function comprar (id){
    if(id== "comprarTodo"){
       window.location.href= "http://localhost:3000/products/pagar";
       localStorage.setItem("idCompra","escribir");
        
        
    }
    else{
        localStorage.setItem("idCompra",JSON.stringify(id));
        window.location.href= "http://localhost:3000/products/pagar";        
        /*let nuevoCarro = carrito.filter(element=>{
            return element.id != id
        })
        localStorage.setItem("carrito",JSON.stringify(nuevoCarro));

*/        
    }
}

function eliminar (id){
    if(id== "eliminarTodo"){
        carrito = []
        localStorage.setItem("carrito",JSON.stringify(carrito));
        listaProductos.style.transition = "1s all"
        listaProductos.innerHTML = oldHTML
        imprimir()
        
    }
    else{
        console.log("eliminar "+ id)
        carrito.forEach (element=>{
            if(element.id == id){
                if(element.quantity > 1){
                    element.quantity = element.quantity - 1
            
                    
                }
                else if(element.quantity == 1){
                    carrito.splice(carrito.indexOf(element),1)
                }
            }
        })
        console.log("///")
        console.log(carrito)
        console.log("//esto es carrito")
        localStorage.setItem("carrito",JSON.stringify(carrito));
        const filtrados = productos.forEach(element => {
            if(element.id == id){
                
                    if(element.quantity > 1){
                        element.quantity = element.quantity - 1
                        element.price = element.unit_price * element.quantity 
                        
                    }
                    else if(element.quantity == 1){
                        productos.splice(productos.indexOf(element),1)
                    }
                
            }
        });      

        if(window.location.href == "http://localhost:3000/products/cart"){
            escribir("escribir")
        }else{
            escribir(localStorage.getItem("idCompra"));
        }
       
    }
    imprimir()
}
