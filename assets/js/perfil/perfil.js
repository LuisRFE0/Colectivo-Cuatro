

window.addEventListener('DOMContentLoaded', cargardatosPerfil);


function cargardatosPerfil() {

    const { idUser, token } = JSON.parse(localStorage.getItem('sesion'))


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

    const nombre = document.querySelector('#perfil-nombre');
    const telefono = document.querySelector('#perfil-telefono');
    const correo = document.querySelector('#perfil-correo');
    const direccion = document.querySelector('#perfil-direccion');

    console.log(email);
    if (phone == null) {
        phone = ' ';
    }
    nombre.textContent = name + ' ' + lastName;
    telefono.textContent = phone;
    correo.textContent = email;
    direccion.textContent = adress;



}