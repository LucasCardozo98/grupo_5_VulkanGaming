window.addEventListener("load",()=>{
    let username = document.querySelector("#username");
    let usernameErrors = document.querySelector("#usernameErrors");
    let nombre = document.querySelector("#nombre");
    let nombreErrors = document.querySelector("#nombreErrors");
    let apellido = document.querySelector("#apellido");
    let apellidoErrors = document.querySelector("#apellidoErrors");
    let direccion = document.querySelector("#direccion");
    let direccionErrors = document.querySelector("#direccionErrors");
    let foto = document.querySelector("#img-preview");
    let fotoErrors = document.querySelector("#fotoErrors");
    let form = document.querySelector("#formularioUsuario");
    let submitErrors = document.querySelector("#submitErrors");
    let boton = document.querySelector("#ver");
    let regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/;
    let regExDNI = /^[0-9]{7,8}$/;
    let regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    let regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

    console.log(ver.value);
    username.addEventListener('blur', function(){
        console.log(username.value.trim())
        switch (true) {
            case !username.value.trim():
                usernameErrors.innerHTML = 'El campo username es obligatorio'
                username.classList.add('is-invalid')
                break;
            default:
                username.classList.remove('is-invalid');
                username.classList.add('is-valid');
                usernameErrors.innerHTML = ''
                break;
        }
    })

    nombre.addEventListener('blur', function(){
        console.log(nombre.value.trim())
        switch (true) {
            case !nombre.value.trim():
                nombreErrors.innerHTML = 'El campo nombre es obligatorio'
                nombre.classList.add('is-invalid')
                break;
            case !regExAlpha.test(nombre.value):
                nombreErrors.innerHTML = 'Debes ingresar un nombre válido'
                nombre.classList.add('is-invalid')  
                break;
            case nombre.value.length < 2:
                nombreErrors.innerHTML = 'El nombre debe contener al menos 2 caracteres'
                nombre.classList.add('is-invalid')  
                break;         
            default:
                nombre.classList.remove('is-invalid');
                nombre.classList.add('is-valid');
                nombreErrors.innerHTML = ''
                break;
        }
    })

    apellido.addEventListener('blur', function(){
        console.log(apellido.value.trim())
        switch (true) {
            case !apellido.value.trim():
                apellidoErrors.innerHTML = 'El campo apellido es obligatorio'
                apellido.classList.add('is-invalid')
                break;
            case !regExAlpha.test(apellido.value):
                apellidoErrors.innerHTML = 'Debes ingresar un apellido válido'
                apellido.classList.add('is-invalid')  
                break;    
            default:
                apellido.classList.remove('is-invalid');
                apellido.classList.add('is-valid');
                apellidoErrors.innerHTML = ''
                break;
        }
    })

    direccion.addEventListener('blur', function(){
        console.log(direccion.value.trim())
        switch (true) {
            case !direccion.value.trim():
                direccionErrors.innerHTML = 'El campo dirección es obligatorio'
                direccion.classList.add('is-invalid')
                break;   
            default:
                direccion.classList.remove('is-invalid');
                direccion.classList.add('is-valid');
                direccionErrors.innerHTML = ''
                break;
        }
    })

    form.addEventListener('submit',function(event){
        let error = false;
        event.preventDefault()
        //console.log(form.elements)
        let elementosForm = this.elements
        console.log(foto);
        for (let index = 1; index < elementosForm.length-2; index++) {
            console.log(elementosForm[index].value, index);
            if(elementosForm[index].value == ""){
                elementosForm[index].classList.add('is-invalid');
                submitErrors.innerHTML = "Los campos señalados son obligatorios";
                error = true;
            }
        }

        if(!error){
            console.log('Todo bien');
            form.submit()
        }
    })
    
    foto.addEventListener('change', 
    function fileValidation(){
        let filePath = foto.value, //Capturo el valor del input
            allowefExtensions = /(.jpg|.jpeg|.png|.gif|.web)$/i //Extensiones permitidas
        if(!allowefExtensions.exec(filePath)){ //El método exec() ejecuta una busqueda sobre las coincidencias de una expresión regular en una cadena especifica. Devuelve el resultado como array, o null.
            fotoErrors.innerHTML = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)';
            foto.value = '';
            $imgPreview.innerHTML = '';
            return false;
        }else{
            // Image preview
            console.log(foto.files);
            if(foto.files && $file.files[0]){
                let reader = new FileReader();
                reader.onload = function(e){
                    $imgPreview.innerHTML = '<img src="' + e.target.result +'"/>';
                };
                reader.readAsDataURL(foto.files[0]);
                fotoErrors.innerHTML = '';
                foto.classList.remove('is-invalid')
            }
        }
    })
   
})