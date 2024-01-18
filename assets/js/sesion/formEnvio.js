// document.addEventListener('DOMContentLoaded', () => {

//     const formularioEnvio = document.querySelector('#formEnvio');

//     const alerta = document.querySelector('#alerta');
//     const name = document.querySelector('#input-nombre')
//     const direction = document.querySelector('#input-direccion')
//     const postcode = document.querySelector('#input-codigo-postal')
//     const colonia = document.querySelector('#input-colonia')
//     const country = document.querySelector('#input-nombre')

//     const formularioTarjeta = document.querySelector('#formtarjeta');

//     const nameTarjeta = document.querySelector('#input-nombre-tarjeta');
//     const numberTarget = document.querySelector('#input-numero-tarjeta');
//     const ccv = document.querySelector('#input-ccv');

//     const formEnvioController = new FormEnvioController();

//     formularioEnvio.addEventListener('submit', pagarEnvio);
//     formularioTarjeta.addEventListener('submit', pagarTarjeta);

//     function pagarEnvio(evento) {
//         evento.preventDefault();
//         const datosPago = [{
//             name: name.value,
//             direction: direction.value,
//             postcode: postcode.value,
//             colonia: colonia.value,
//             country: country.value,
//             numberTarget: numberTarget.value,
//             ccv: ccv.value

//         }]

//     }

//     function pagarTarjeta(evento) {
//         evento.preventDefault();

//         const datosTarjeta = {
//             name: nameTarjeta.value,
//             numberTarget: numberTarget.value,
//             ccv: ccv.value
//         };

//         if (validarFormularioTarjeta(datosTarjeta)) {
//             registrarPagoTarjeta(datosTarjeta);
//         } else {
//             return;
//         }
//     }

//     function validarFormularioTarjeta({ name, numberTarget, ccv }) {
//         // ... Validación del formulario de tarjeta
//     }

//     function registrarPagoTarjeta(datosTarjeta) {
//         alertaHtml('Pago con tarjeta registrado exitosamente', 'success');
//         // Puedes agregar aquí la lógica para registrar el pago con tarjeta
//     }

//     // ... Otras funciones y código ...

// });


const btnPagar = document.querySelector('.btn-pagar');

btnPagar.addEventListener('click', (e) => {
    e.preventDefault();

    generarOrden();
})


async function generarOrden() {
    const { token, idUser } = JSON.parse(localStorage.getItem('sesion')) ? JSON.parse(localStorage.getItem('sesion')) : []

    let today = new Date();
    let year = today.getFullYear();
    let month = (today.getMonth() + 1).toString().padStart(2, '0');
    let day = today.getDate().toString().padStart(2, '0');


    // Formatear la fecha y hora en el formato "yyyy-mm-dd hh:mm"
    var formattedDateTime = `${year}-${month}-${day}`;

    console.log(formattedDateTime);
    const datosObj = {
        "idClient": idUser,
        "orderDate": formattedDateTime,
        "total": 598.0

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

            console.log(data);

        })
        .catch(error => {
            console.log(error);
        });

    generarOrdenHasProduct();

}

function generarOrdenHasProduct() {

}