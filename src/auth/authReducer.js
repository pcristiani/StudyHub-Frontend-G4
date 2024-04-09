import { types } from "./types";

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            return {
                ...action.payload,
                logged: true
            }
        case types.logout:
            return {
                logged: false
            }
        default:
            return state;
    }
}

/*
const state = {
    name: 'Sebastian',
    logged: true
}
 
const loginAction = {
    type: types.login,
    payload: {
        username: 'sgonzalez',
        name: 'Sebastian',
        surname: 'Gonzalez',
        email: 'sebasgon@gmail.com',
        rol: 'Administrador'
    }
}
*/