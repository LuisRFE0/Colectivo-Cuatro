//VARIABLES Y EVENTOS*******************
const product = document.querySelector('#input-product');
const description = document.querySelector('#input-description');
const image = document.querySelector('#input-image');
const stock = document.querySelector('#input-stock');
const form = document.querySelector('#form');
const mensajeDiv = document.querySelector('.mensaje-alerta');
form.addEventListener('submit', validarform);


//***********************CLASE*************************************//
class ProductsController {
    constructor() {
        this.productsList = [];
    }

    addItem(name, description, image,  stock) {
        const product = {

            "id": new Date().getTime(),
            "name": name,
            "description": description,
            "image": image,
            "stock": stock
        };

        
        if (localStorage.getItem("products")) {
            const nuevoObj =JSON.parse(localStorage.getItem("products"));
            this.productsList = [...nuevoObj];
            this.productsList.push(product);
            localStorage.setItem("products", JSON.stringify(this.productsList));
            console.log(this.productsList);
        }else{
            this.productsList.push(product);
            localStorage.setItem("products", JSON.stringify(this.productsList));
        }
        
    }
}





//*****************************FUNCIONES DE VALIDACION**************************************************** 
function validarform(e) {
    e.preventDefault();
    const productObj = {
        name: product.value,
        description: description.value,
        image: image.value,
        stock: stock.value
    }
    if (validarCampos(productObj)) {

        addProduct(productObj);//SI TODO ESTA CORRECTO AGREGA UN PRODUCTO

    } else {
        return;
    }
}


function validarCampos({ name, description, image, stock }) {

    let validacion;
    if (name === '') {
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







//***************************Funciones para el producto***************************************************** */

const productsController = new ProductsController();
function addProduct({name, description, image, stock}) {
  
    productsController.addItem(name, description, image,  stock);
}





