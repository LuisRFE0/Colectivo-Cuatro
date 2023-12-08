class ProductsController {

    constructor() {
        this.productsList = [];
    }

    addItem(name, description, image, price, stock) {
        const product = {

            "id": getDate(),
            "name": name,
            "description": description,
            "image": image,
            "price": price,
            "stock": stock
        };

        this.productsList.push(product);

        localStorage.setItem("products", JSON.stringify(this.productsList));
    }

    // async loadItemsFromJSON(callback) {
    //     try {
    //         const response = await fetch('../js/productos.json');
    //         const products =  await response.json();

    //         for (var i = 0, size = products.length; i < size; i++) {
    //             const product = products[i];
    //             console.log(JSON.parse(product));
    //             this.items.push(product);
    //         }
    //     } catch(error) {
    //         console.log(error);
    //     }
    //     callback();
    // }

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

    deleteProduct(id) {
        let index = -1;

        let filteredObj = this.productsList.find(function (product, i) {
            if (product.id === id) {
                index = i;
                return index;  // Regresa -1 si no encuentra el producto con el id
            }
        });

        this.productsList.splice(index, 1);
    }

    deleteAllProducts() {
        this.productsList = [];
        console.log(this.productsList)
    }

    updateProduct(id, name, description, image, price, stock) {
        let index = -1;
        let filteredObj = this.productsList.find(function (product, i) {
            if (product.id === id) {
                index = i;
                return index;
            }
        });

        this.producstList[index].name = name;
        this.producstList[index].description = description;
        this.producstList[index].image = image;
        this.producstList[index].price = price;
        this.producstList[index].stock = stock;


        localStorage.setItem("products", JSON.stringify(this.productsList));
    }
}



function getDate() {
    return new Date().getTime(); s
}
