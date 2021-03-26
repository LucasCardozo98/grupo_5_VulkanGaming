

const listaProductos = document.querySelector("#carrito");
const carrito = JSON.parse(localStorage.getItem("carrito"));
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
        return `<li><div class="card"><div class="img"><img src="/images/${element.image}" alt=""></div><div class="content"><div class="title">${element.title}</div><div class="price">$${element.price}</div><div class="title">Unidades: ${element.cantidad}</div><div class="btn"><button onClick="comprar(${element.id})" idProducto="${element.id}"><i class="fas fa-cart-plus"></i>Comprar</button><button onClick="eliminar(${element.id})">Eliminar</button></div></li>`
    })
    listaProductos.innerHTML = `${tarjetas}`
})
.catch(error=>{
    console.log(error);
})

function comprar (id){
    if(id== "comprarTodo"){
        console.log(productos);
        fetch("http://localhost:3000/products/api/vl/mercadopago",{
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'same-origin', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'origin', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(productos) // body data type must match "Content-Type" header
          })
        .then(response=>{
           console.log(response);
           //window.location.replace(response.url);
           return response.json()
            
        })     
        .then(data=>{
            console.log(data);
            window.location.href = data.data;

        })   
        .catch(error=>{
            console.log(error);
        })
    }
    else{
        console.log("comprar "+ id)
    }
}

function eliminar (id){
    if(id== "eliminarTodo"){
        console.log("eliminar todo")
    }
    else{
        console.log("eliminar "+ id)
    }
}
