const productoCategoria = document.querySelector("strong");
//console.log(productoCategoria);

let carritoAgregar = []
//localStorage.clear()
//localStorage.setItem("carrito",JSON.stringify(carrito));
function agregar(id){
    //console.log(productoCategoria.getAttribute("idProducto"));
    fetch("http://localhost:3000/products/api/productos")
    .then(response=>{
    return response.json()
    })
    .then(data=>{
            let producto = data.data.filter(element=>{
                //return element.id == productoCategoria.getAttribute("idProducto");
                return element.id == id
            })
            //console.log(producto);
            let carrito = JSON.parse(localStorage.getItem("carrito"))
           
            if(carrito != null && carrito.length != 0){
                //console.log("carrito.lhent es "+ carrito.length)
                let productoCarrito = carrito.find(element=>{
                    //return element.id == productoCategoria.getAttribute("idProducto");
                    return element.id == id
                })
                console.log(productoCarrito);
            //carrito.forEach(element=>{
             
                /*if(carrito.indexOf(productoCarrito)!= -1 && productoCategoria.getAttribute("idProducto") == element.id){
                    element.quantity = element.quantity + 1
                    element.price = element.unit_price * element.quantity
                    localStorage.setItem("carrito",JSON.stringify(carrito));
                    imprimir()
                    //console.log(`estamos en el if porque ${element.id} == producto.id`);
                }else if(carrito.indexOf(productoCarrito) == -1){ 
                    //console.log("entramos al else de agregar porque los id son diferentes");
                    let cantidad = 1;
                    let precio = producto[0].price * cantidad
                    item = {
                        id: producto[0].id,
                        name: producto[0].name,
                        unit_price : producto[0].price,
                        quantity: cantidad,
                        price : precio,
                        description: producto[0].description,
                        image: producto[0].image
                    }
                    carrito.push(item);
                    localStorage.setItem("carrito",JSON.stringify(carrito))
                    imprimir()

                }*/
                if(carrito.indexOf(productoCarrito) == -1){ 
                    //console.log("entramos al else de agregar porque los id son diferentes");
                    let cantidad = 1;
                    let precio = producto[0].price * cantidad
                    item = {
                        id: producto[0].id,
                        name: producto[0].name,
                        unit_price : producto[0].price,
                        quantity: cantidad,
                        price : precio,
                        description: producto[0].description,
                        image: producto[0].image
                    }
                    carrito.push(item);
                    localStorage.setItem("carrito",JSON.stringify(carrito))
                    imprimir()

                }else{
                    if(carrito.indexOf(productoCarrito)!= -1 && id == productoCarrito.id /*productoCategoria.getAttribute("idProducto") == productoCarrito.id*/){
                        productoCarrito.quantity = productoCarrito.quantity + 1
                        productoCarrito.price = productoCarrito.unit_price * productoCarrito.quantity
                        localStorage.setItem("carrito",JSON.stringify(carrito));
                        imprimir()
                        //console.log(`estamos en el if porque ${element.id} == producto.id`);
                    }
                }
             //})
            }else{
                //console.log("carrito es null y hacemos esto");
                
                let carritoAgregar = []
                let cantidad = 1;
                let precio = producto[0].price * cantidad
                //console.log(producto.price, producto)
                    item = {
                        id: producto[0].id,
                        name: producto[0].name,
                        unit_price : producto[0].price,
                        quantity: cantidad,
                        price : precio,
                        description: producto[0].description,
                        image: producto[0].image
                    }
                    //console.log(item);
                    carritoAgregar.push(item);
                localStorage.setItem("carrito",JSON.stringify(carritoAgregar));
                imprimir()
            }

            
    })
    .catch(error=>{
        console.log(error)
    })

    /*let existe = false;
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
    console.log(localStorage.getItem("carrito"))*/
   
    console.log(localStorage.getItem("carrito"));
    console.log("fin de la funcion");
}








