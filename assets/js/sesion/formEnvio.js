const btnPagar = document.querySelector('.btn-pagar');

btnPagar.addEventListener('click', (e) => {
    e.preventDefault();

    generarOrden();
})

const { token, idUser } = JSON.parse(localStorage.getItem('sesion')) ? JSON.parse(localStorage.getItem('sesion')) : []
async function generarOrden() {


    let today = new Date();
    let year = today.getFullYear();
    let month = (today.getMonth() + 1).toString().padStart(2, '0');
    let day = today.getDate().toString().padStart(2, '0');
    let formattedDateTime = `${year}-${month}-${day}`;


    const datosObj = {
        "id_client": idUser,
        "orderDate": formattedDateTime,
    }

    const url = 'https://colectivo-cuatro.onrender.com/api/v1/orders/createOrder';
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosObj)
    };

    await fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('idOrden', JSON.stringify({ "id_orden": data.id_orden }));
        })
        .catch(error => {
            console.log(error);
        });


    generarOrdenHasProduct(idUser);

}

async function generarOrdenHasProduct(id) {

    const carrito = JSON.parse(localStorage.getItem('cart'));
    const { id_orden } = JSON.parse(localStorage.getItem('idOrden'));

    carrito.forEach(async element => {

        const datosObj = {
            "id_orden": id_orden,
            "id_producto": element.id_producto,
            "cantidad": "1",
            "subtotal": element.price
        }

        const url = 'https://colectivo-cuatro.onrender.com/api/v1/ohp/createOhp';
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datosObj)
        };

        await fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
            })
            .catch(error => {
                console.log(error);
            });

    });

    actualizarOrden(id_orden);

}

async function actualizarOrden(id_orden) {
    const total = JSON.parse(localStorage.getItem('total'));

    const totalObj = {
        "total": total.total
    }


    const url = `https://colectivo-cuatro.onrender.com/api/v1/orders/updateOrder/${id_orden}`;
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(totalObj)
    };
    await fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            // console.log(data);
        })
        .catch(error => {
            console.log(error);
        });

    alert("Gracias por comprar en Colectivo Cuatro")
    localStorage.removeItem('idOrden');
    localStorage.removeItem('total');
    localStorage.removeItem('cart');

    window.location.href = '../../../index.html';
}