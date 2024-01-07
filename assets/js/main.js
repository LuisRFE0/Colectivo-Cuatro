(function () {
    const cartBadge = document.getElementById('cart-nav');
    
    if(localStorage.getItem('cart')){
        let cart = [];
        cart = JSON.parse(localStorage.getItem('cart'))
        cartBadge.setAttribute('value', cart.length);
    } else { 
        cartBadge.setAttribute('value', 0);
    }
})();

