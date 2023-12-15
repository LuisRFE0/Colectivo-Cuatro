// const enlace = document.querySelector('#enlaceInicioSesion');
// const divenenlace = document.querySelector('.enlaceInicioSesions');
const enlace2 = document.querySelector('#item-1');

const divenenlace2 = document.querySelector('#item-3');



document.addEventListener('DOMContentLoaded', () => {
    elementoSesion();
})



function elementoSesion() {
    const datosStorage = JSON.parse(localStorage.getItem('sesion')) ? JSON.parse(localStorage.getItem('sesion')) : [];
    if (datosStorage.sesion === true) {
        ajustarNav(true);
    } else {
        ajustarNav(false);
    }
}


function ajustarNav(sesion) {
    if (sesion) {

        enlace2.textContent = 'Cuenta';

        enlace2.setAttribute('data-bs-toggle', "dropdown");
        const btnSesionIniciada = document.createElement('button');
        btnSesionIniciada.classList.add('nav-link', 'color-texto',);
        btnSesionIniciada.style.width = '100%'
        btnSesionIniciada.style.textAlign = 'left'
        btnSesionIniciada.textContent = 'Cerrar Sesion';
        divenenlace2.appendChild(btnSesionIniciada);
        btnSesionIniciada.addEventListener('click', () => {
            localStorage.removeItem('sesion');
            location.reload();
        });


    } else {
        enlace2.classList.remove('dropdown-toggle');
        enlace2.textContent = "Iniciar Sesion";
        enlace2.setAttribute('href', "../../../assets/pages/login.html");
    }
}


