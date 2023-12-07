
const storageItems = localStorage.getItem("products")

if (storageItems) {
    const products = JSON.parse(storageItems)
    
    for (let i = 0; i < products.length; i++) {
      addItemCard(products[i]);
    }
}



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



//*************************************************** */


function loadStorageSampleData() {
    if (!localStorage.getItem("products")) {
        const sampleProducts = [
        
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
        location.reload();
    }
}

loadStorageSampleData();