//VARIABLES Y EVENTOS*******************
const inId = document.querySelector('#input-id');
const labelId = document.querySelector('.id-hidden');
const product = document.querySelector('#input-product');
const inputDescription = document.getElementById('input-description');
const image = document.querySelector('#input-image');
const inputStock = document.getElementById('input-stock');
const inputPrice = document.getElementById('input-price');
const inputGetProduct = document.querySelector('#btn-gets-product');
const btnDelete = document.querySelector('#btn-delete-product');
const form = document.querySelector('#btn-create');
const mensajeDiv = document.querySelector('.mensaje-alerta');
const alertaForm = document.querySelector('.alerta-find');
const inputBuscar = document.querySelector('#input-buscar');
const btnUpdate = document.querySelector('#btn-update');

form.addEventListener('click', validarform);
btnDelete.addEventListener('click', eliminarProduct);
inputGetProduct.addEventListener('click', obtenerProducto);
btnUpdate.addEventListener('click', actualizarProduct);

//***************************Funciones para el producto***************************************************** */
const productsController = new ProductsController();
productsController.loadItemsFromDatabase();


function addProduct({ name, description, image, stock, price }) {
    if (!verificarExistenciaProducto(name)) {
        productsController.addItem(name, description, image, stock, price);
    } else {
        imprimmirAlertaHtml('Este producto ya existe', 'error');
        limpiarCampos();
    }
}

function eliminarProduct() {
    const id = parseInt(inId.value);
    productsController.deleteProduct(id);
}

function obtenerProducto() {
    const id = parseInt(inputBuscar.value);
    productsController.getProduct(id)
}

function actualizarProduct() {
    const productObj = {
        name: product.value,
        description: inputDescription.value,
        image: image.value,
        stock: inputStock.value,
        price: inputPrice.value
    }
    const id = parseInt(inId.value);
    if (inId.value == '') {
        imprimmirAlertaHtml('No hay producto para actualizar', 'error')
    } else {
        productsController.updateProduct(id, productObj);
    }
}

function verificarExistenciaProducto(producto) {
    const nuevoObj = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
    return nuevoObj.some(elemento => elemento.name === producto);

}

function limpiarCampos() {
    product.value = '';
    inputDescription.value = ''
    image.value = ''
    inputStock.value = ''
    inputPrice.value = ''
    inputBuscar.value = ''
    inId.value = '';

    btnUpdate.style.display = 'none';
    btnDelete.style.display = 'none';
    labelId.style.display = 'none';
    inId.style.display = 'none';
}

//*****************************FUNCIONES DE VALIDACION**************************************************** 
function validarform(e) {
    e.preventDefault();
    const productObj = {
        name: product.value,
        description: inputDescription.value,
        image: image.value,
        stock: inputStock.value,
        price: inputPrice.value
    }
    if (validarCampos(productObj)) {

        addProduct(productObj);//SI TODO ESTA CORRECTO AGREGA UN PRODUCTO

    } else {
        return;
    }
}


function validarCampos({ name, description, image, stock, price }) {

    let validacion;
    if (name === '') {
        imprimmirAlertaHtml('Favor de llenar producto', 'error');
        validacion = false;
    } else if (inputDescription === '') {
        imprimmirAlertaHtml('Favor de llenar descripción', 'error');
        validacion = false;
    } else if (image === '') {
        imprimmirAlertaHtml('Favor de llenar imagen', 'error');
        validacion = false;
    } else if (inputStock === '') {
        imprimmirAlertaHtml('Favor de llenar la cantidad', 'error');
        validacion = false;
    } else if (price === '') {
        imprimmirAlertaHtml('Favor de llenar el precio', 'error');
    } else {

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

function limpiarHtml2() {

    while (alertaForm.firstChild) {
        alertaForm.removeChild(alertaForm.firstChild)
    }

}














