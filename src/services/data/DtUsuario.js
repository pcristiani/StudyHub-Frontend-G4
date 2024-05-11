class DtUsuario {
    constructor(id, name, surname, username, email, birthdate, rol = 'Estudiante') {
        this._id = id;
        this._name = name;
        this._surname = surname;
        this._username = username;
        this._email = email;
        this._birthdate = birthdate;
        this._rol = rol;
    }

    get id() {
        return this._id;
    }
    set id(newId) {
        this._id = newId;
    }

    get name() {
        return this._name;
    }
    set name(newname) {
        this._name = newname;
    }

    get surname() {
        return this._surname;
    }
    set surname(newsurname) {
        this._surname = newsurname;
    }

    get username() {
        return this._username;
    }
    set username(newusername) {
        this._username = newusername;
    }

    get email() {
        return this._email;
    }
    set email(newemail) {
        this._email = newemail;
    }

    get birthdate() {
        return this._birthdate;
    }
    set birthdate(newbirthdate) {
        this._birthdate = newbirthdate;
    }

    get rol() {
        return this._rol;
    }
    set rol(newRol) {
        this._rol = newRol;
    }
}


const dtUsuario = new DtUsuario(1, 'Sebastián', 'Gonzalez', 'sgonzalez', 'sebas@example.com', new Date(1999, 5, 15), ['Estudiante', 'Administrador']);

console.log(dtUsuario);