/* eslint-disable no-throw-literal */
import { URL_BACK } from '../util/constants'
import axios from 'axios';


// Función para obtener las asignaturas
export const getAsignaturas = async (jwtLogin) => {
	const url = URL_BACK.getAsignaturas;

	const headers = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${jwtLogin}`
	}

	const resp = await fetch(url, {
		method: "GET",
		headers: headers
	});

	const data = await resp.json();
	return data;
}


///
// export const getAsignaturasDeCarrera = async (idCarrera, jwtLogin) => {
// 	const url = URL_BACK.getAsignaturasDeCarrera;

// 	let headersList = {
// 		'Content-Type': 'application/json',
// 		'Authorization': `Bearer ${jwtLogin}`
// 	}

// 	let response = await fetch(url + idCarrera, {
// 		method: "GET",
// 		headers: headersList
// 	});

// 	const data = await response.json();
// 	console.log("Asignaturas de carrera: ", data);
// 	return data.body;
// }


///
export const getAsignaturasDeCarreraConExamen = async (idCarrera, jwtLogin) => {
	try {
		let headersList = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${jwtLogin}`,
		}
		let reqOptions = {
			url: URL_BACK.getAsignaturasDeCarreraConExamen + idCarrera,
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
export const getAsignaturasNoAprobadas = async (idEstudiante, jwtLogin) => {
	const url = URL_BACK.getAsignaturasNoAprobadas;

	let headersList = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${jwtLogin}`
	}
	let response = await fetch(url + idEstudiante, {
		method: "GET",
		headers: headersList
	});

	const data = await response.json();
	return data;
}

export const getAsignaturasAprobadas = async (idEstudiante, jwtLogin) => {
	const url = URL_BACK.getAsignaturasAprobadas;

	let headersList = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${jwtLogin}`
	}
	let response = await fetch(url + idEstudiante, {
		method: "GET",
		headers: headersList
	});

	const data = await response.json();
	return data;
}


///
export const altaAsignatura = async (nombre, creditos, descripcion, departamento, previaturas, idCarrera, idDocente, asignaturaConExamen, jwtLogin) => {
	try {
		let body = {
			"nombre": nombre,
			"creditos": creditos,
			"descripcion": descripcion,
			"departamento": departamento,
			"tieneExamen": asignaturaConExamen,
			"activa": true,
			"previaturas": previaturas,
			"idCarrera": idCarrera,
			"idDocentes": idDocente
		};
		let headersList = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${jwtLogin}`,
		}
		let reqOptions = {
			url: URL_BACK.altaAsignatura,
			method: "POST",
			headers: headersList,
			data: JSON.stringify(body)
		}

		let response = await axios.request(reqOptions);
		return response;
	} catch (error) {
		return error.response;
	}
};



///
export const getDocentesByAsignatura = async (idAsignatura, jwtLogin) => {
	const url = URL_BACK.getDocentesByAsignatura;

	let headersList = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${jwtLogin}`
	}
	let response = await fetch(url + idAsignatura, {
		method: "GET",
		headers: headersList
	});

	const data = await response.json();
	return data;
}


///
export const registroHorarios = async (idDocente, anio, horarioData, idAsignatura, jwtLogin) => {
	try {
		let body = {
			"idDocente": idDocente,
			"anio": anio,
			"dtHorarioDias": horarioData
		};
		let headersList = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${jwtLogin}`,
		}
		let reqOptions = {
			url: URL_BACK.registroHorarios + idAsignatura,
			method: "POST",
			headers: headersList,
			data: body
		}

		let response = await axios.request(reqOptions);
		return response;
	} catch (error) {
		return error.response;
	}
};



///
export const getHorarios = async (idAsignatura, jwtLogin) => {
	const url = URL_BACK.getHorarios;

	let headersList = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${jwtLogin}`
	}

	let response = await fetch(url + idAsignatura, {
		method: "GET",
		headers: headersList
	});

	const data = await response.json();
	return data;
}


// ?
///
export const registroPreviaturas = async (idAsignatura, idPreviaturas, jwtLogin) => {
	try {
		let body = JSON.stringify(idPreviaturas);
		let headersList = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${jwtLogin}`,
		}
		let reqOptions = {
			url: URL_BACK.registrarPreviaturas + idAsignatura,
			method: "POST",
			headers: headersList,
			data: body
		}

		let response = await axios.request(reqOptions);
		return response;
	} catch (error) {
		return error.response;
	}
};



///
export const getPreviasAsignatura = async (idAsignatura, jwtLogin) => {
	const url = URL_BACK.getPreviasAsignatura;
	let headersList = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${jwtLogin}`
	}
	let response = await fetch(url + idAsignatura, {
		method: "GET",
		headers: headersList
	});

	const data = await response.json();
	return data;
}



///
export const getNoPreviasAsignatura = async (idAsignatura, jwtLogin) => {
	const url = URL_BACK.getNoPreviasAsignatura;
	let headersList = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${jwtLogin}`
	}
	let response = await fetch(url + idAsignatura, {
		method: "GET",
		headers: headersList
	});

	const data = await response.json();
	return data;
}



///
export const inscripcionAsignatura = async (idEstudiante, idAsignatura, idHorario, jwtLogin) => {
	try {
		let body = {
			"idEstudiante": idEstudiante,
			"idAsignatura": idAsignatura,
			"idHorario": idHorario
		};
		let headersList = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${jwtLogin}`,
		}
		let reqOptions = {
			url: URL_BACK.inscripcionAsignatura,
			method: "POST",
			headers: headersList,
			data: body
		}

		let response = await axios.request(reqOptions);
		return response;
	} catch (error) {
		return error.response;
	}
};



///
export const getPreviaturasGrafo = async (idCarrera, jwtLogin) => {
	const url = URL_BACK.getPreviaturasGrafo;
	let headersList = {
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${jwtLogin} `,
	}
	let response = await fetch(url + idCarrera, {
		method: "GET",
		headers: headersList
	});

	let result = await response.text();
	return result;
}



///
export const getCursadasPendientes = async (idAsignatura, anio, jwtLogin) => {
	try {
		let headersList = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${jwtLogin}`,
		}
		let reqOptions = {
			url: `${URL_BACK.getCursadasPendientes}?anio=${anio}&idAsignatura=${idAsignatura}`,
			method: "GET",
			headers: headersList,
		};

		let response = await axios.request(reqOptions);
		return response;
	} catch (error) {
		return error.response;
	}
}



///
export const cambiarResultadoCursada = async (idCursada, calificacion, jwtLogin) => {
	try {
		let headersList = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${jwtLogin}`,
		}
		let reqOptions = {
			url: `${URL_BACK.cambiarResultadoCursada}${idCursada}?calificacion=${calificacion}`,
			method: "POST",
			headers: headersList,
		}

		let response = await axios.request(reqOptions);
		return response;
	} catch (error) {
		return error.response;
	}
};



///
export const getActaAsignatura = async (idHorarioAsignatura, jwtLogin) => {
	try {
		let headersList = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${jwtLogin}`,
		}
		let reqOptions = {
			url: URL_BACK.getActaAsignatura + idHorarioAsignatura,
			method: "GET",
			headers: headersList,
		};

		let response = await axios.request(reqOptions);
		return response;
	} catch (error) {
		return error.response;
	}
}



///
export const getAsignaturaById = async (idAsignatura, jwtLogin) => {
	try {
		let headersList = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${jwtLogin}`,
		}

		let reqOptions = {
			url: URL_BACK.getAsignaturaById + idAsignatura,
			method: "GET",
			headers: headersList,
		};

		let response = await axios.request(reqOptions);
		return response;
	} catch (error) {
		return error.response;
	}
}



///
export const getAsignaturasDeEstudiante = async (idEstudiante, jwtLogin) => {
	try {
		let headersList = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${jwtLogin}`,
		}
		let reqOptions = {
			url: URL_BACK.getAsignaturasDeEstudiante + idEstudiante,
			method: "GET",
			headers: headersList,
		};

		let response = await axios.request(reqOptions);
		return response.data;
	} catch (error) {
		return error.response;
	}
}

export const getAsignaturasDeCarrera = async (idCarrera, jwtLogin) => {
	try {
		let headersList = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${jwtLogin}`,
		}
		let reqOptions = {
			url: URL_BACK.getAsignaturasDeCarrera + idCarrera,
			method: "GET",
			headers: headersList,
		};
		let response = await axios.request(reqOptions);
		return response.data.body;
	} catch (error) {
		return error.response;
	}
}