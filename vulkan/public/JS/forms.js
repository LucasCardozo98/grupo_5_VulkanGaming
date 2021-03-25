let qs = function(element){
	return document.querySelector(element)
}
	
window.addEventListener('load', function(){
	console.log('Vinculado');

	let $inputEmail = qs('#email'),
	$emailErrors = qs('#emailErrors'),
	$inputPassword = qs('#password'),
	$passwordErrors = qs('#passwordErrors'),
	$inputEmailRegister = qs('#emailRegister'),
	$EmailRegisterErrors = qs('#emailRegisterErrors'),
	$inputPasswordRegister = qs('#InputPasswordRegister'),
	$PasswordRegisterErrors = qs('#PasswordRegisterErrors'),
	$InputPasswordRegisterConfirm = qs('#InputPasswordRegisterConfirm'),
	$PasswordRegisterConfirmErrors = qs('#PasswordRegisterConfirmErrors'),
    $errores = {},
	$regExAlpha = /^[a-zA-Z]+$/i

	$inputEmail.addEventListener('blur', function(){

	switch (true) {
		case !$inputEmail.value.trim():
			$emailErrors.innerHTML = 'El campo email es obligatorio'
			$inputEmail.classList.add('is-invalid')
			break;
			
		default:
			break;
	}
})	
})

