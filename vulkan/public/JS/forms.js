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
	regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
    regExDNI = /^[0-9]{7,8}$/,
    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

	$inputEmail.addEventListener('blur', function() {
        switch (true) {
            case !$inputEmail.value.trim():
                $emailErrors.innerHTML = 'El campo email es obligatorio';
                $inputEmail.classList.add('is-invalid')
                break;
            case !regExEmail.test($inputEmail.value):
                $emailErrors.innerHTML = 'Debe ingresar un email válido';
                $inputEmail.classList.add('is-invalid')
                break
            default:
                $inputEmail.classList.remove('is-invalid');
                $inputEmail.classList.add('is-valid');
                $emailErrors.innerHTML = ''
                break;
        }
    })

	$inputPassword.addEventListener('blur', function() {
        switch (true) {
            case !$inputPassword.value.trim():
                $passwordErrors.innerHTML = 'El campo contraseña es obligatorio';
                $inputPassword.classList.add('is-invalid')
                break;
            case !regExPass.test($inputPassword.value):
                $passwordErrors.innerHTML = 'La contraseña debe tener: entre 6 o 12 caracteres, al menos una mayúscula, una minúscula y un número';
                $inputPassword.classList.add('is-invalid')
                break
            default:
                $inputPassword.classList.remove('is-invalid');
                $inputPassword.classList.add('is-valid');
                $passwordErrors.innerHTML = ''
                break;
        }
    })
})

