window.addEventListener('DOMContentLoaded', llenarPerfil);
const nombreA = document.querySelector('#perfil-nombreA');
const telefonoA = document.querySelector('#perfil-telefonoA');
const correoA = document.querySelector('#perfil-correoA');
const direccionA = document.querySelector('#perfil-direccionA');
const apellido = document.querySelector('#perfil-apellidoA');
const btnActualizar = document.querySelector('#actualizar-perfil');
const { idUser, token } = JSON.parse(localStorage.getItem('sesion'))

function llenarPerfil() {



    fetch(`https://colectivo-cuatro.onrender.com/api/v1/users/${idUser}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
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

    if (validarDatos(datosObj)) {
        const url = `https://colectivo-cuatro.onrender.com/api/v1/users/update/${idUser}`;
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(datosObj)
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                alertaHtml('Cuenta acutalizada correctamente');
                window.location.href = '../../pages/profile/perfil.html'
            })
            .catch(error => {
                alertaHtml("Error", "error");
            });
    }




}



function validarDatos({ name, lastName, email, adress, phone }) {
    let respuesta = true;
    if (name.trim() == '') {
        alertaHtml("Favor de llenar el nombre", "error");
        respuesta = false;
    } else if (lastName.trim() == '') {
        alertaHtml("Favor de llenar el apellido", "error");
        respuesta = false;
    } else if (email.trim() == '') {
        alertaHtml("Favor de llenar el correo", "error");
        respuesta = false;
    } else if (adress.trim() == '') {
        alertaHtml("Favor de llenar la direccion", "error");
        respuesta = false;
    } else if (phone.trim() == '') {
        alertaHtml("Favor de llenar el teléfono", "error");
        respuesta = false;
    }
    return respuesta;

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