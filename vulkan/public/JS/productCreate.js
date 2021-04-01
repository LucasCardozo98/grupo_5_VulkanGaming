let qs = function(elemento){
    return document.querySelector(elemento)
}

window.addEventListener('load', function(){

    console.log('Vinculado')

    let $inputName = qs('#inputName'),
    $nameErrors = qs('#nameErrors'),
    $stock = qs("#stock"),
    $stockErrors= qs("#stockErrors"),
    $price = qs("#price"),
    $priceErrors = qs("#priceErrors"),
    $description = qs('#description'),
    $descriptionErrors = qs('#descriptionErrors'),
    $form = qs('#form'),
    $file = qs('#formFileSm'),
    $fileErrors = qs('#formFileErrors'),
    $imgPreview = qs('#img-preview')
    regExAlpha = /^[a-zA-Z\sñáéíóúü ]*$/,
    regExDNI = /^[0-9]{7,8}$/,
    regExEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
    regExPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/;

    $inputName.addEventListener('blur', function(){

        switch (true) {
            case !$inputName.value.trim():
                $nameErrors.innerHTML = 'El campo nombre es obligatorio'
                $inputName.classList.add('is-invalid')
                break;
            case $inputName.value.length < 5:
                $nameErrors.innerHTML = 'El nombre debe contener al menos 5 caracteres'
                $inputName.classList.add('is-invalid')   
                break;   
            default:
                $inputName.classList.remove('is-invalid');
                $inputName.classList.add('is-valid');
                $nameErrors.innerHTML = ''
                break;
        }
    })

    $stock.addEventListener('blur', function(){

        switch (true) {
            case $stock.value < 0:
                $stockErrors.innerHTML = 'El stock no puede ser menor a cero'
                $stock.classList.add('is-invalid')
                break;   
            default:
                $stock.classList.remove('is-invalid');
                $stock.classList.add('is-valid');
                $stockErrors.innerHTML = ''
                break;
        }
    })

    $price.addEventListener('blur', function(){

        switch (true) {
            case $price.value < 1:
                $priceErrors.innerHTML = 'El precio no puede ser menor a cero'
                $price.classList.add('is-invalid')
                break;   
            default:
                $price.classList.remove('is-invalid');
                $price.classList.add('is-valid');
                $spriceErrors.innerHTML = ''
                break;
        }
    })

    $description.addEventListener('blur', function(){

        switch (true) {
            case !$description.value.trim():
                $descriptionErrors.innerHTML = 'El campo nombre es obligatorio'
                $description.classList.add('is-invalid')
                break;
            case $description.value.length < 20:
                $descriptionErrors.innerHTML = 'El nombre debe contener al menos 20 caracteres'
                $description.classList.add('is-invalid')   
                break;   
            default:
                $description.classList.remove('is-invalid');
                $description.classList.add('is-valid');
                $descriptionErrors.innerHTML = ''
                break;
        }
    })

    $file.addEventListener('change', 
    function fileValidation(){
        let filePath = $file.value, 
            allowefExtensions = /(.jpg|.jpeg|.png|.gif)$/i 
        if(!allowefExtensions.exec(filePath)){
            $fileErrors.innerHTML = 'Carga un archivo de imagen válido, con las extensiones (.jpg - .jpeg - .png - .gif)';
            $file.value = '';
            $imgPreview.innerHTML = '';
            return false;
        }else{
            console.log($file.files);
            if($file.files && $file.files[0]){
                let reader = new FileReader();
                reader.onload = function(e){
                    $imgPreview.innerHTML = '<img src="' + e.target.result +'"/>';
                };
                reader.readAsDataURL($file.files[0]);
                $fileErrors.innerHTML = '';
                $file.classList.remove('is-invalid')
            }
        }
    })
})
