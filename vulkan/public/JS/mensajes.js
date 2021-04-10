let qs = function(element){
	return document.querySelector(element)
}
	
window.addEventListener('load', function(){
	console.log('Vinculado');

	let $inputMensajes = qs('#mensajes'),
	$mensajesErrors = qs('#mensajesErrors'),
    $errores = {},
    
	regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;


	$inputMensajes.addEventListener('blur', function() {
        switch (true) {
            case !$inputMensajes.value.optForm == 'hola':
                $mensajesErrors.innerHTML = 'El campo email es obligatorio';
                $inputMensajes.classList.add('is-invalid')
                break;
            default:
                $inputMensajes.classList.remove('is-invalid');
                $inputMensajes.classList.add('is-valid');
                $mensajesErrors.innerHTML = ''
                break;
        }
    })
})
