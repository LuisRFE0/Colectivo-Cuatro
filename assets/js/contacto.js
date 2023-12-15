// Evento para esperar a que termine de cargar la pagina
document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('#form');
    const alerta = document.querySelector('#alerta');
    const btnContacto = document.querySelector('.btn-contacto');
    //---------------------------eventListeners-------------------------
    formulario.addEventListener('submit', enviarCorreo);



    //---------------------------------Funciones----------------------------
    function enviarCorreo(evento) {
        evento.preventDefault();

        const datosFormulario = {
            nombre: document.querySelector('#inputNombre4').value,
            correo: document.querySelector('#inputEmail4').value,
            telefono: document.querySelector('#inputTelefono4').value,
            mensaje: document.querySelector('#inpuntTextArea4').value
        }



        if (!validarFormulario(datosFormulario)) {
            return;
        } else {
            btnContacto.disabled = true;
            btnContacto.style.background = "#525252";
            enviarCorreoServidor(datosFormulario)
        }
    }




    /**funcion para validar campos vacios del formulario */
    function validarFormulario({ nombre, correo, telefono, mensaje }) {
        let respuesta = true;
        if (nombre === '') {
            alertaHtml("Favor de llenar el nombre", "error");
            respuesta = false;

        }
        else if (correo === '') {
            alertaHtml("Favor de llenar el correo", "error");
            respuesta = false;
        }
        else if (telefono === '') {
            alertaHtml("Favor de llenar el telefono", "error");
            respuesta = false;
        }
        else if (mensaje === '') {
            alertaHtml("Favor de llenar el mensaje", "error");
            respuesta = false;
        }

        else {
            respuesta = true;
        }


        return respuesta;
    }
    //hola

    /**
     * Alerta que se imprime en el html de contacto cuando falta algun campo
     * @param {mensaje de erro} mensaje 
     */
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



    /**
     * Funcion para limpiar la alerta y no se duplique cada que se hace submit
     */
    function limpiarAlerta() {
        while (alerta.firstChild) {
            alerta.removeChild(alerta.firstChild)
        }
    }

    function enviarCorreoServidor({ nombre, correo, mensaje, telefono }) {
        fetch("https://formsubmit.co/ajax/vicmoysen@hotmail.com", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: nombre,
                email: correo,
                message: mensaje,
                tel: telefono

            })
        })
            .then(response => response.json())
            .then(data => {
                alertaHtml("Mensaje enviado!", "correcto");
                document.getElementById("form").reset();
                btnContacto.disabled = false;
                btnContacto.style.background = "#0A3C82";

            })
            .catch(error => console.log(error));
    }

});
