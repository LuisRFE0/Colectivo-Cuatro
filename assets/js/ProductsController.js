class ProductsController {



    constructor() {
        this.productsList = [];
        this.BASE_URL = "http://localhost:8080/api/v1/products/";
    }

    async addItem(name, description, image, stock, price) {
        const url = this.BASE_URL + "createProduct";

        const product = {
            "name": name,
            "price": price,
            "description": description,
            "category": 1,
            "stock": stock,
            "urlImage": image
           
        };

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        };
    


        const response = await fetch(url, requestOptions);;

        if(response.ok) {
            limpiarCampos();
            imprimmirAlertaHtml('Elemento agregado correctamente', 'succes');
        } else {
            imprimmirAlertaHtml('No se agrego', 'error');
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

            if (this.productsList.some(elemento => elemento.id_producto === ID)) {
                const producto = this.productsList.filter(product => product.id_producto == ID);
               
                const {category, description, id_producto, name, price, stock, urlImage } = producto[0];
                limpiarCampos();
                inId.value = id_producto;
                product.value = name;
                inputDescription.value = description;
                image.value = urlImage;
                inputStock.value = stock;
                inputPrice.value = price + "";

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

    async loadItemsFromDatabase() {
        const url = this.BASE_URL + "getProducts";


        const response = await fetch(url);
        const products = await response.json();

        products.forEach(product => {
            this.productsList.push(product);
        });
    }

}

/*     loadItemsFromLocalStorage() {
        const storageItems = localStorage.getItem("products")
        if (storageItems) {
            const products = JSON.parse(storageItems)
            for (let i = 0, size = products.length; i < size; i++) {
                const product = products[i];
                this.productsList.push(product);
            }
        }
    } */