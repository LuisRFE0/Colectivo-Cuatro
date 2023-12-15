// const enlace = document.querySelector('#enlaceInicioSesion');
// const divenenlace = document.querySelector('.enlaceInicioSesions');
const enlace2 = document.querySelector('#item-1');
const enlace3 = document.querySelector('#item-2')
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

        enlace2.innerHTML = 'Cuenta';

        enlace2.setAttribute('data-bs-toggle', "dropdown");

        const btnSesionIniciada = document.createElement('button');
        btnSesionIniciada.classList.add('nav-link', 'color-texto',);
        btnSesionIniciada.style.width = '100%'
        btnSesionIniciada.style.textAlign = 'left'
        btnSesionIniciada.textContent = 'Cerrar Sesion';
        divenenlace2.appendChild(btnSesionIniciada);
        btnSesionIniciada.addEventListener('click', () => {
            localStorage.removeItem('sesion');
            location.href = "../../../index.html"
        });

        const btnProfile = document.createElement('button');
        btnProfile.classList.add('nav-link', 'color-texto',);
        btnProfile.style.width = '100%'
        btnProfile.style.textAlign = 'left'
        btnProfile.textContent = 'Perfil';
        enlace3.appendChild(btnProfile);
        btnProfile.addEventListener('click', () => {
            location.href = "../../../assets/pages/profile/perfil.html"
        });


    } else {
        enlace2.classList.remove('dropdown-toggle');
        enlace2.textContent = "Iniciar Sesion";
        enlace2.setAttribute('href', "../../../assets/pages/login.html");
    }
}


