class ProductsController {
    
    constructor(currentId = 0) {
        this.items = [];
        this.currentId = currentId;
    }

    addItem(name, description, image, price, stock) {
        const item = {
            "id": getDate(), 
            "name": name,
            "description": description, 
            "image": image,
            "price": price,
            "stock": stock
        };

        this.items.push(item);
    }

    loadItemsFromLocalStorage() {
        const storageItems = localStorage.getItem("items")
        if (storageItems) {
            const items = JSON.parse(storageItems)
            for (var i = 0, size = items.length; i < size; i++) {
                const item = items[i];
                this.items.push(item);
            }
        }
    }

    deleteProduct(id) {
        let index = -1;
        let filteredObj = this.items.find(function(item, i){
            if(item.id === id){
              index = i;
              return index;
            }
          });
          
        this.items.splice(index, 1);
    }

    deleteAllProducts() {
        this.items = [];
        console.log(this.items)
    }

    updateProduct(id, name, description, image, price, stock) {
        let index = -1;
        let filteredObj = this.items.find(function(item, i){
            if(item.id === id){
              index = i;
              return index;
                }
            });

        this.items[index].name = name;
        this.items[index].description = description;
        this.items[index].image = image;
        this.items[index].price = price;
        this.items[index].stock = stock;
        
    }
}

function getDate() {
    return new Date().getTime();
}

/* fetch('../js/productos.json')
.then(response => response.text())
.then(text => console.log(text[0])); */