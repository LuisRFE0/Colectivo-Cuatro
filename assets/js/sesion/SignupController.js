class SignupController {

    constructor() {
        this.datosPersona = [];
    }



    //Guardar persona en localstorage
    addPerson(datos) {
        if (this.verificarExistente(datos)) {
            return false;
        } else {
            this.datosPersona = [...this.datosPersona, datos[0]];
            localStorage.setItem('usuario', JSON.stringify(this.datosPersona));
            return true;

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

