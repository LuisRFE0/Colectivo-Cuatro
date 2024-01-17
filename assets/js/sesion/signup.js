document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('#form');
    const alerta = document.querySelector('#alerta');
    const name = document.querySelector('#input-nombre')
    const apellido = document.querySelector('#input-apellido')
    const email = document.querySelector('#input-email')
    const password = document.querySelector('#input-password')
    const confirmPassword = document.querySelector('#input-confirm-password')
    //---------------------------eventListeners-------------------------
    formulario.addEventListener('submit', registrar);



    //---------------------------------Funciones----------------------------
    const signupController = new SignupController();

    function registrar(evento) {
        evento.preventDefault();



        const datosFormulario = {
            name: name.value,
            apellido: apellido.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value
        }


        if (validarFormulario(datosFormulario)) {

            const datosFormularioN = {
                name: name.value,
                lastName: apellido.value,
                email: email.value,
                password: password.value,
                role: { "id": 1 }
            }

            registrarUser(datosFormularioN);
        } else {
            console.log("Error");
        }



        // if (validarFormulario(datosFormulario[0])) {
        //     registrarUser(datosFormulario);
        // } else {
        //     return
        // }


    }

    function registrarUser(datos) {

        console.log(datos);

        const url = 'http://localhost:8080/api/v1/users/createUser';
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        };
        let statusCode;
        fetch(url, requestOptions)
            .then(response => {
                statusCode = response.status;
                return response.json()
            })
            .then(data => {
                console.log(data);
                if (statusCode == 200 && data) {
                    alertaHtml("Cuenta Creada correctamente");
                    window.location.href = '../../assets/pages/login.html';
                } else if (statusCode == 400) {
                    alertaHtml(data.message, 'error');
                }
            })
            .catch(error => {
                console.log(error.message);
                // alertaHtml(error, "error");
            });


        // if (!signupController.addPerson(datos)) {
        //     alertaHtml('La cuenta ya ha sido registrada', 'error');
        // } else {
        //     alertaHtml('Cuenta registrada exitosamente');
        //     location.href = '../../assets/pages/login.html';
        // }



    }



    function validarFormulario({ name, apellido, email, password, confirmPassword }) {
        let respuesta;
        const regexName = /^([a-zA-ZñÑáéíóúÁÉÍÓÚ])+$/;
        const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        // Minimum eight characters, at least one letter, one number and one special character:
        const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        if (name.trim() == '') {
            alertaHtml("Favor de llenar el nombre", "error");
            respuesta = false;
        } else if (!regexName.test(name.trim())) {
            alertaHtml("El nombre no puede contener números", "error");
            respuesta = false;
        } else if (apellido.trim() == '') {
            alertaHtml("Favor de llenar el apellido", "error");
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

