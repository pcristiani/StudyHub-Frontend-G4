/*
const state = {
    name: 'Sebastian',
    logged: true
}

const loginAction = {
    type: types.login,
    payload: {
        name: 'Sebastian',
        email: 'sebasgon@gmail.com'
    }
}
*/
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
            break;
    }
}
