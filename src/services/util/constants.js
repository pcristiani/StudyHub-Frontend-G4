const PORT = {
  back: 8080,   // Puerto backend
  front: 3000,  // Puerto frontend
}
const uriBaseBack = `https://studyhub-backend-production.up.railway.app`
const uriBaseFront = `https://frontstudyhub.vercel.app`

//  const uriBaseBack = `http://localhost:${PORT.back}`     // http://localhost:8080
// const uriBaseFront = `http://localhost:${PORT.front}`   // http://localhost:3000

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
  infoUsuarioUri: `/info-usuario`,
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
  altaFuncionarioCoordinadorUri: `/alta-funcionario-coordinador`,
  modificarFuncionarioUri: `/modificar-funcionario-coordinador`,
  listadosBusquedasUri: `/listados-busquedas`,
  resumenActividadUri: `/resumen-actividad`,

  //Uri Funcionario
  registrarHorarioAsignaturaUri: `/registrar-horario-asignatura`,
  RegistrarAsignaturaPeriodoExamenUri: `/registrar-asignatura-periodo-examen`,
  inscripcionExamenUri: `/inscripcion-examen`,
  inscripcionCarreraUri: `/inscripcion-carrera`,
  inscripcionAsignaturaUri: `/inscripcion-asignatura`,


  listadoCarrerasUri: `/listado-carreras`,
  InfoCarrerasUri: `/info-carrera`,
  listadoAsignaturasUri: `/listado-asignaturas`,
  listadoAsignaturasAprobadasUri: `/listado-asignaturas-aprobadas`,
  listadoAsignaturasNoAprobadasUri: `/listado-asignaturas-no-aprobadas`,
  generarActaExamenUri: `/generar-acta-examen`,
  generarActaCursoUri: `/generar-acta-curso`,
  calificacionesFinCursoUri: `/calificaciones-fin-curso`,
  calificacionesExamenUri: `/calificaciones-examen`,
}


///

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
  getEstudiantesPendientes: `${uriBaseBack}/api/usuario/getEstudiantesPendientes`, // GET
  getResumenActividad: `${uriBaseBack}/api/usuario/getResumenActividad/`, // GET
  acceptEstudiante: `${uriBaseBack}/api/usuario/acceptEstudiante/`,   // PUT
  modificarUsuario: `${uriBaseBack}/api/usuario/modificarUsuario/`,   // PUT
  modificarPerfil: `${uriBaseBack}/api/usuario/modificarPerfil/`,     // PUT
  modificarPassword: `${uriBaseBack}/api/usuario/modificarPassword/`, // PUT
  deleteUsuario: `${uriBaseBack}/api/usuario/bajaUsuario/`,           // DELETE

  // ESTUDIANTESERVICE
  getCalificacionesExamenes: `${uriBaseBack}/api/estudiante/getCalificacionesExamenes/`,       // GET
  getCalificacionesAsignaturas: `${uriBaseBack}/api/estudiante/getCalificacionesAsignaturas/`, // GET

  // DOCENTESERVICE
  getDocentes: `${uriBaseBack}/api/usuario/getDocentes`,            //GET
  getDocentesByAsignatura: `${uriBaseBack}/api/docente/getDocentesByAsignaturaId/`,  // GET
  altaDocente: `${uriBaseBack}/api/docente/altaDocente`,             // POST
  modificarDocente: `${uriBaseBack}/api/docente/modificarDocente/`,  // PUT
  deleteDocente: `${uriBaseBack}/api/docente/bajaDocente/`,          // DELETE


  ///
  // ASIGNATURASERVICE
  altaAsignatura: `${uriBaseBack}/api/asignatura/altaAsignatura`, // POST
  registroHorarios: `${uriBaseBack}/api/asignatura/registroHorarios/`,               // POST
  inscripcionAsignatura: `${uriBaseBack}/api/asignatura/inscripcionAsignatura`,      // POST
  registrarPreviaturas: `${uriBaseBack}/api/asignatura/registrarPreviaturas/`,       // POST
  cambiarResultadoCursada: `${uriBaseBack}/api/asignatura/cambiarResultadoCursada/`, // POST
  getAsignaturas: `${uriBaseBack}/api/asignatura/getAsignaturas`, // GET
  getAsignaturasDeCarrera: `${uriBaseBack}/api/asignatura/getAsignaturasDeCarrera/`,       // GET
  getAsignaturasDeEstudiante: `${uriBaseBack}/api/asignatura/getAsignaturasDeEstudiante/`, // GET
  getAsignaturasDeCarreraConExamen: `${uriBaseBack}/api/asignatura/getAsignaturasDeCarreraConExamen/`, // GET
  getAsignaturasAprobadas: `${uriBaseBack}/api/asignatura/getAsignaturasAprobadas/`,       // GET
  getAsignaturasNoAprobadas: `${uriBaseBack}/api/asignatura/getAsignaturasNoAprobadas/`,   // GET
  getAsignaturasConExamenPendiente: `${uriBaseBack}/api/asignatura/getAsignaturasConExamenPendiente/`, // GET
  getHorarios: `${uriBaseBack}/api/asignatura/getHorarios/`,     // GET
  getCursadasPendientes: `${uriBaseBack}/api/asignatura/cursadasPendientes`,       // GET
  getPreviasAsignatura: `${uriBaseBack}/api/asignatura/getPreviasAsignatura/`,     // GET
  getNoPreviasAsignatura: `${uriBaseBack}/api/asignatura/getNoPreviasAsignatura/`, // GET
  getActaAsignatura: `${uriBaseBack}/api/asignatura/getActa/`, // GET
  getAsignaturaById: `${uriBaseBack}/api/asignatura/getAsignaturaById/`, // GET


  ///

  // CARRERASERVICE
  altaCarrera: `${uriBaseBack}/api/carrera/altaCarrera`,                  // POST
  altaPeriodoDeExamen: `${uriBaseBack}/api/carrera/altaPeriodoDeExamen/`, // POST
  inscripcionCarrera: `${uriBaseBack}/api/carrera/inscripcionCarrera`,    // POST
  modificarCarrera: `${uriBaseBack}/api/carrera/modificarCarrera/`,       // PUT
  acceptEstudianteCarrera: `${uriBaseBack}/api/carrera/acceptEstudianteCarrera`,      // PUT
  asignarCoordinadorCarrera: `${uriBaseBack}/api/carrera/asignarCoordinadorCarrera/`, // PUT

  getCarreras: `${uriBaseBack}/api/carrera/getCarreras`,  // GET
  getCarrerasInscripcionesPendientes: `${uriBaseBack}/api/carrera/getCarrerasInscripcionesPendientes`, // GET
  getCarrerasInscripto: `${uriBaseBack}/api/carrera/getCarrerasInscripto/`,       // GET
  getCarrerasCoordinador: `${uriBaseBack}/api/carrera/getCarrerasCoordinador/`,   // GET
  getInscriptosPendientes: `${uriBaseBack}/api/carrera/getInscriptosPendientes/`, // GET
  getCarrerasConPeriodo: `${uriBaseBack}/api/carrera/getCarrerasConPeriodo`,      // GET
  getPeriodosDeCarrera: `${uriBaseBack}/api/carrera/getPeriodosDeCarrera/`,       // GET
  getPreviaturasGrafo: `${uriBaseBack}/getPreviaturasGrafo/`,                     // GET
  getCarreraById: `${uriBaseBack}/api/carrera/getCarreraById/`,                   // GET
  getCarrerasPublic: `${uriBaseBack}/getCarrerasPublic`,                          // GET


  ///

  // EXAMENSERVICE
  getExamenes: `${uriBaseBack}/api/examen/getExamenes/`, // GET
  getExamenesAsignatura: `${uriBaseBack}/api/examen/getExamenesAsignatura/`, // GET
  getExamenesPeriodo: `${uriBaseBack}/api/examen/getExamenesPeriodo/`,       // GET
  getCursadasExamen: `${uriBaseBack}/api/examen/getCursadasExamen/`,         // GET
  getActaExamen: `${uriBaseBack}/api/examen/getActa/`,  // GET
  getExamenesAsignaturaPorAnio: `${uriBaseBack}/api/examen/getExamenesAsignaturaPorAnio/`, // GET
  registroAsignaturaAPeriodo: `${uriBaseBack}/api/examen/registroAsignaturaAPeriodo`,      // POST
  inscripcionExamen: `${uriBaseBack}/api/examen/inscripcionExamen`, // POST
  cambiarResultadoExamen: `${uriBaseBack}/api/examen/cambiarResultadoExamen/`, // POST
}


///

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
  clientsecret: ``,
  // accessToken: ``,
};

const UI = {
  mtop: 10,
};

const redirigir = (url) => {
  window.location.href = url;
};

const COURSE = {
  graph: `digraph {
  bgcolor = transparent;shape = rectangle; style = "rounded";
  node[shape = rectangle, style = "rounded,filled", fillcolor = "#d7f8fd", color = "#2596be", fontcolor = black, fontsize = 12, fontname = "Arial"];
  edge[color = "#2596be"];
  rankdir = TB;`
};


export { URI_FRONT, URL_BACK, T_ROL, PARAMETERS, redirigir, uriBaseFront, COURSE, UI };