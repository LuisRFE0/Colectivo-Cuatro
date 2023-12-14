class SignupController {

    constructor() {
        this.datosPersona = [];
    }



    //Guardar persona en localstorage
    addPerson(datos) {
        if (this.verificarExistente(datos)) {
            alertaHtml('La persona ya ha sido registrada', 'error');
            return;
        } else {
            this.datosPersona = [...this.datosPersona, datos[0]];
            localStorage.setItem('usuario', JSON.stringify(this.datosPersona));
            alertaHtml('Cuenta registrada exitosamente');
            location.href = '../../../assets/pages/login.html';
        }

    }








    verificarExistente(datos) {
        return this.datosPersona.some(persona => persona.email == datos[0].email);
    }



    //Carga los usuarios del localstorage
    loadPersonFromLocalStorage() {
        const storageItems = localStorage.getItem("usuario")

        if (storageItems) {
            const user = JSON.parse(storageItems)
            for (let i = 0, size = user.length; i < size; i++) {
                const user2 = user[i];
                this.datosPersona.push(user2);
            }
        }
    }

}

