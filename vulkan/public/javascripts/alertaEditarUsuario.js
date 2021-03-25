function editarUsuario (evento, formulario){
    evento.preventDefault()

    Swal.fire({
        title: 'Vas a editar tu cuenta',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Editar'
      }).then((result) => {
        if (result.isConfirmed) {
            formulario.submit()
            Swal.fire(
                'Tu cuenta fue editada',
                'success'
          )
        }
      })
}