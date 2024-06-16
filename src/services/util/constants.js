const PORT = {
  back: 8080,   // Puerto backend
  front: 3000,  // Puerto frontend
}
// http://localhost:3000/  Encoder
// http://localhost:3000/  Url encode
// const uriBaseBack = `https://studyhub-backend-production.up.railway.app`
//const uriBaseFront = `https://frontstudyhub.vercel.app`

const uriBaseBack = `http://localhost:${PORT.back}`     // http://localhost:8080
const uriBaseFront = `http://localhost:${PORT.front}`   // http://localhost:3000

// ? http://localhost:3000/
const URI_FRONT = {
  // Uri Estudiante
  homeUri: `/`,
  planEstudiosUri: `/plan-estudios`,
  inscripcionesUri: `/inscripciones`,
  solicitudesUri: `/solicitudes`,
  gestionUri: `/gestion`,

  preferenciasUri: `/preferencias`,
  editPerfilUri: `/edit-perfil`,
  modificarPasswordUri: `/modificar-password`,

  // Uri Invitado
  novedadesUri: `/novedades`,
  dashboardUri: `/dashboard-admin`,
  //pregFrecuentesUri: `/preg-frecuentes`,
  contactoUri: `/contacto`,

  // Uri Auth
  loginUri: `/login`,
  logoutUri: `/logout`,
  registrarseUri: `/registrarse`,
  forgotPassUri: `/olvido-contrasenia?token=`,
  resetPassUri: `/resetPassword/?token=`,

  //Uri Administrador
  validarEstudiantesUri: `/validar-estudiantes`,
  modificarFuncionarioUri: `/modificar-funcionario-coordinador`,
  listadosBusquedasUri: `/listados-busquedas`,
  resumenActividadUri: `/resumen-actividad`,

  //Uri Funcionario
  registrarHorarioAsignaturaUri: `/registrar-horario-asignatura`,
  RegistrarAsignaturaPeriodoExamenUri: `/registrar-asignatura-periodo-examen`,
  inscripcionExamenUri: `/inscripcion-examen`,

}

// ? http://localhost:8080/
const URL_BACK = {
  // LOGINSERVICE
  loginTest: `${uriBaseBack}/iniciarSesion`,   // POST
  cerrarSesion: `${uriBaseBack}/cerrarSesion`, // POST

  ///
  // USUARIOSERVICE
  registerUsr: `${uriBaseBack}/registerUsuario`,         // POST
  recuperarPassword: `${uriBaseBack}/recuperarPassword`, // POST
  forgotPassword: `${uriBaseBack}/forgotPassword`,       // POST

  getUsuarios: `${uriBaseBack}/api/usuario/getUsuarios`, // GET
  getUsuario: `${uriBaseBack}/api/usuario/getUsuario/`,  // GET

  modificarUsuario: `${uriBaseBack}/api/usuario/modificarUsuario/`,   // PUT
  modificarPerfil: `${uriBaseBack}/api/usuario/modificarPerfil/`,     // PUT
  modificarPassword: `${uriBaseBack}/api/usuario/modificarPassword/`, // PUT
  deleteUsuario: `${uriBaseBack}/api/usuario/bajaUsuario/`,           // DELETE

  acceptEstudiante: `${uriBaseBack}/api/usuario/acceptEstudiante/`,                // PUT
  getEstudiantesPendientes: `${uriBaseBack}/api/usuario/getEstudiantesPendientes`, // GET


  ///
  // DOCENTESERVICE
  altaDocente: `${uriBaseBack}/api/docente/altaDocente`,             // POST
  modificarDocente: `${uriBaseBack}/api/docente/modificarDocente/`,  // PUT
  deleteDocente: `${uriBaseBack}/api/docente/bajaDocente/`,          // DELETE
  getDocentes: `${uriBaseBack}/api/usuario/getDocentes`,                             // GET
  getDocentesByAsignatura: `${uriBaseBack}/api/docente/getDocentesByAsignaturaId/`,  // GET


  ///
  // ASIGNATURASERVICE
  registroHorarios: `${uriBaseBack}/api/asignatura/registroHorarios/`,          // POST
  inscripcionAsignatura: `${uriBaseBack}/api/asignatura/inscripcionAsignatura`, // POST
  altaAsignatura: `${uriBaseBack}/api/asignatura/altaAsignatura`, // POST
  registrarPreviaturas: `${uriBaseBack}/api/asignatura/registrarPreviaturas/`, // POST

  getHorarios: `${uriBaseBack}/api/asignatura/getHorarios/`,     // GET
  getAsignaturas: `${uriBaseBack}/api/asignatura/getAsignaturas`, // GET
  getAsignaturasDeCarrera: `${uriBaseBack}/api/asignatura/getAsignaturasDeCarrera/`, // GET
  getAsignaturasDeCarreraConExamen: `${uriBaseBack}/api/asignatura/getAsignaturasDeCarreraConExamen/`, // GET
  getAsignaturasDeEstudiante: `${uriBaseBack}/api/asignatura/getAsignaturasDeEstudiante/`, // GET
  getAsignaturasNoAprobadas: `${uriBaseBack}/api/asignatura/getAsignaturasNoAprobadas/`, // GET
  getPreviasAsignatura: `${uriBaseBack}/api/asignatura/getPreviasAsignatura/`, // GET
  getNoPreviasAsignatura: `${uriBaseBack}/api/asignatura/getNoPreviasAsignatura/`, // GET
  cursadasPendientes: `${uriBaseBack}/api/asignatura/cursadasPendientes`, // GET
  cambiarResultadoCursada: `${uriBaseBack}/api/asignatura/cambiarResultadoCursada/`, // GET
  getAsignaturasConExamenPendiente: `${uriBaseBack}/api/asignatura/getAsignaturasConExamenPendiente/`, // GET

  ///
  // CARRERASERVICE
  modificarCarrera: `${uriBaseBack}/api/carrera/modificarCarrera/`, // PUT
  asignarCoordinadorCarrera: `${uriBaseBack}/api/carrera/asignarCoordinadorCarrera/`, // PUT
  acceptEstudianteCarrera: `${uriBaseBack}/api/carrera/acceptEstudianteCarrera`,      // PUT
  inscripcionCarrera: `${uriBaseBack}/api/carrera/inscripcionCarrera`,    // POST
  altaPeriodoDeExamen: `${uriBaseBack}/api/carrera/altaPeriodoDeExamen/`, // POST
  altaCarrera: `${uriBaseBack}/api/carrera/altaCarrera`,                  // POST
  getInscriptosPendientes: `${uriBaseBack}/api/carrera/getInscriptosPendientes/`, // GET
  getCarreras: `${uriBaseBack}/api/carrera/getCarreras`, // GET
  courseRelations: `${uriBaseBack}/course-relations`, // GET

  getCarrerasInscripto: `${uriBaseBack}/api/carrera/getCarrerasInscripto/`, // GET 
  getCarrerasInscripcionesPendientes: `${uriBaseBack}/api/carrera/getCarrerasInscripcionesPendientes`, // GET
  getCarrerasConPeriodo: `${uriBaseBack}/api/carrera/getCarrerasConPeriodo`, // GET
  getPeriodosDeCarrera: `${uriBaseBack}/api/carrera/getPeriodosDeCarrera/`, // GET
  getPreviaturasGrafo: `${uriBaseBack}/api/carrera/getPreviaturasGrafo/`, // GET

  ///
  // Examen
  inscripcionExamen: `${uriBaseBack}/api/examen/inscripcionExamen`, // POST
  registroAsignaturaAPeriodo: `${uriBaseBack}/api/examen/registroAsignaturaAPeriodo`, // POST

  getExamenesAsignatura: `${uriBaseBack}/api/examen/getExamenesAsignatura/`, // GET
  cambiarResultadoExamen: `${uriBaseBack}/api/examen/cambiarResultadoExamen/`, // GET
  calificacionesExamen: `${uriBaseBack}/api/examen/getCalificacionesExamen/`, // GET
  getCursadasExamen: `${uriBaseBack}/api/examen/getCursadasExamen/`, // GET
  getCursadasExamenPendientes: `${uriBaseBack}/api/examen/getCursadasExamenPendientes`, // GET
  getExamenesAsignaturaPorAnio: `${uriBaseBack}/api/examen/getExamenesAsignaturaPorAnio/`, // GET
}


const T_ROL = {
  ADMIN: `A`,
  ESTUDIANTE: `E`,
  COORDINADOR: `C`,
  DOCENTE: `D`,
  FUNCIONARIO: `F`,
  INVITADO: `I`,
};

const PARAMETERS = {
  redirecturi: `redirectUri`,
  clientid: `clientId`,
  code: `code`,
  clientsecret: `emrYoruZKktTVfw5`,
  // accessToken: ``,
};


const redirigir = (url) => {
  window.location.href = url;
};


export { URI_FRONT, URL_BACK, T_ROL, PARAMETERS, redirigir, uriBaseFront };