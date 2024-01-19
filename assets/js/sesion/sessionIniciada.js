// const enlace = document.querySelector('#enlaceInicioSesion');
// const divenenlace = document.querySelector('.enlaceInicioSesions');
const enlace2 = document.querySelector('#item-1');
const enlace3 = document.querySelector('#item-2')
const divenenlace2 = document.querySelector('#item-3');
const datosStorage = JSON.parse(localStorage.getItem('sesion')) ? JSON.parse(localStorage.getItem('sesion')) : [];



document.addEventListener('DOMContentLoaded', () => {
    elementoSesion();
    console.log(datosStorage);
})



function elementoSesion() {
    if (datosStorage.rol == 1 || datosStorage.rol == 2) {
        ajustarNav(true);
    } else {
        ajustarNav(false);
    }
}


function ajustarNav(sesion) {

    console.log(sesion);
    if (sesion) {

        enlace2.innerHTML = 'Cuenta';

        enlace2.setAttribute('data-bs-toggle', "dropdown");

        const btnSesionIniciada = document.createElement('button');
        btnSesionIniciada.classList.add('nav-link', 'color-texto',);
        btnSesionIniciada.style.width = '100%'
        btnSesionIniciada.style.textAlign = 'left'
        btnSesionIniciada.textContent = 'Cerrar Sesión';
        divenenlace2.appendChild(btnSesionIniciada);
        btnSesionIniciada.addEventListener('click', () => {
            localStorage.removeItem('sesion');
            // window.location.href = '/Colectivo-Cuatro/index.html'                //enlace para git hub
            window.location.href = '/'              //Enlace para local
        });

        const btnProfile = document.createElement('a');
        btnProfile.classList.add('nav-link', 'color-texto',);
        btnProfile.style.width = '100%'
        btnProfile.style.textAlign = 'left'
        btnProfile.textContent = 'Perfil';

        if (datosStorage.rol === 1) {
            btnProfile.href = '/Colectivo-Cuatro/assets/pages/profile/perfil.html'           //enlace para git hub
            // btnProfile.href = '../../../assets/pages/profile/perfil.html';           //Enlace para local
            enlace3.appendChild(btnProfile);
        } else {
            btnProfile.href = '/Colectivo-Cuatro/assets/pages/admin/formulario-producto.html'           //enlace para git hub
            // btnProfile.href = '../../../assets/pages/admin/formulario-producto.html';           //Enlace para local
            enlace3.appendChild(btnProfile);
        }


        // btnProfile.addEventListener('click', () => {
        //     location.href = "/Colectivo-Cuatro/assets/pages/profile/perfil.html"
        // });


    } else {
        enlace2.classList.remove('dropdown-toggle');
        enlace2.textContent = "Iniciar Sesión";
    }
}


