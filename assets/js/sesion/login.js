const btnLogin = document.querySelector('.btn-login');
const inputEmail = document.querySelector('#inputEmail');
const inputPassword = document.querySelector('#inputPassword');
const alerta = document.querySelector('.alerta');
btnLogin.addEventListener('click', iniciarSesion);


function iniciarSesion(e) {
    e.preventDefault();
    const datosObj = {
        email: inputEmail.value,
        password: inputPassword.value
    };

    const url = 'https://colectivo-cuatro.onrender.com/login/user';
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosObj)
    };

    fetch(url, requestOptions)
        .then(response => response.json())
        .then(data => {

            alertaHtml("Iniciando Sesión");
            generarSesion(data, datosObj);

        })
        .catch(error => {
            alertaHtml("Correo y/o contraseña incorrectos", "error");
        });




    // if (validarDatos(datosObj)) {
    //     if (obtenerPersona(datosObj)) {

    //         const sesion = {
    //             sesion: true,
    //             email: datosObj.email
    //         }
    //         localStorage.setItem('sesion', JSON.stringify(sesion));


    //         location.href = '../../index.html'
    //     } else {
    //         alertaHtml('Email o contraseña incorrectos', 'error');
    //     }
    // }
}

async function generarSesion(data, datosObj) {

    const url = `https://colectivo-cuatro.onrender.com/api/v1/users/getUser?email=${datosObj.email}`;
    const token = data.token;
    let idUser, rol;


    await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            idUser = data.id_clientes;
            rol = data.role.id;

        })
        .catch(error => {
            console.error(error);
        });



    const sesion = {
        token: data.token,
        email: datosObj.email,
        idUser,
        rol
    }

    localStorage.setItem('sesion', JSON.stringify(sesion));
    window.location.href = '/';
}



function obtenerPersona(persona) {
    const datosLocalStorage = JSON.parse(localStorage.getItem('usuario'));
    let respuesta = false;
    if (datosLocalStorage.some(personas => personas.email == persona.email)) {
        if (datosLocalStorage.some(personas => personas.password == persona.password)) {
            respuesta = true;
        } else {
            respuesta = false;
        }
    } else {
        respuesta = false;
    }
    return respuesta;
}



function validarDatos(datos) {
    let respuesta = false;

    if (datos.email === '') {
        alertaHtml("Email o contraseña incorrectos", "error");
        respuesta = false;
    } else if (datos.password === '') {
        alertaHtml("Email o contraseña incorrectos", "error");
        respuesta = false;
    } else {
        respuesta = true;
    }

    return respuesta
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
