const PORT = {
  back: 8080,   // Puerto backend
  front: 3000,  // Puerto frontend
}

//const uriBaseBack = `https://studyhub-backend-production.up.railway.app`
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
}

// ? http://localhost:8080/
const URL_BACK = {
  // loginService
  loginTest: `${uriBaseBack}/iniciarSesion`,   // POST
  cerrarSesion: `${uriBaseBack}/cerrarSesion`, // POST

  ///
  // usuarioService
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
  // docenteService
  altaDocente: `${uriBaseBack}/api/docente/altaDocente`,             // POST
  modificarDocente: `${uriBaseBack}/api/docente/modificarDocente/`,  // PUT
  deleteDocente: `${uriBaseBack}/api/docente/bajaDocente/`,          // DELETE

  getDocentes: `${uriBaseBack}/api/usuario/getDocentes`,                             // GET
  getDocentesByAsignatura: `${uriBaseBack}/api/usuario/getDocentesByAsignaturaId/`,  // GET

  ///
  // asignaturaService
  registroHorarios: `${uriBaseBack}/api/asignatura/registroHorarios/`,          // POST
  inscripcionAsignatura: `${uriBaseBack}/api/asignatura/inscripcionAsignatura`, // POST
  getHorarios: `${uriBaseBack}/api/asignatura/getHorarios/`,     // POST // ! VER
  altaAsignatura: `${uriBaseBack}/api/asignatura/altaAsignatura`, // POST
  getAsignaturas: `${uriBaseBack}/api/asignatura/getAsignaturas`, // GET
  getAsignaturasDeCarrera: `${uriBaseBack}/api/asignatura/getAsignaturasDeCarrera/`, // GET
  courseRelations: `${uriBaseBack}/course-relations`, // GET

  ///
  // carreraService
  modificarCarrera: `${uriBaseBack}/api/carrera/modificarCarrera/`, // PUT
  asignarCoordinadorCarrera: `${uriBaseBack}/api/carrera/asignarCoordinadorCarrera/`, // PUT
  acceptEstudianteCarrera: `${uriBaseBack}/api/carrera/acceptEstudianteCarrera`,      // PUT
  inscripcionCarrera: `${uriBaseBack}/api/carrera/inscripcionCarrera`,    // POST
  altaPeriodoDeExamen: `${uriBaseBack}/api/carrera/altaPeriodoDeExamen/`, // POST
  altaCarrera: `${uriBaseBack}/api/carrera/altaCarrera`,                  // POST
  getInscriptosPendientes: `${uriBaseBack}/api/carrera/getInscriptosPendientes/`, // GET
  getCarreras: `${uriBaseBack}/api/carrera/getCarreras`, // GET

  getCarrerasInscripto: `${uriBaseBack}/api/carrera/getCarrerasInscripto/`, // GET
  getCarrerasInscripcionesPendientes: `${uriBaseBack}/api/carrera/getCarrerasInscripcionesPendientes`, // GET
}

const PARAMETERS = {
  redirecturi: `redirectUri`,
  clientid: `clientId`,
  code: `code`,
  clientsecret: `emrYoruZKktTVfw5`,
  // accessToken: ``,
};

const TIPO_ROL = {
  ADMIN: `A`,
  ESTUDIANTE: `E`,
  COORDINADOR: `C`,
  DOCENTE: `D`,
  FUNCIONARIO: `F`,
  INVITADO: `I`,
};

const redirigir = (url) => {
  window.location.href = url;
};


export { TIPO_ROL, URI_FRONT, URL_BACK, PARAMETERS, redirigir, uriBaseFront };