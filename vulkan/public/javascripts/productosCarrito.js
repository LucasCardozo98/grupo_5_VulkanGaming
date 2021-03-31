
//localStorage.clear()
const listaProductos = document.querySelector("#carrito");
oldHTML = `<li id="vacio">El carrito esta vacío <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Lime_checkbox-checked.svg/1024px-Lime_checkbox-checked.svg.png" alt=""></li>`
listaProductos.innerHTML = oldHTML
const congratulations = `<li id="contratulations">Felicidades tu compra fue realizada con exito <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Lime_checkbox-checked.svg/1024px-Lime_checkbox-checked.svg.png" alt=""> </li>`
const cantidad = document.querySelector("#cantidad")
listaProductos.style.listStyle = "none"
let carrito = JSON.parse(localStorage.getItem("carrito"));
let productos = [];

function escribir (id){
    if(id == "escribir"){
    let tarjetas = carrito.map(element=>{
        return `<li id="id${element.id}"><div class="card"><div class="img"><img src="/images/${element.image}" alt=""></div><div class="content"><div class="title">${element.name}</div><div class="price">$${element.price}</div><div class="title">Unidades: ${element.quantity}</div><div class="btn"><button onClick="comprar(${element.id})" idProducto="${element.id}"><i class="fas fa-cart-plus"></i>Comprar</button><button onClick="eliminar(${element.id})">Eliminar</button></div><button id="sumar" onclick="mailu(${element.id},1)">+</button><span id="cantidad"></span> <button id="restar" onclick="mailu(${element.id},0)">-</button></li>`
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
            
            return `<li id="${element.id}"><div class="card"><div class="img"><img src="/images/${element.image}" alt=""></div><div class="content"><div class="title">${element.name}</div><div class="price">$${element.price}</div><div class="title">Unidades: ${element.quantity}</div><div class="btn"><button onClick="comprar(${element.id})" idProducto="${element.id}"><i class="fas fa-cart-plus"></i>Comprar</button><button onClick="eliminar(${element.id})">Eliminar</button></div><button id="sumar" onclick="mailu(${element.id},1)">+</button> <span id="cantidad"></span> <button id="restar" onclick="mailu(${element.id},0)">-</button></li>`

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
}else if(window.location.href == "http://localhost:3000/products/pagar"){
    escribir(localStorage.getItem("idCompra"));
}else{
    listaProductos.innerHTML = congratulations;
}


function comprar (id){
    const idUser = document.querySelector("#usuario");
    if(idUser != null){
    if(id== "comprarTodo"){
       window.location.href= "http://localhost:3000/products/pagar";
       localStorage.setItem("idCompra","escribir");
        console.log(localStorage.getItem("idCompra"));
        
       
    }
    else{
        localStorage.setItem("idCompra",JSON.stringify(id));
        window.location.href= "http://localhost:3000/products/pagar";    
        console.log(localStorage.getItem("idCompra"))
            
    }
    }
    else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Debes estar logueado para comprar',
            footer: '<a href="/users">Iniciar sesión</a>'
          })
    }
}

function eliminar (id){
    if(id== "eliminarTodo"){
        carrito = []
        localStorage.setItem("carrito",JSON.stringify(carrito));
        listaProductos.style.transition = "1s all"
        //listaProductos.innerHTML = oldHTML
        escribir("escribir");
        imprimir()
        
    }
    else{
        console.log("eliminar "+ id)
        carrito.forEach (element=>{
            if(element.id == id){
                if(element.quantity > 1){
                    element.quantity = element.quantity - 1
                    element.price = element.unit_price * element.quantity
            
                    
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
        /*const filtrados = productos.forEach(element => {
            if(element.id == id){
                
                    if(element.quantity > 1){
                        element.quantity = element.quantity - 1
                        element.price = element.unit_price * element.quantity 
                        
                    }
                    else if(element.quantity == 1){
                        productos.splice(productos.indexOf(element),1)
                    }
                
            }
        });   */   

        if(window.location.href == "http://localhost:3000/products/cart"){
            escribir("escribir")
        }else{
            escribir(localStorage.getItem("idCompra"));
        }
       
    }
    imprimir()
}
function mailu(id,value){
    let producto = carrito.find(element=>{
        return element.id == id
    })
    carrito.forEach(element => {
        if(element.id == id){
            if(value == 1){
                element.quantity += 1
                element.price = element.unit_price * element.quantity
                console.log(element.unit_price);
            }
            else{
                if(element.quantity == 1){
                    carrito.splice(carrito.indexOf(producto),1)
                    
                }else{
                element.quantity -= 1
                element.price = element.unit_price * element.quantity
                }
            }
        }
    });
    localStorage.setItem("carrito",JSON.stringify(carrito));
    escribir("escribir");
    imprimir()
}