
console.log("hola")
function evitar(event,formulario,busqueda){
   
   event.preventDefault()
   
    console.log(event)
    console.log(busqueda.value)
    if(busqueda.value == ""){
        event.preventDefault()
    }else{
        formulario.submit()
    }
}