const PORT = {
  back: 8080,
  front: 3000,
}

const uriBaseBack = `http://localhost:${PORT.back}`
const uriBaseFront = `http://localhost:${PORT.front}`

const URI_PAGES = {
  homeUri: `/`,
  panelUri: `/panel`,
  cursosUri: `/cursos`,
  inscripcionUri: `/inscripciones`,
  ayudaUri: `/ayuda`,

  loginUri: `/login`,
  logoutUri: `/logout`,
  signupUri: `/registrarte`,
}

const URL_BACK = {
  loginTest: `${uriBaseBack}/login/test`,
  getUser: `${uriBaseBack}/api/users/getUser/6`,
  courseRelations: `${uriBaseBack}/course-relations`,
}

const REQUEST_TYPES = {
  login: `login`,
  get_token: `gettoken`,
  get_refresh_token: `getrefreshtoken`,
  getUserInfo: `/api/users/getUser/`,
  logout: `logout`,
  validate_token: `validatetoken`,
};

const PARAMETERS = {
  redirecturi: `redirectUri`,
  clientid: `clientId`,
  code: `code`,
  clientsecret: "emrYoruZKktTVfw5",
  tokenBearer: `44b4ff323b3509c5b897e8199c0655197797128fa71d81335f68b9a2a3286f30`,
};

const redirigir = (url) => {
  window.location.href = url;
};

export { URI_PAGES, URL_BACK, REQUEST_TYPES, PARAMETERS, redirigir };