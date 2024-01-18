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


function generarOrden() {
    const { token, idUser } = JSON.parse(localStorage.getItem('sesion')) ? JSON.parse(localStorage.getItem('sesion')) : []

    console.log(token);
    console.log(idUser);


}