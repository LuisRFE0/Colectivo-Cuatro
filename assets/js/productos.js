

const productsController = new ProductsController();


function addItemCard(product) {
    const productsContainer = document.querySelector('.products-container');

    const productHTML = `
    <article class="col-6 col-md-4 col-lg-3 card-container">
    <div class="card-product" id="${product.id}">
     <img src="${product.images}" class="card-img-top" alt="...">
     <div class="card-product-body">
         <h5 class="card-product-title">${product.name}</h5>
         <p class="card-product-description">${product.descriptions}</p>
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
                "id": 461196,
                "name": "Bolsa Willys",
                "descriptions": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quisquam ipsum, cupiditate, at, quaerat nobis debitis error eligendi veniam delectus ad ut. Dolor hic quasi possimus accusamus mollitia, est magni?",
                "images": "../images/products-images/bolsa-willys.jpg",
                "price": 299,
                "stocks": 30
            },
            {
                "id": 35345,
                "name": "Bolsa Horizonte",
                "descriptions": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quisquam ipsum, cupiditate, at, quaerat nobis debitis error eligendi veniam delectus ad ut. Dolor hic quasi possimus accusamus mollitia, est magni?",
                "images": "../images/products-images/bolsa-horizonte.jpg",
                "price": 299,
                "stocks": 30
            },
            {
                "id": 65613153,
                "name": "Playera Antidepresivos",
                "descriptions": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quisquam ipsum, cupiditate, at, quaerat nobis debitis error eligendi veniam delectus ad ut. Dolor hic quasi possimus accusamus mollitia, est magni?",
                "images": "../images/products-images/playera-antidepresivos-2.jpg",
                "price": 299,
                "stocks": 30
            },
            {
                "id": 63513,
                "name": "Playera Benoni",
                "descriptions": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quisquam ipsum, cupiditate, at, quaerat nobis debitis error eligendi veniam delectus ad ut. Dolor hic quasi possimus accusamus mollitia, est magni?",
                "images": "../images/products-images/playera-benoni-2.jpg",
                "price": 299,
                "stocks": 30
            },
            {
                "id": 861352,
                "name": "Playera Boyera",
                "descriptions": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quisquam ipsum, cupiditate, at, quaerat nobis debitis error eligendi veniam delectus ad ut. Dolor hic quasi possimus accusamus mollitia, est magni?",
                "images": "../images/products-images/playera-boyera-2.jpg",
                "price": 299,
                "stocks": 30
            },
            {
                "id": 136813,
                "name": "Playera Jacarandas Blanca",
                "descriptions": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quisquam ipsum, cupiditate, at, quaerat nobis debitis error eligendi veniam delectus ad ut. Dolor hic quasi possimus accusamus mollitia, est magni?",
                "images": "../images/products-images/playera-jacarandas-blanca.jpg",
                "price": 299,
                "stocks": 30
            },
            {
                "id": 1384815,
                "name": "Playera Masuku",
                "descriptions": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quisquam ipsum, cupiditate, at, quaerat nobis debitis error eligendi veniam delectus ad ut. Dolor hic quasi possimus accusamus mollitia, est magni?",
                "images": "../images/products-images/playera-masuku-2.jpg",
                "price": 299,
                "stocks": 30
            },
            {
                "id": 63313,
                "name": "Playera Vocho Amarilla",
                "descriptions": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quisquam ipsum, cupiditate, at, quaerat nobis debitis error eligendi veniam delectus ad ut. Dolor hic quasi possimus accusamus mollitia, est magni?",
                "images": "../images/products-images/playera-vocho-amarilla.jpg",
                "price": 299,
                "stocks": 30
            },
            {
                "id": 62638613,
                "name": "Playera Jacarandas Negro",
                "descriptions": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quisquam ipsum, cupiditate, at, quaerat nobis debitis error eligendi veniam delectus ad ut. Dolor hic quasi possimus accusamus mollitia, est magni?",
                "images": "../images/products-images/playera-jacarandas-negro.jpg",
                "price": 299,
                "stocks": 30
            },
            {
                "id": 633134,
                "name": "Playera Vocho Rosa",
                "descriptions": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consectetur quisquam ipsum, cupiditate, at, quaerat nobis debitis error eligendi veniam delectus ad ut. Dolor hic quasi possimus accusamus mollitia, est magni?",
                "images": "../images/products-images/playera-vocho-rosa.jpg",
                "price": 299,
                "stocks": 30
            }


        ];
        localStorage.setItem("products", JSON.stringify(sampleProducts));
    }
}


function loadCardsListFromItemsController() {
    const obj = JSON.parse(localStorage.getItem('products'))
    console.log(obj);
    for (let i = 0, size = obj.length; i < size; i++) {
        const item = obj[i];
        addItemCard(item);
    }

    const productsContainer = document.querySelector('.products-container');

    productsContainer.innerHTML += `<ul class="list-page">
    <li>1</li>
    <li  class="active">2</li>
    <li>3</li>
    </ul>`

    addClickEvent();
    loadItem();
}

function addClickEvent() {
    productsController.productsList.map(product => {
        const parent = document.getElementById(`${product.id}`);
        parent.addEventListener('click', handleClick, false);
    });


    function handleClick(e) {
        let { id, tagName, parentNode } = e.target;
        id = tagName === 'DIV' ? id : parentNode.id;

        const sizeWidth = window.innerWidth;
        if (sizeWidth <= 480) {
            const product = productsController.productsList.filter(product => product['id'] == id)[0];
            openModal(product)
        }

    }
}

// function addProduct(name, description, image, price, stock) {
//     productsController.addItem(name, description, image, price, stock);
// }



// function deleteProduct(id) {
//     productsController.deleteProduct(id);
// }

// function updateProduct(id, name, description, image, price, stock) {
//     productsController.updateProduct(id, name, description, image, price, stock);
// }
// function deleteAllProducts() {
//     productsController.deleteAllProducts();
// }

function openModal(product) {
    var productModal = $('#productModal');
    productModal.find('.modal-title').text(`${product.name}`);
    productModal.find('.modal-description').text(`${product.descriptions}`);
    productModal.find('.modal-img').attr('src', product.images);
    productModal.find('.modal-sign').text('$ ');
    productModal.find('.modal-price').text(`${product.price}.°°`);
    productModal.find('.modal-currency').text('mxn');
    productModal.modal('show');

}


// Funciones para controlar la paginación
let thisPage = 1;
let limit = 8; // Limita a 8 resultados por página
const loadItem = () => {
    // Obtiene todos los cards existentes 
    let list = document.querySelectorAll('.card-product');
    let beginGet = limit * (thisPage - 1);
    let endGet = limit * thisPage - 1;

    list.forEach((item, key) => {
        if (key >= beginGet && key <= endGet) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    })
    listPage();
}


const listPage = () => {
    let list = document.querySelectorAll('.card-product');
    let count = Math.ceil(list.length / limit);
    document.querySelector('.list-page').innerHTML = '';


    if (thisPage != 1) {
        let prev = document.createElement('li');
        prev.innerText = '<';
        prev.setAttribute('onclick', "changePage(" + (thisPage - 1) + ")");
        document.querySelector('.list-page').appendChild(prev);
    }

    for (i = 1; i <= count; i++) {
        let newPage = document.createElement('li');
        newPage.innerText = i;
        if (i == thisPage) {
            newPage.classList.add('active');
        }
        newPage.setAttribute('onclick', "changePage(" + i + ")");
        document.querySelector('.list-page').appendChild(newPage);
    }

    if (thisPage != count) {
        let next = document.createElement('li');
        next.innerText = '>';
        next.setAttribute('onclick', "changePage(" + (thisPage + 1) + ")");
        document.querySelector('.list-page').appendChild(next);
    }
}

const changePage = i => {
    thisPage = i;
    loadItem();
    // Cuando se cambia de página regresa a la posición 80 en pixeles de la altura de la página
    document.body.scrollTop = 80;
    document.documentElement.scrollTop = 80;
}

loadStorageSampleData();
productsController.loadItemsFromLocalStorage();
loadCardsListFromItemsController();

// console.log(productsController.productsList)
//productsController.loadItemsFromJSON(loadCardsListFromItemsController);
//deleteProduct(461196)
//updateProduct(1160263, "Bolsa Futuro 2", "Lorem ipsum, dolor sit amet consectetur", "../images/products-images/bolsa-futuro.jpg", 200, 2);
//deleteAllProducts();
