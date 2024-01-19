const { idUser, token } = JSON.parse(localStorage.getItem('sesion'))
class ProductsController {


    constructor() {
        this.productsList = [];
        this.BASE_URL = "https://colectivo-cuatro.onrender.com/api/v1/products/";

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

        if (response.ok) {
            limpiarCampos();
            imprimmirAlertaHtml('Elemento agregado correctamente', 'succes');
            this.loadItemsFromDatabase();
        } else {
            imprimmirAlertaHtml('No se agrego', 'error');
        }

    }

    updateProduct(id, { name, price, description, stock, image }) {
        const product = {
            "name": name,
            "price": price,
            "description": description,
            "category": 1,
            "stock": stock,
            "urlImage": image

        };


        const requestOptions =
            fetch(this.BASE_URL + `update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`

                }, body: JSON.stringify(product)
            })
                .then(response => {
                    if (response.status == 200) {
                        imprimmirAlertaHtml('Producto actualizado correctamente')
                        limpiarCampos();
                        this.loadItemsFromDatabase();
                    }
                })
                .catch(error => {
                    alertaHtml(error, "error");
                });



        // const productObj = {
        //     id: parseInt(inId.value),
        //     name: product.value,
        //     descriptions: description.value,
        //     images: image.value,
        //     stocks: stock.value
        // }


        // const indiceObjeto = this.productsList.findIndex(objeto => objeto.id === id);

        // this.productsList[indiceObjeto] = { ...this.productsList[indiceObjeto], ...productObj };


        // localStorage.setItem("products", JSON.stringify(this.productsList));
        // limpiarCampos();
        // imprimmirAlertaHtml('Elemento actualizado correctamente', 'succes');
        // btnUpdate.style.display = 'none';

    }

    deleteProduct(id) {
        limpiarHtml2();
        this.loadItemsFromDatabase();

        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        };

        fetch(this.BASE_URL + `deleteProduct/${id}`, requestOptions)
            .then(response => {
                if (response.status == 200) {
                    imprimmirAlertaHtml('Producto eliminado correctamente')
                    limpiarCampos();
                }
            })

            .catch(error => {
                alertaHtml(error, "error");
            });


    }

    getProduct(ID) {
        if (this.productsList.length > 0) {

            if (this.productsList.some(elemento => elemento.id_producto === ID)) {
                const producto = this.productsList.filter(product => product.id_producto == ID);

                const { category, description, id_producto, name, price, stock, urlImage } = producto[0];
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
        this.productsList = [];

        const response = await fetch(url);
        const products = await response.json();

        products.forEach(product => {
            this.productsList.push(product);
        });
    }

}



