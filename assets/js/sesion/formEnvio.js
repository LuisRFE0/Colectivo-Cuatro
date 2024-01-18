


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


    // Formatear la fecha y hora en el formato "yyyy-mm-dd hh:mm"
    var formattedDateTime = `${year}-${month}-${day}`;


    const datosObj = {
        "id_client": idUser,
        "orderDate": formattedDateTime,


    }

    const url = 'http://localhost:8080/api/v1/orders/createOrder';
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

    generarOrdenHasProduct(idUser);

}

async function generarOrdenHasProduct(id) {

    const carrito = JSON.parse(localStorage.getItem('cart'));
    let total = 0;

    carrito.forEach(async element => {
        let idOrden;


        await fetch(`http://localhost:8080/api/v1/orders/getIdOrder/${id}`)
            .then(response => response.json())
            .then(data => {
                idOrden = data.id_orden;


            })
            .catch(error => {
                console.log(error);
            });

        const datosObj = {
            "id_orden": idOrden,
            "id_producto": element.id_producto,
            "cantidad": "3",
            "subtotal": element.price
        }

        total = total + element.price;
        const objOrdenTotal = {
            "idOrden": idOrden,
            "total": total
        }
        localStorage.setItem('idOrden', JSON.stringify(objOrdenTotal));

        const url = 'http://localhost:8080/api/v1/ohp/createOhp';
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

                console.log(data);

            })
            .catch(error => {
                console.log(error);
            });

    });
    const Orden = JSON.parse(localStorage.getItem('idOrden'));
    actualizarOrden(Orden);

}

async function actualizarOrden(Orden) {

    const totalObj = {
        "total": Orden.total,
    }

    Orden.idOrden = Orden.idOrden + 1;

    const url = `http://localhost:8080/api/v1/orders/updateOrder/${Orden.idOrden}`;
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

            console.log(data);

        })
        .catch(error => {
            console.log(error);
        });
}