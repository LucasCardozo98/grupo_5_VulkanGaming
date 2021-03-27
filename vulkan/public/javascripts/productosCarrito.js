
//localStorage.clear()
const listaProductos = document.querySelector("#carrito");
oldHTML = `<li id="vacio">El carrito esta vacío <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Lime_checkbox-checked.svg/1024px-Lime_checkbox-checked.svg.png" alt=""></li>`
listaProductos.innerHTML = oldHTML

listaProductos.style.listStyle = "none"
let carrito = JSON.parse(localStorage.getItem("carrito"));
let productos = [];

fetch("http://localhost:3000/products/api/productos")
.then(response=>{
    return response.json()
})
.then(data=>{
    data.data.filter(element=>{
        carrito.forEach(elementCarrito => {
            if(element.id == elementCarrito.id){
                let producto = {
                    id: element.id,
                    image: element.image,
                    title: element.name,
                    price : element.price * elementCarrito.quantity,
                    quantity: elementCarrito.quantity,
                    unit_price: element.price
                    
                }
                productos.push(producto)
            }
        });
    })
    let tarjetas = productos.map(element=>{
        return `<li id="id${element.id}"><div class="card"><div class="img"><img src="/images/${element.image}" alt=""></div><div class="content"><div class="title">${element.title}</div><div class="price">$${element.price}</div><div class="title">Unidades: ${element.quantity}</div><div class="btn"><button onClick="comprar(${element.id})" idProducto="${element.id}"><i class="fas fa-cart-plus"></i>Comprar</button><button onClick="eliminar(${element.id})">Eliminar</button></div></li>`
    })
    if(tarjetas.length > 0){
        listaProductos.innerHTML = " "
        listaProductos.innerHTML = `${tarjetas}`
    }else{
        listaProductos.innerHTML = oldHTML;
    }
   
})
.catch(error=>{
    console.log(error);
})

function comprar (id){
    if(id== "comprarTodo"){
        console.log(productos);
        
    }
    else{
        console.log("comprar "+ id)
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
        console.log(productos);
        let tarjetas = productos.map(element=>{
            return `<li id="id${element.id}"><div class="card"><div class="img"><img src="/images/${element.image}" alt=""></div><div class="content"><div class="title">${element.title}</div><div class="price">$${element.price}</div><div class="title">Unidades: ${element.quantity}</div><div class="btn"><button onClick="comprar(${element.id})" idProducto="${element.id}"><i class="fas fa-cart-plus"></i>Comprar</button><button onClick="eliminar(${element.id})">Eliminar</button></div></li>`
        })
        listaProductos.innerHTML = " "
        
        if(productos.length > 0){

            listaProductos.innerHTML = `${tarjetas}`
        }else{
            listaProductos.innerHTML = oldHTML;
        }
       
    }
    imprimir()
}
