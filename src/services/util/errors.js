const errorCodes = {
  noError: 'no_error',
  invalidClientId: 'invalid_client_id',
  invalidClientSecret: 'invalid_client_secret',
  invalidRedirectUri: 'invalid_redirect_uri',
  accessDenied: 'access_denied',
  invalidAuthorizationCode: 'invalid_auhtorization_code',
  failedRequest: 'failed_request',
  invalidToken: 'invalid_token',
  invalidUrlLogout: 'invalid_url_logout',
  invalidLengthError: 'base64URL_to_base64_invalid_length_error',
  invalidBase64ToHexConversion: 'invalid_base64_to_hex_conversion',
};

const errorDescriptions = {
  noError: 'No error',
  invalidClientId: 'Parametro client_id invalido',
  invalidClientSecret: 'Parametro client_secret invalido',
  invalidRedirectUri: 'Parametro redirect_uri invalido',
  accessDenied: 'El propietario o el servidor de autorización de los recursos denegó la solicitud',
  invalidAuthorizationCode: 'authorization code invalido',
  failedRequest: "No se pudo hacer una solicitud",
  invalidToken: "El token de acceso proporcionado ha expirado, revocado, o inválido por otra razon",
  invalidUrlLogout: 'Url para logout',
  invalidLengthError: 'La longitud del string base64url es incorrecta',
  invalidBase64ToHexConversion: 'Error mientras decodifica base64 a hex',
};

class ErrorNoError extends Error {
  constructor(
    errorCode = errorCodes.noError,
    errorDescription = errorDescriptions.noError,
    ...params
  ) {
    super(...params);
    this.name = 'noError';
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
  }
}

class ErrorInvalidClientId extends Error {
  constructor(
    errorCode = errorCodes.invalidClientId,
    errorDescription = errorDescriptions.invalidClientId,
    ...params
  ) {
    super(...params);
    this.name = 'invalidClientId';
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
  }
}

class ErrorInvalidRedirectUri extends Error {
  constructor(
    errorCode = errorCodes.invalidRedirectUri,
    errorDescription = errorDescriptions.invalidRedirectUri,
    ...params
  ) {
    super(...params);
    this.name = 'invalidRedirectUri';
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
  }
}

class ErrorInvalidClientSecret extends Error {
  constructor(
    errorCode = errorCodes.invalidClientSecret,
    errorDescription = errorDescriptions.invalidClientSecret,
    ...params
  ) {
    super(...params);
    this.name = 'invalidClientSecret';
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
  }
}

class ErrorAccessDenied extends Error {
  constructor(
    errorCode = errorCodes.accessDenied,
    errorDescription = errorDescriptions.accessDenied,
    ...params
  ) {
    super(...params);
    this.name = 'accessDenied';
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
  }
}

class ErrorInvalidAuthorizationCode extends Error {
  constructor(
    errorCode = errorCodes.invalidAuthorizationCode,
    errorDescription = errorDescriptions.invalidAuthorizationCode,
    ...params
  ) {
    super(...params);
    this.name = 'invalidAuthorizationCode';
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
  }
}


const ERRORS = {
  NO_ERROR: new ErrorNoError(),
  INVALID_CLIENT_ID: new ErrorInvalidClientId(),
  INVALID_REDIRECT_URI: new ErrorInvalidRedirectUri(),
  INVALID_CLIENT_SECRET: new ErrorInvalidClientSecret(),
  ACCESS_DENIED: new ErrorAccessDenied(),
  INVALID_AUTHORIZATION_CODE: new ErrorInvalidAuthorizationCode(),
};

export default ERRORS;
