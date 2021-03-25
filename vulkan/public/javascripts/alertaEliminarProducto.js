function confirmar (evento, formulario){
    evento.preventDefault()

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