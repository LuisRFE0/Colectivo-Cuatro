class ProductsController {
    constructor() {
        this.productsList = [];
    }

    addItem(name, description, image, stock, price) {
        const product = {

            "id": new Date().getTime(),
            "name": name,
            "descriptions": description,
            "images": image,
            "stocks": stock,
            price
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
            this.productsList = [];
            localStorage.setItem("products", JSON.stringify(eliminarObj));
            this.productsList = JSON.parse(localStorage.getItem('products'));
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