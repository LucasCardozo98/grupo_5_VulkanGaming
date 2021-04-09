let botonesEliminar = document.querySelectorAll(".eliminar");

botonesEliminar.forEach(element=>{
  element.addEventListener("click",confirmar);

})

function agarrar(event){
  console.log(event.target.attributes.id.value)
  event.preventDefault()
}
function confirmar (evento){
    evento.preventDefault()
    const formulario = document.querySelector(`#eliminar${event.target.attributes.id.value}`)
    console.log(formulario.getAttribute("action"));
    Swal.fire({
        title: 'Vas a borrar un producto',
        text: "No podes revertir esta acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
            formulario.submit()
            Swal.fire(
                'Borrado!',
                'El producto fue eliminado',
                'success'
          )
        }
      })
}