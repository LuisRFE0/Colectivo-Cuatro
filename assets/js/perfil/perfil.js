

window.addEventListener('DOMContentLoaded', cargardatosPerfil);


function cargardatosPerfil() {

    const { id_clientes } = JSON.parse(localStorage.getItem('sesion'))

    console.log(id_clientes);
    fetch(`http://localhost:8080/api/v1/users/${id_clientes}`)
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