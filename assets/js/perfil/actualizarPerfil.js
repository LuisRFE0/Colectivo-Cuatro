window.addEventListener('DOMContentLoaded', llenarPerfil);
const nombreA = document.querySelector('#perfil-nombreA');
const telefonoA = document.querySelector('#perfil-telefonoA');
const correoA = document.querySelector('#perfil-correoA');
const direccionA = document.querySelector('#perfil-direccionA');
const apellido = document.querySelector('#perfil-apellidoA');
const btnActualizar = document.querySelector('#actualizar-perfil');
const { id_clientes } = JSON.parse(localStorage.getItem('sesion'))

function llenarPerfil() {


    console.log(id_clientes);
    fetch(`http://localhost:8080/api/v1/users/${id_clientes}`)
        .then(request => request.json())
        .then(response => construirPerfil(response))
}

function construirPerfil({ name, lastName, email, phone, adress }) {
    nombreA.value = name;
    apellido.value = lastName;
    telefonoA.value = phone;
    direccionA.value = adress;
    correoA.value = email;
}


btnActualizar.addEventListener('click', actualizarPerfil);

function actualizarPerfil(event) {
    event.preventDefault();

    const datosObj = {
        name: nombreA.value,
        lastName: apellido.value,
        email: correoA.value,
        adress: direccionA.value,
        phone: telefonoA.value

    }



    const url = `http://localhost:8080/api/v1/users/update/${id_clientes}`;
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosObj)
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {
            alertaHtml('Cuenta acutalizada correctamente')
        })
        .catch(error => {
            alertaHtml("Error", "error");
        });


}

const alerta = document.querySelector('#alerta')
function alertaHtml(mensaje, estado) {
    limpiarAlerta();
    const alertaMensaje = document.createElement('p');
    if (estado === "error") {
        alertaMensaje.classList.add('bg-danger', 'text-white', "alerta-error");

    } else {
        alertaMensaje.classList.add('bg-success', 'text-white', "alerta-error");
    }
    alertaMensaje.textContent = mensaje;
    alerta.appendChild(alertaMensaje);

    setTimeout(() => {
        alertaMensaje.remove();
    }, 3000);
}



function limpiarAlerta() {
    while (alerta.firstChild) {
        alerta.removeChild(alerta.firstChild)
    }
}