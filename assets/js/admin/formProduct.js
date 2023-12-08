//VARIABLES Y EVENTOS*******************
const inId = document.querySelector('#input-id');
const labelId = document.querySelector('.id-hidden');
const product = document.querySelector('#input-product');
const description = document.querySelector('#input-description');
const image = document.querySelector('#input-image');
const stock = document.querySelector('#input-stock');
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


        const indiceObjeto = this.productsList.findIndex(objeto => objeto.id === id);

        this.productsList[indiceObjeto] = { ...this.productsList[indiceObjeto], ...productObj };


        localStorage.setItem("products", JSON.stringify(this.productsList));
        limpiarCampos();
        imprimmirAlertaHtml('Elemento actualizado correctamente', 'succes');
        btnUpdate.style.display = 'none';

    }




    deleteProduct(id) {
        limpiarHtml2();
        //Obtengo los datos de localStorage

        const nuevoObj = localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
        const verificarId = nuevoObj.some(elemento => elemento.id === id);
        const alertaElement = document.createElement('P');



        if (verificarId) {
            const eliminarObj = this.productsList.filter(product => product.id != id);
            localStorage.setItem("products", JSON.stringify(eliminarObj));
            alertaElement.classList.add('bg-success', 'text-white');
            alertaElement.textContent = 'Producto borrado correctamente';
            limpiarCampos();


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


        if (this.productsList.length > 0) {

            if (this.productsList.some(elemento => elemento.id === ID)) {
                const datos = this.productsList.filter(product => product.id == ID);
                const { id, name, descriptions, images, stocks } = datos[0];
                limpiarCampos();
                inId.value = id;
                product.value = name;
                description.value = descriptions;
                image.value = images;
                stock.value = stocks;
                btnUpdate.style.display = 'block';
                btnDelete.style.display = 'block';
                labelId.style.display = 'block';
                inId.style.display = 'block';

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

    loadItemsFromLocalStorage() {
        const storageItems = localStorage.getItem("products")
        if (storageItems) {
            const products = JSON.parse(storageItems)
            for (let i = 0, size = products.length; i < size; i++) {
                const product = products[i];
                this.productsList.push(product);
            }
        }
    }



}


//***************************Funciones para el producto***************************************************** */

const productsController = new ProductsController();
productsController.loadItemsFromLocalStorage();



function addProduct({ name, description, image, stock }) {

    if (!verificarExistenciaProducto(name)) {
        productsController.addItem(name, description, image, stock);
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














