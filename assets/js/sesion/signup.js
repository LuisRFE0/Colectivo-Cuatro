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
            location.href = '../../assets/pages/login.html';
        }
    }



    function validarFormulario({ name, email, password, confirmPassword }) {
        let respuesta;
        const regexName =  /^([a-zA-ZñÑáéíóúÁÉÍÓÚ])+$/;
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // Minimum eight characters, at least one letter, one number and one special character:
        const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        if (name.trim() == '') {
            alertaHtml("Favor de llenar el nombre", "error");
            respuesta = false;
        } else if(!regexName.test(name.trim())) {
            alertaHtml("El nombre no puede contener números", "error");
            respuesta = false; 
        }
        else if (email.trim() == '') {
            alertaHtml("Favor de llenar el correo", "error");
            respuesta = false;
        } else if (!regexEmail.test(email.trim())) {
            alertaHtml("Valida el formato del correo", "error");
            respuesta = false;
        }
        else if (password.trim() == '') {
            alertaHtml("Favor de llenar la contraseña", "error");
            respuesta = false;
        } else if (password.length < 8) {
            alertaHtml("La contraseña no debe ser menor a 8 carácteres", "error");
            respuesta = false;
        } else if (!regexPassword.test(password.trim())) {
            alertaHtml("La contraseña debe incluir al menos un caracter especial, una letra mayuscula, una minuscula y un número", "Error")
        }
        else if (confirmPassword.trim() === '') {
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

