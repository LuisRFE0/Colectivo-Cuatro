

const productsController = new ProductsController();


function addItemCard(product) {
    const productsContainer = document.querySelector('.products-container');

    const productHTML = `
    <article class="col-6 col-md-4 col-lg-3 card-container">
    <div class="card-product" id="${product.id_producto}">
     <img src="${product.urlImage}" onerror="this.onerror=null; this.src='../images/products-images/img-product-404.jpg'" class="card-img-top" alt="...">
     <div class="card-product-body">
         <div class="card-product-div"><h5 class="card-product-title">${product.name}</h5></div>
         <p class="card-product-description">${product.description}</p>
         <span class="card-product-price"><small class="card-sign">$ </small>${product.price}.°°<small class="card-currency"> mxn</small></span>
         <i id=id${product.id_producto} class="fa-solid fa-cart-plus fa-xl card-add-cart"></i>
     </div>
    </div>

    </article>`
    productsContainer.innerHTML += productHTML;

}

function disableButton(id) {

    const button = document.getElementById(id);
    button.classList.add("cart-alert");
    button.style.pointerEvents = "none";
    let alert = document.createElement("i");
    alert.classList.add("fa-solid", "fa-add", "fa-2xs");
    setTimeout(function () {
        alert.parentNode.removeChild(alert);
        button.classList.remove("cart-alert");

        button.style.pointerEvents = "auto";
    }, 700);
    button.appendChild(alert);
}

async function loadCardsListFromItemsController() {
    const productsContainer = document.querySelector('.products-container');
    productsContainer.innerHTML = "";

    productsController.productsList.forEach(product => addItemCard(product));


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
        const parent = document.getElementById(`${product.id_producto}`);
        parent.addEventListener('click', handleClickDiv, false);

        const btnCart = document.getElementById(`id${product.id_producto}`);
        btnCart.addEventListener('click', handleClickCart, false);
    });


    function handleClickDiv(e) {
        let { id, tagName, parentNode } = e.target;
        id = tagName === 'DIV' ? id : parentNode.id;

        const sizeWidth = window.innerWidth;
        if (sizeWidth <= 480) {
            const product = productsController.productsList.filter(product => product['id_producto'] == id)[0];
            openModal(product)
        }

    }

    function handleClickCart(e) {
        let { id, tagName, parentNode } = e.target;
        disableButton(id)
        addProduct(id.substring(2));
    }

}

function addProduct(id) {
    let cart = [];

    const cartBadge = document.getElementById('cart-nav');
    const product = productsController.productsList.filter(product => product['id_producto'] == id)[0];

    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
    }

    cart.push(product);
    cartBadge.setAttribute('value', cart.length);
    localStorage.setItem('cart', JSON.stringify(cart));
}

function cartProductExists(cart, id) {
    let response = false;
    for (const [key, value] of Object.entries(cart)) {
        if (value.productID == id) {
            response = true;
        } else {
            response = false;
        }
    }
    return response;
}

function openModal(product) {
    let productModal = $('#productModal');
    productModal.find('.modal-title').text(`${product.name}`);
    productModal.find('.modal-description').text(`${product.description}`);
    productModal.find('.modal-img').attr('src', product.urlImage);
    productModal.find('.modal-img').attr('onerror', "this.onerror=null; this.src='../images/products-images/img-product-404.jpg'");
    productModal.find('.modal-sign').text('$ ');
    productModal.find('.modal-price').text(`${product.price}.°°`);
    productModal.find('.modal-span-cart').html(`<i class='fa-solid fa-cart-plus fa-xl modal-add-cart' onclick='addProduct(${product.id_producto})'></i>`);
    productModal.find('.modal-currency').text('mxn');
    productModal.modal('show');


}
// Funciones para controlar la paginación
let thisPage = 1;
let limit = 8; // Limita a 8 resultados por página
function loadItem() {
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

function listPage() {
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

(async function () {
    const productsContainer = document.querySelector('.products-container');
    productsContainer.innerHTML = "<div class='col-12 d-flex justify-content-center my-5'><div class='loading-div'></div></div>";
    await productsController.loadItemsFromDatabase();
    await loadCardsListFromItemsController();
})();

/* function loadStorageSampleData() {
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
} */
