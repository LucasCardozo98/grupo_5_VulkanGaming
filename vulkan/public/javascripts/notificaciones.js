const noti = document.querySelector("#notificacion");
var carro = getCarro()


function getCarro(){
    const carro = JSON.parse(localStorage.getItem("carrito"));
    return carro;
}

function contar(){
    const carro = getCarro()
    let cantidad = 0;
    if(carro != null){
    carro.forEach(element => {
        cantidad = cantidad + element.quantity
    });}
    else{
        cantidad = 0;
    }
    return cantidad;
}
function imprimir(){
    let cantidad = contar()
    const carro = getCarro()
   
    if(cantidad == 0){
        noti.innerHTML = " "
    }
    else{
       
        noti.innerHTML = cantidad;
    }

}

imprimir()