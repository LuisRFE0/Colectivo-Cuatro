// Evento para esperar a que termine de cargar la pagina
document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.querySelector('#form');
    const alerta = document.querySelector('#alerta');
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
            alertaHtml('Favor de llenar todos los campos');
        } else {
            console.log('Correo enviado ');
        }
    }




    /**funcion para validar campos vacios del formulario */
    function validarFormulario({ nombre, correo, telefono, mensaje }) {
        if (nombre === '' || correo === '' || telefono === '' || mensaje === '') {
            return false;
        } else {
            return true;
        }
    }
    //hola

    /**
     * Alrta que se imprime en el html de contacto cuando falta algun campo
     * @param {mensaje de erro} mensaje 
     */
    function alertaHtml(mensaje) {
        limpiarAlerta();

        const alertaMensaje = document.createElement('p');
        alertaMensaje.classList.add('bg-danger', 'text-white');
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


});
