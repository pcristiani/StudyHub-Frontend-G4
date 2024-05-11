import { URL_BACK } from '../util/constants'

export const getUsers = async (idUsuario) => {

    const url = URL_BACK.getUsers;
    const resp = await fetch(url);
    const data = await resp.json();
    const usuario = [];

    data.map(info => {
        if (info.id !== idUsuario) {
            usuario.push({
                id: info.id,
                name: info.name,
                surname: info.surname,
                username: info.username,
                email: info.email,
                birthdate: info.birthdate,
                ci: info.ci,
                rol: 'Estudiante',
            })
        }
    });
    return usuario[0];
}