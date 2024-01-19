const productsController = new ProductsController();

(function () {
    loadCart();
})();

function addItemCard(product) {
    let productsContainer = document.getElementById('product-order-container');

    const productHTML = `
        <div class="row" id="product-container">
        <div class="col-lg-2 col-md-2 col-6 text-center"><img src="${product.urlImage}" id="product-image"></div>
        <div class="col-lg-4 col-md-4 col-6" id="product-details"><span id="product-title">${product.name}</span><span class="product-delete" id="${product.id_producto}">Eliminar</span></div>
        <div class="col-lg-2 col-md-2 col-4 text-center"><span class="product-order-header">Cada uno</span><br><span id="product-unitary-price">$${product.price}.00</span></div>
        <div class="col-lg-2 col-md-2 col-4 text-center"><span class="product-order-header">Unidades</span><br><input type="number" value="1" id="product-quantity" name="quantity" min="1" max="5"></div>
        <div class="col-lg-2 col-md-2 col-4 text-center"><span class="product-order-header">Total</span><br><span id="product-total-price">$${product.price}.00</span></div>
        </div>`;

    productsContainer.innerHTML += productHTML;
}

function orderDetails() {
    const orderDetailsContainer = document.getElementById('bill-container');

    let cart = JSON.parse(localStorage.getItem('cart'));
    let total = 0;

    cart.forEach(element => {
        total += element.price;
    });

    localStorage.setItem('total', JSON.stringify({ "total": total }))

    const orderHTML = `   <div class="row bill">
        <div class="col-6 order-titles">Envio: <br> Subtotal: <br> Descuento:  <br> <span class="order-total"  >Total</span> </div>
        <div class="col-6 order-numbers text-end">$100.00 <br> $${total} <br> $0.00 <br> <span class="order-total" id="order-total">$${total}</span></div>
        <div class="col-12 text-center my-3"><a href="../../assets/pages/profile/formularioenvio.html" id="order-checkout">Confirmar</a></div>
    </div>`;

    orderDetailsContainer.innerHTML += orderHTML;

}


function orderDetailsEmpty() {
    
    const orderDetailsContainer = document.getElementById('bill-container');
    orderDetailsContainer.classList.add('text-center');
    orderDetailsContainer.innerHTML = `
    <div id="order-animation"></div>`;
    let animation = lottie.loadAnimation({
        container: document.getElementById('order-animation'), // el div donde se mostrará la animación
        renderer: 'svg', // el tipo de renderizado
        loop: true, // si la animación se repite o no
        autoplay: true, // si la animación se reproduce automáticamente o no
        path: '../js/order-empty.json' // la ruta al archivo JSON que contiene la animación

    });

    orderDetailsContainer.innerHTML += orderHTML;
}

function removeProduct(e) {
    let { id, tagName, parentNode } = e.target;

    let cart = JSON.parse(localStorage.getItem('cart'));
    let products = cart.filter(product => product.id_producto != id);
    localStorage.setItem('cart', JSON.stringify(products));

    document.getElementById('bill-container').innerHTML = ``;
    document.getElementById('product-order-container').innerHTML = ``;
    const cartBadge = document.getElementById('cart-nav');
    cartBadge.setAttribute('value', cart.length - 1);
    loadCart();
}

function loadCart() {
    let response = false;
    if (localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart')).length != 0) {
        const cart = JSON.parse(localStorage.getItem('cart'));

        for (let i = 0, size = cart.length; i < size; i++) {
            const item = cart[i];
            addItemCard(item);
        }

        cart.map(product => {
            const parent = document.getElementById(`${product.id_producto}`);
            parent.addEventListener('click', removeProduct, false);
        });
        orderDetails();
        response = true;
    } else {
        const productContainer = document.getElementById('product-order-container');
        productContainer.classList.add('text-center');
        productContainer.innerHTML = `
        <div id="cart-animation"></div>`;
        let animation = lottie.loadAnimation({
            container: document.getElementById('cart-animation'), // el div donde se mostrará la animación
            renderer: 'svg', // el tipo de renderizado
            loop: true, // si la animación se repite o no
            autoplay: true, // si la animación se reproduce automáticamente o no
            path: '../js/cart.json' // la ruta al archivo JSON que contiene la animación

        });
        orderDetailsEmpty();
    }
    return response;


}