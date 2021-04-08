let qs = function(element){
	return document.querySelector(element)
}
	
window.addEventListener('load', function(){
	console.log('Vinculado...');

	let $inputCard = qs('#tarjeta'),
	$cardErrors = qs('#tarjetaErrors'),
	$inputVencimiento = qs('#vencimiento'),
	$vencimientoErrors = qs('#vencimientoErrors'),
	$inputCvc = qs('#cvc'),
	$cvcErrors = qs('#cvcErrors'),
    $form = qs('#formularioPago')
    $errores = {};
    
	regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

    $inputCard.addEventListener('blur', function(){

        switch (true) {
            case !$inputCard.value.trim():
                $cardErrors.innerHTML = 'Debe ingresar el numero de la tarjeta'
                $inputCard.classList.add('is-invalid')
                break;
            case $inputCard.value.length != 16:
                $cardErrors.innerHTML = 'Dede ingresar un numero valido.'
                $inputCard.classList.add('is-invalid')   
                break;   
            default:
                $inputCard.classList.remove('is-invalid');
                $inputCard.classList.add('is-valid');
                $cardErrors.innerHTML = ''
                break;
        }
    })
    $inputVencimiento.addEventListener('blur', function(){

        switch (true) {
            case !$inputVencimiento.value.trim():
                $vencimientoErrors.innerHTML = 'Debe ingresar la fecha de vencimiento.'
                $inputVencimiento.classList.add('is-invalid')
                break;/*  buscar validacion de la fecha
            case $inputVencimiento.value.length =3 :
                $vencimientoErrors.innerHTML = 'Dede ingresar un numero valido.'
                $inputVencimiento.classList.add('is-invalid')   
                break; */   
            default:
                $inputVencimiento.classList.remove('is-invalid');
                $inputVencimiento.classList.add('is-valid');
                $vencimientoErrors.innerHTML = ''
                break;
        }
    })
    $inputCvc.addEventListener('blur', function(){

        switch (true) {
            case !$inputCvc.value.trim():
                $cvcErrors.innerHTML = 'Debe ingresar el codigo de seguridad'
                $inputCvc.classList.add('is-invalid')
                break;
            case $inputCvc.value.length != 3:
                $cvcErrors.innerHTML = 'Dede ingresar un numero valido.'
                $inputCvc.classList.add('is-invalid')   
                break;   
            default:
                $inputCvc.classList.remove('is-invalid');
                $inputCvc.classList.add('is-valid');
                $cvcErrors.innerHTML = ''
                break;
        }
    })
    $form.addEventListener('submit',function(event){
        let error = false;
        event.preventDefault()
        //console.log(form.elements)
        let elementosForm = this.elements
        for (let index = 1; index < elementosForm.length-1; index++) {
            console.log(elementosForm[index].value, index);
            if(elementosForm[index].value == ""){
                elementosForm[index].classList.add('is-invalid');
                //$formLoginErrors.innerHTML = "Los campos señalados son obligatorios";
                error = true;
            }
        }

        if(!error){
            console.log('Todo bien');
            $form.submit()
        }
    })

})