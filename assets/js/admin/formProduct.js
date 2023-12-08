//VARIABLES Y EVENTOS*******************
const inId = document.querySelector('#input-id');
const product = document.querySelector('#input-product');
const description = document.querySelector('#input-description');
const image = document.querySelector('#input-image');
const stock = document.querySelector('#input-stock');
const inputGetProduct = document.querySelector('#btn-gets-product');
const btnDelete = document.querySelector('#btn-delete-product');
const form = document.querySelector('#form');
const mensajeDiv = document.querySelector('.mensaje-alerta');
const alertaForm = document.querySelector('.alerta-find');
const inputBuscar = document.querySelector('#input-buscar');
const btnUpdate = document.querySelector('#btn-update');

form.addEventListener('submit', validarform);
btnDelete.addEventListener('click', eliminarProduct);
inputGetProduct.addEventListener('click', obtenerProducto);
btnUpdate.addEventListener('click', actualizarProduct);


//***********************CLASE*************************************//
class ProductsController {
    constructor() {
        this.productsList = [];
    }




    addItem(name, description, image, stock) {
        const product = {

            "id": new Date().getTime(),
            "name": name,
            "descriptions": description,
            "images": image,
            "stocks": stock
        };


        if (localStorage.getItem("products")) {
            const nuevoObj = JSON.parse(localStorage.getItem("products"));
            this.productsList = [...nuevoObj];
            this.productsList.push(product);
            localStorage.setItem("products", JSON.stringify(this.productsList));
            limpiarCampos();
            imprimmirAlertaHtml('Elemento agregado correctamente', 'succes');
        } else {
            this.productsList.push(product);
            localStorage.setItem("products", JSON.stringify(this.productsList));
        }

    }


    updateProduct(id) {
        const productObj = {
            id: parseInt(inId.value),
            name: product.value,
            descriptions: description.value,
            images: image.value,
            stocks: stock.value
        }

        const nuevoObj = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
        //obtener indice del obj
        const indiceObjeto = nuevoObj.findIndex(objeto => objeto.id === id);

        nuevoObj[indiceObjeto] = { ...nuevoObj[indiceObjeto], ...productObj };
        console.log(nuevoObj);

        localStorage.setItem("products", JSON.stringify(nuevoObj));
        limpiarCampos();
        imprimmirAlertaHtml('Elemento actualizado correctamente', 'succes');

    }




    deleteProduct(id) {
        limpiarHtml2();
        const nuevoObj = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
        const verificarId = nuevoObj.some(elemento => elemento.id === id);
        const alertaElement = document.createElement('P');

        if (verificarId) {
            const eliminarObj = nuevoObj.filter(product => product.id != id);
            localStorage.setItem("products", JSON.stringify(eliminarObj));
            alertaElement.classList.add('bg-success', 'text-white');
            alertaElement.textContent = 'Producto borrado correctamente';
        } else {
            alertaElement.classList.add('bg-danger', 'text-white');
            alertaElement.textContent = 'No existe el producto';
        }
        alertaForm.appendChild(alertaElement);

        setTimeout(() => {
            alertaElement.remove();
        }, 3000);

    }


    getProduct(ID) {
        const nuevoObj = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
        if (nuevoObj.length > 0) {

            if (nuevoObj.some(elemento => elemento.id === ID)) {
                const datos = nuevoObj.filter(product => product.id == ID);
                const { id, name, descriptions, images, stocks } = datos[0];
                limpiarCampos();
                inId.value = id;
                product.value = name;
                description.value = descriptions;
                image.value = images;
                stock.value = stocks;

            } else {
                limpiarHtml2();
                const alertaElement = document.createElement('P');
                alertaElement.classList.add('bg-danger', 'text-white');
                alertaElement.textContent = 'No existe el id del producto';
                alertaForm.appendChild(alertaElement);

                setTimeout(() => {
                    alertaElement.remove();
                }, 3000);
            }

        } else {
            console.log('No hay productos');
        }




    }




}



//***************************Funciones para el producto***************************************************** */

const productsController = new ProductsController();
function addProduct({ name, description, image, stock }) {

    if (!verificarExistenciaProducto(name)) {

        productsController.addItem(name, description, image, stock);
    } else {
        imprimmirAlertaHtml('Este producto ya existe', 'error');
        limpiarCampos();
    }


}



function eliminarProduct() {
    const id = parseInt(inputBuscar.value);
    productsController.deleteProduct(id);
}


function obtenerProducto() {
    const id = parseInt(inputBuscar.value);
    productsController.getProduct(id)
}

function actualizarProduct() {
    const id = parseInt(inId.value);
    if (inId.value == '') {
        imprimmirAlertaHtml('No hay producto para actualizar', 'error')
    } else {
        productsController.updateProduct(id);
    }


}

function verificarExistenciaProducto(producto) {
    const nuevoObj = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
    return nuevoObj.some(elemento => elemento.name === producto);

}


function limpiarCampos() {
    product.value = '';
    description.value = ''
    image.value = ''
    stock.value = ''
    inputBuscar.value = ''
    inId.value = '';
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














