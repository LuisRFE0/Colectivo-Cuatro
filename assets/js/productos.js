
const productsController = new ProductsController();


function addItemCard(product) {
    const productsContainer = document.querySelector('.products-container');

    const productHTML = `
    <article class="col-6 col-md-4 col-lg-3 card-container">
    <div class="card-product" id="${product.id}">
     <img src="${product.image}" class="card-img-top" alt="...">
     <div class="card-product-body">
         <h5 class="card-product-title">${product.name}</h5>
         <p class="card-product-description">${product.description}</p>
         <span class="card-product-price"><small class="card-sign">$ </small>${product.price}.°°<small class="card-currency"> mxn</small></span>
         <i class="fa-solid fa-cart-plus fa-xl card-add-cart"></i>
     </div>
    </div>

    </article>`
    productsContainer.innerHTML += productHTML;
}

function loadStorageSampleData() {
    if (!localStorage.getItem("products")) {
        const sampleProducts = [
            {
                "id": 1160263,
                "name": "Bolsa Futuro",
                "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quisquam ipsum, cupiditate, at, quaerat nobis debitis error eligendi veniam delectus ad ut. Dolor hic quasi possimus accusamus mollitia, est magni?",
                "image": "../images/products-images/bolsa-futuro.jpg",
                "price": 299,
                "stock": 30
            },
            {
                "id": 461196,
                "name": "Bolsa Willys",
                "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quisquam ipsum, cupiditate, at, quaerat nobis debitis error eligendi veniam delectus ad ut. Dolor hic quasi possimus accusamus mollitia, est magni?",
                "image": "../images/products-images/bolsa-willys.jpg",
                "price": 299,
                "stock": 30
            },
            {
                "id": 35345,
                "name": "Bolsa Horizonte",
                "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quisquam ipsum, cupiditate, at, quaerat nobis debitis error eligendi veniam delectus ad ut. Dolor hic quasi possimus accusamus mollitia, est magni?",
                "image": "../images/products-images/bolsa-horizonte.jpg",
                "price": 299,
                "stock": 30
            },
            {
                "id": 65613153,
                "name": "Playera Antidepresivos",
                "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quisquam ipsum, cupiditate, at, quaerat nobis debitis error eligendi veniam delectus ad ut. Dolor hic quasi possimus accusamus mollitia, est magni?",
                "image": "../images/products-images/playera-antidepresivos-2.jpg",
                "price": 299,
                "stock": 30
            },
            {
                "id": 63513,
                "name": "Playera Benoni",
                "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quisquam ipsum, cupiditate, at, quaerat nobis debitis error eligendi veniam delectus ad ut. Dolor hic quasi possimus accusamus mollitia, est magni?",
                "image": "../images/products-images/playera-benoni-2.jpg",
                "price": 299,
                "stock": 30
            },
            {
                "id": 861352,
                "name": "Playera Boyera" ,
                "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quisquam ipsum, cupiditate, at, quaerat nobis debitis error eligendi veniam delectus ad ut. Dolor hic quasi possimus accusamus mollitia, est magni?",
                "image": "../images/products-images/playera-boyera-2.jpg",
                "price": 299,
                "stock": 30
            },
            {
                "id": 136813,
                "name": "Playera Jacarandas Blanca",
                "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quisquam ipsum, cupiditate, at, quaerat nobis debitis error eligendi veniam delectus ad ut. Dolor hic quasi possimus accusamus mollitia, est magni?",
                "image": "../images/products-images/playera-jacarandas-blanca.jpg",
                "price": 299,
                "stock": 30
            },
            {
                "id": 1384815,
                "name": "Playera Masuku",
                "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quisquam ipsum, cupiditate, at, quaerat nobis debitis error eligendi veniam delectus ad ut. Dolor hic quasi possimus accusamus mollitia, est magni?",
                "image": "../images/products-images/playera-masuku-2.jpg",
                "price": 299,
                "stock": 30
            },
            {
                "id": 63313,
                "name": "Playera Vocho Amarilla",
                "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quisquam ipsum, cupiditate, at, quaerat nobis debitis error eligendi veniam delectus ad ut. Dolor hic quasi possimus accusamus mollitia, est magni?",
                "image": "../images/products-images/playera-vocho-amarilla.jpg",
                "price": 299,
                "stock": 30
            },
            {
                "id": 62638613,
                "name": "Playera Jacarandas Negro",
                "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quisquam ipsum, cupiditate, at, quaerat nobis debitis error eligendi veniam delectus ad ut. Dolor hic quasi possimus accusamus mollitia, est magni?",
                "image": "../images/products-images/playera-jacarandas-negro.jpg",
                "price": 299,
                "stock": 30
            },
            {
                "id": 63313,
                "name": "Playera Vocho Rosa",
                "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quisquam ipsum, cupiditate, at, quaerat nobis debitis error eligendi veniam delectus ad ut. Dolor hic quasi possimus accusamus mollitia, est magni?",
                "image": "../images/products-images/playera-vocho-rosa.jpg",
                "price": 299,
                "stock": 30
            }
            


        ];
        localStorage.setItem("products", JSON.stringify(sampleProducts));
    }
}


async function loadCardsListFromItemsController() {
    for (var i = 0, size = productsController.productsList.length; i < size; i++) {
        const item = productsController.productsList[i];
        addItemCard(item);
    }
    
    const productsContainer = document.querySelector('.products-container');

    productsContainer.innerHTML += `<ul class="list-page">
    <li>1</li>
    <li  class="active">2</li>
    <li>3</li>
    </ul>`
}

function addProduct(name, description, image, price, stock) {
    productsController.addItem(name, description, image, price, stock);
}

function deleteProduct(id) {
    productsController.deleteProduct(id);
}

function updateProduct(id, name, description, image, price, stock) {
    productsController.updateProduct(id, name, description, image, price, stock);
}
function deleteAllProducts() {
    productsController.deleteAllProducts();
}


loadStorageSampleData();
productsController.loadItemsFromLocalStorage();
loadCardsListFromItemsController();

console.log(productsController.productsList)    
//productsController.loadItemsFromJSON(loadCardsListFromItemsController);
addProduct("Bolsa Futuro", "Lorem ipsum,  dolor sit amet consectetur  dolor sit amet consectetur  dolor sit amet consectetur  dolor sit amet consectetur", "../images/products-images/bolsa-futuro.jpg", 299, 52);
//deleteProduct(461196)
//updateProduct(1160263, "Bolsa Futuro 2", "Lorem ipsum, dolor sit amet consectetur", "../images/products-images/bolsa-futuro.jpg", 200, 2);
//deleteAllProducts();
