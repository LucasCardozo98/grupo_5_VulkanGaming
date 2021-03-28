
localStorage.removeItem("sesion");
const formulario = document.querySelector("#formulario")


function iniciarSesion(event,formulario){
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");
    const check = document.querySelector("#chequeado");
    const data = {email: email.value, password: password.value}
    event.preventDefault()
    console.log("iniciando sesion");
    fetch("http://localhost:3000/users/api/sesion",{
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
        console.log(data)
    })
    .catch(error=>{
        console.log(error);
    })
    vaciar(localStorage.getItem("idCompra"))
    window.location.reload()
    
}

function vaciar(id){
    let carrito = JSON.parse(localStorage.getItem("carrito"))
    let nuevoCarrito = carrito.filter(element=>{
        return element.id != id
    })
    localStorage.setItem("carrito",JSON.stringify(nuevoCarrito));
    localStorage.removeItem("idCompra");
}