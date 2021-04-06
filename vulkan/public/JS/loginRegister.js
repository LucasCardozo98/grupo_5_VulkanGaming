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
	$emailRegisterErrors = qs('#emailRegisterErrors'),
	$inputPasswordRegister = qs('#inputPasswordRegister'),
	$passwordRegisterErrors = qs('#passwordRegisterErrors'),
	$inputPasswordRegisterConfirm = qs('#inputPasswordRegisterConfirm'),
	$passwordRegisterConfirmErrors = qs('#passwordRegisterConfirmErrors'),
    $formRegister = qs('#formRegister'),
    $formLogin = qs("#formLogin"),
    $formLoginErrors = qs("#formLoginErrors"),
    $errores = {},
    
	regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
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

    
	$inputEmailRegister.addEventListener('blur', function() {
        let existe = 0;
        console.log(existe + "  etapa de generacion");
        //console.log($inputEmailRegister.value)
        fetch("http://localhost:3000/users/api/usuarios")
    .then(response=>{
    return response.json()
    })
    .then(data=>{
       
        data.mails.forEach(element => {
            if (element == $inputEmailRegister.value.trim()) {
                console.log("si son iguales")
                existe = 1; 
                console.log(existe + " etapa de cambio");
                //console.log($inputEmailRegister.value);
            }
        });
   
        switch (true) {
            case !$inputEmailRegister.value.trim():
                $emailRegisterErrors.innerHTML = 'El campo email es obligatorio';
                $inputEmailRegister.classList.add('is-invalid');
                break;
            case !regExEmail.test($inputEmailRegister.value):
                $emailRegisterErrors.innerHTML = 'Debe ingresar un email válido';
                $inputEmailRegister.classList.add('is-invalid');
                break;
            case existe == 1:
                $emailRegisterErrors.innerHTML = 'El email ya esta registrado perro';
                $inputEmailRegister.classList.add('is-invalid');
                break;
            default:
                $inputEmailRegister.classList.remove('is-invalid');
                $inputEmailRegister.classList.add('is-valid');
                $emailRegisterErrors.innerHTML = ''
                break;
        }
        console.log(existe + " etapa final");

    })
    .catch(error=>{
        console.log(error);
    })

    })

	$inputPasswordRegister.addEventListener('blur', function() {
        switch (true) {
            case !$inputPasswordRegister.value.trim():
                $passwordRegisterErrors.innerHTML = 'El campo contraseña es obligatorio';
                $inputPasswordRegister.classList.add('is-invalid')
                break;
            case !regExPass.test($inputPasswordRegister.value):
                $passwordRegisterErrors.innerHTML = 'La contraseña debe tener: entre 6 o 12 caracteres, al menos una mayúscula, una minúscula y un número';
                $inputPasswordRegister.classList.add('is-invalid')
                break
            default:
                $inputPasswordRegister.classList.remove('is-invalid');
                $inputPasswordRegister.classList.add('is-valid');
                $passwordRegisterErrors.innerHTML = ''
                break;
        }
    })

	$inputPasswordRegisterConfirm.addEventListener('blur', function() {
        switch (true) {
            case !$inputPasswordRegisterConfirm.value.trim():
                $passwordRegisterConfirmErrors.innerHTML = 'El campo contraseña es obligatorio';
                $inputPasswordRegisterConfirm.classList.add('is-invalid')
                break;
            case $inputPasswordRegister.value != $inputPasswordRegisterConfirm.value :
				$passwordRegisterConfirmErrors.innerHTML = 'Las contras no coinciden';
				$inputPasswordRegisterConfirm.classList.add('is-invalid')
                break;
            default:
                $inputPasswordRegisterConfirm.classList.remove('is-invalid');
                $inputPasswordRegisterConfirm.classList.add('is-valid');
                $passwordRegisterConfirmErrors.innerHTML = ''
                break;
        }
    })

    $formLogin.addEventListener('submit',function(event){
        let error = false;
        event.preventDefault()
        //console.log(form.elements)
        let elementosForm = this.elements
        for (let index = 0; index < elementosForm.length-2; index++) {
            console.log(elementosForm[index].value, index);
            if(elementosForm[index].value == ""){
                elementosForm[index].classList.add('is-invalid');
                $formLoginErrors.innerHTML = "Los campos señalados son obligatorios";
                error = true;
            }
        }

        if(!error){
            console.log('Todo bien');
            $formLogin.submit()
        }
    })

    $formRegister.addEventListener('submit',function(event){
        let error = false;
        event.preventDefault()
        //console.log(form.elements)
        let elementosForm = this.elements
        for (let index = 2; index < elementosForm.length-1; index++) {
            console.log(elementosForm[index].value, index);
            if(elementosForm[index].value == ""){
                elementosForm[index].classList.add('is-invalid');
                //submitErrors.innerHTML = "Los campos señalados son obligatorios";
                error = true;
            }
        }

        if(!error){
            console.log('Todo bien');
            $formRegister.submit()
        }
    })
})

