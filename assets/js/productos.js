
const productsController = new ProductsController(0);


function addItemCard(item) {
    const productsContainer = document.querySelector('.products-container');
    productsContainer.innerHTML += "<br><br>" + JSON.stringify(item);
}

function loadStorageSampleData() {
    if (!localStorage.getItem("items")) {
        const sampleItems = [
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
                "name": "Bolsa Futuro",
                "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quisquam ipsum, cupiditate, at, quaerat nobis debitis error eligendi veniam delectus ad ut. Dolor hic quasi possimus accusamus mollitia, est magni?",
                "image": "../images/products-images/bolsa-futuro.jpg",
                "price": 299,
                "stock": 30
            },
            {
                "id": 35345,
                "name": "Bolsa Futuro",
                "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quisquam ipsum, cupiditate, at, quaerat nobis debitis error eligendi veniam delectus ad ut. Dolor hic quasi possimus accusamus mollitia, est magni?",
                "image": "../images/products-images/bolsa-futuro.jpg",
                "price": 299,
                "stock": 30
            },
            {
                "id": 65613153,
                "name": "Bolsa Futuro",
                "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quisquam ipsum, cupiditate, at, quaerat nobis debitis error eligendi veniam delectus ad ut. Dolor hic quasi possimus accusamus mollitia, est magni?",
                "image": "../images/products-images/bolsa-futuro.jpg",
                "price": 299,
                "stock": 30
            },
            {
                "id": 63513,
                "name": "Bolsa Futuro",
                "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quisquam ipsum, cupiditate, at, quaerat nobis debitis error eligendi veniam delectus ad ut. Dolor hic quasi possimus accusamus mollitia, est magni?",
                "image": "../images/products-images/bolsa-futuro.jpg",
                "price": 299,
                "stock": 30
            },
            {
                "id": 861352,
                "name": "Bolsa Futuro",
                "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quisquam ipsum, cupiditate, at, quaerat nobis debitis error eligendi veniam delectus ad ut. Dolor hic quasi possimus accusamus mollitia, est magni?",
                "image": "../images/products-images/bolsa-futuro.jpg",
                "price": 299,
                "stock": 30
            },
            {
                "id": 136813,
                "name": "Bolsa Futuro",
                "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quisquam ipsum, cupiditate, at, quaerat nobis debitis error eligendi veniam delectus ad ut. Dolor hic quasi possimus accusamus mollitia, est magni?",
                "image": "../images/products-images/bolsa-futuro.jpg",
                "price": 299,
                "stock": 30
            },
            {
                "id": 1384815,
                "name": "Bolsa Futuro",
                "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quisquam ipsum, cupiditate, at, quaerat nobis debitis error eligendi veniam delectus ad ut. Dolor hic quasi possimus accusamus mollitia, est magni?",
                "image": "../images/products-images/bolsa-futuro.jpg",
                "price": 299,
                "stock": 30
            },
            {
                "id": 63313,
                "name": "Bolsa Futuro",
                "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quisquam ipsum, cupiditate, at, quaerat nobis debitis error eligendi veniam delectus ad ut. Dolor hic quasi possimus accusamus mollitia, est magni?",
                "image": "../images/products-images/bolsa-futuro.jpg",
                "price": 299,
                "stock": 30
            },
            {
                "id": 62638613,
                "name": "Bolsa Futuro",
                "description": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quisquam ipsum, cupiditate, at, quaerat nobis debitis error eligendi veniam delectus ad ut. Dolor hic quasi possimus accusamus mollitia, est magni?",
                "image": "../images/products-images/bolsa-futuro.jpg",
                "price": 299,
                "stock": 30
            }


        ];
        localStorage.setItem("items", JSON.stringify(sampleItems));
    }
}


function loadCardsListFromItemsController() {
    for (var i = 0, size = productsController.items.length; i < size; i++) {
        const item = productsController.items[i];
        addItemCard(item);
    }
}

function addProduct(name, description, image, price, stock) {
    productsController.addItem(name, description, image, price, stock);
    console.log(productsController.items);
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
addProduct("Bolsa Futuro", "Lorem ipsum, dolor sit amet consectetur", "../images/products-images/bolsa-futuro.jpg", 299, 52);
deleteProduct(461196);
updateProduct(1160263, "Bolsa Futuro 2", "Lorem ipsum, dolor sit amet consectetur", "../images/products-images/bolsa-futuro.jpg", 200, 2);
deleteAllProducts();