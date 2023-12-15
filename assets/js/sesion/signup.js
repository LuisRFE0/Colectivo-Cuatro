document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('#form');
    const alerta = document.querySelector('#alerta');
    const name = document.querySelector('#input-nombre')
    const email = document.querySelector('#input-email')
    const password = document.querySelector('#input-password')
    const confirmPassword = document.querySelector('#input-confirm-password')
    //---------------------------eventListeners-------------------------
    formulario.addEventListener('submit', registrar);



    //---------------------------------Funciones----------------------------
    const signupController = new SignupController();

    function registrar(evento) {
        evento.preventDefault();



        const datosFormulario = [{
            name: name.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value
        }]



        if (validarFormulario(datosFormulario[0])) {
            registrarUser(datosFormulario);
        } else {
            return
        }


    }

    function registrarUser(datos) {

        if (!signupController.addPerson(datos)) {
            alertaHtml('La cuenta ya ha sido registrada', 'error');
        } else {
            alertaHtml('Cuenta registrada exitosamente');
            location.href = '../../../assets/pages/login.html';
        }
    }



    function validarFormulario({ name, email, password, confirmPassword }) {
        let respuesta;

        if (name == '') {
            alertaHtml("Favor de llenar el nombre", "error");
            respuesta = false;

        }
        else if (email == '') {
            alertaHtml("Favor de llenar el correo", "error");
            respuesta = false;
        }
        else if (password == '') {
            alertaHtml("Favor de llenar la contraseña", "error");
            respuesta = false;
        } else if (password.length < 6) {
            alertaHtml("La contraseña no debe ser menor a 6 carácteres", "error");
            respuesta = false;
        }
        else if (confirmPassword === '') {
            alertaHtml("Favor de confirmar la contraseña", "error");
            respuesta = false;
        } 
        else if (password !== confirmPassword) {
            alertaHtml("La contraseña no coincide", "error");
            respuesta = false;
        } else {
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


    signupController.loadPersonFromLocalStorage();

})

