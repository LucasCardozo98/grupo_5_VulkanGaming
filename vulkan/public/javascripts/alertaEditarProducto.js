function editarProducto (evento, formulario){
    evento.preventDefault()

    Swal.fire({
        title: 'Vas editar este producto',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Editar'
      }).then((result) => {
        if (result.isConfirmed) {
            formulario.submit()
            Swal.fire(
                
                'El producto fue editado',
                'success'
          )
        }
      })
}