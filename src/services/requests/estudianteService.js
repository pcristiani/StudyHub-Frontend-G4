import { URL_BACK } from '../util/constants'
import axios from 'axios';


///
/// Estudiantes sin validar
export const getEstudiantesPendientes = async (jwtLogin) => {
	const url = URL_BACK.getEstudiantesPendientes;

	let headersList = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${jwtLogin}`,
	}
	const response = await fetch(url, {
		method: "GET",
		headers: headersList
	});
	let result = await response.json();
	console.log('result: ', result);
	return result;
}



///
/// Validar estudiantes
export const acceptEstudiante = async (idUsuario, jwtLogin) => {
	try {
		let headersList = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${jwtLogin}`,
		}

		let reqOptions = {
			url: URL_BACK.acceptEstudiante + idUsuario,
			method: "PUT",
			headers: headersList,
			data: true
		}

		const response = await axios.request(reqOptions);
		return response.ok;
	} catch (error) {
		console.error('Error al actualizar el estudiante:', error);
		throw error;
	}
}



///
// Inscripcion a carrera
export const inscripcionCarrera = async (idUsuario, idCarrera, jwtLogin) => {
	try {
		let body = JSON.stringify({
			"idCarrera": idCarrera,
			"idEstudiante": idUsuario,
			"validado": false
		});

		let headersList = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${jwtLogin}`,
		}
		let reqOptions = {
			url: URL_BACK.inscripcionCarrera,
			method: "POST",
			headers: headersList,
			data: body
		}

		let response = await axios.request(reqOptions);
		//  console.log(response);
		return response;
	} catch (error) {
		return error.response;
	}
}



///
export const getCalificacionesAsignaturas = async (idEstudiante, idCarrera, jwtLogin) => {
	try {
		let headersList = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${jwtLogin}`,
		}

		let reqOptions = {
			url: `${URL_BACK.getCalificacionesAsignaturas}${idEstudiante}?idCarrera=${idCarrera}`,
			method: "GET",
			headers: headersList,
		};

		let response = await axios.request(reqOptions);
		return response.data;
	} catch (error) {
		return error.response;
	}
}



///
export const getCalificacionesExamenes = async (idEstudiante, idCarrera, jwtLogin) => {
	try {
		let headersList = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${jwtLogin}`,
		}

		let reqOptions = {
			url: `${URL_BACK.getCalificacionesExamenes}${idEstudiante}?idCarrera=${idCarrera}`,
			method: "GET",
			headers: headersList,
		};

		let response = await axios.request(reqOptions);
		return response.data;
	} catch (error) {
		return error.response;
	}
}