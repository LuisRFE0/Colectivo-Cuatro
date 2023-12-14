

const formulario = document.querySelector('#form');
const alerta = document.querySelector('#alerta');
const btnContacto = document.querySelector('#btn-contacto');
//---------------------------eventListeners-------------------------
formulario.addEventListener('submit', registrar);



//---------------------------------Funciones----------------------------
function registrar(evento) {
    evento.preventDefault();


    const datosFormulario = {
        name: document.querySelector('#input-nombre').value,
        email: document.querySelector('#input-email').value,
        password: document.querySelector('#input-password').value,
        confirmPassword: document.querySelector('#input-confirm-password').value
    }



    if (!validarFormulario(datosFormulario)) {
        return;
    } else {
        registrarUser(datosFormulario);
    }


}

function registrarUser(datos) {

    localStorage.setItem('usuario', JSON.stringify(datos));
    alertaHtml('Usuario agregado correctamente');


}


function validarFormulario({ name, email, password, confirmPassword }) {
    let respuesta = true;
    if (name === '') {
        alertaHtml("Favor de llenar el nombre", "error");
        respuesta = false;

    }
    else if (email === '') {
        alertaHtml("Favor de llenar el correo", "error");
        respuesta = false;
    }
    else if (password === '') {
        alertaHtml("Favor de llenar la contraseña", "error");
        respuesta = false;
    }
    else if (confirmPassword === '') {
        alertaHtml("Favor de confirmar la contraseña", "error");
        respuesta = false;
    }
    else if (password !== confirmPassword) {
        alertaHtml("La contraseña no coincide", "error");
        respuesta = false;
    }

    else {
        respuesta = true;
    }


    return respuesta;
}





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