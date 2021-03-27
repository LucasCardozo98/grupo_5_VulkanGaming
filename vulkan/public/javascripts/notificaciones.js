const notificacion = document.querySelector("#notificacion");

function getCarro(){
    const carro = JSON.parse(localStorage.getItem("carrito"));
    return carro;
}

function contar(){
    const carro = getCarro()
    let cantidad = 0;
    carro.forEach(element => {
        cantidad = cantidad + element.quantity
    });
    return cantidad;
}
function imprimir(){
    let cantidad = contar()
    const carro = getCarro()
   
    if(cantidad == 0){
        notificacion.innerHTML = " "
    }
    else{
       
        notificacion.innerHTML = cantidad;
    }

}

imprimir()