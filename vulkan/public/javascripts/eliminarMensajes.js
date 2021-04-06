let botonesEliminar = document.querySelectorAll(".botonEliminar")
console.log(botonesEliminar);
botonesEliminar.forEach(element => {
    element.addEventListener("click",capturar)
});

function capturar(event){
    console.log(event.path[2].getAttribute("id"))
    let mensaje = document.querySelector(`#${event.path[2].getAttribute("id")}`);
    mensaje.style.display = "none";
}