document.addEventListener('DOMContentLoaded', () => {


    const product = document.querySelector('#input-product');
    const description = document.querySelector('#input-description');
    const image = document.querySelector('#input-image');
    const stock = document.querySelector('#input-stock');
    const form = document.querySelector('#form');
    const mensajeDiv = document.querySelector('.mensaje-alerta');

    form.addEventListener('submit', validarform);


    function validarform(e) {
        e.preventDefault();
        const productObj = {
            product: product.value,
            description: description.value,
            image: image.value,
            stock: stock.value
        }
        if (validarCampos(productObj)) {
            console.log('Correcto');
        } else {
            return;
        }
    }


    function validarCampos({ product, description, image, stock }) {

        let validacion;
        if (product === '') {
            imprimmirAlertaHtml('Favor de llenar producto', 'error');
            validacion = false;
        } else if (description === '') {
            imprimmirAlertaHtml('Favor de llenar descripción', 'error');
            validacion = false;
        } else if (image === '') {
            imprimmirAlertaHtml('Favor de llenar imagen', 'error');
            validacion = false;
        } else if (stock === '') {
            imprimmirAlertaHtml('Favor de llenar la cantidad', 'error');
            validacion = false;
        } else {
            imprimmirAlertaHtml('Elemento agregado correctamente', 'succes');
            validacion = true;
        }
        return validacion;
    }


    function imprimmirAlertaHtml(mensaje, estado) {

        limpiarHtml();
        const alerta = document.createElement('P');
        alerta.classList.add('text-white')

        if (estado === 'error') {
            alerta.classList.add('bg-danger');
        } else {
            alerta.classList.add('bg-success');
        }
        alerta.style.width = '400px';
        alerta.textContent = mensaje;

        mensajeDiv.appendChild(alerta);

        setTimeout(() => {
            alerta.remove();
        }, 3000);


    }


    function limpiarHtml() {

        while (mensajeDiv.firstChild) {
            mensajeDiv.removeChild(mensajeDiv.firstChild)
        }

    }

});