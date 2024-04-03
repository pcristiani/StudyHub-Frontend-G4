const errorCodes = {
  noError: 'no_error',
  invalidClientId: 'invalid_client_id',
  invalidRedirectUri: 'invalid_redirect_uri',
  invalidClientSecret: 'invalid_client_secret',
  accessDenied: 'access_denied',
  invalidAuthorizationCode: 'invalid_auhtorization_code',
  failedRequest: 'failed_request',
  invalidGrant: 'invalid_grant',
  invalidToken: 'invalid_token',
  invalidClient: 'invalid_client',
  invalidIdTokenHint: 'invalid_id_token_hint',
  invalidUrlLogout: 'invalid_url_logout',
  invalidLengthError: 'base64URL_to_base64_invalid_length_error',
  invalidBase64ToHexConversion: 'invalid_base64_to_hex_conversion',
  invalidState: 'invalid_state',
  invalidTokenType: 'invalid_token_type',
  invalidScope: 'invalid_scope',
  invalidExpiresIn: 'invalid_expires_in',
  invalidProduction: 'invalid_production',
  invalidParameterType: 'invalid_parameter_type',
};

const errorDescriptions = {
  noError: 'No error',
  invalidClientId: 'Parametro client_id invalido',
  invalidRedirectUri: 'Parametro redirect_uri invalido',
  invalidClientSecret: 'Parametro client_secret invalido',
  accessDenied: 'El propietario o el servidor de autorización de los recursos denegó la solicitud',
  invalidAuthorizationCode: 'authorization code invalido',
  failedRequest: "No se pudo hacer una solicitud",
  invalidGrant: "El parametro sub de autorización o el token de actualización es invalido, ha expirado, no coincide con el URI de redirección utilizado en la solicitud de autorización, o se emitió a otro cliente",
  invalidToken: "El token de acceso proporcionado ha expiradoo, revocado, malformado o inválido por otra razon",
  invalidClient: 'Client authentication invalido (por ejemplo, cliente desconocido, no se incluye autenticación del cliente o método de autenticación no compatible) ',
  invalidIdTokenHint: 'Parametro id_token_hint invalido',
  invalidUrlLogout: 'Url para logout',
  invalidSub: 'Sub devuelto por API no coincide con la sub',
  invalidIdToken: 'Parametro id_token invalido',
  invalidLengthError: 'La longitud del string base64url es incorrecta',
  invalidBase64ToHexConversion: 'Error mientras decodifica base64 a hex',
  invalidState: 'Parametro state invalido',
  invalidTokenType: 'Parametro token_type invalido',
  invalidScope: 'Parametro scope invalido',
  invalidExpiresIn: 'Parametro expires_in invalido',
  invalidProduction: 'Parametro production invalido',
  invalidParameterType: 'Parametro type invalido',
};

class ErrorNoError extends Error {
  constructor(
    errorCode = errorCodes.noError,
    errorDescription = errorDescriptions.noError,
    ...params
  ) {
    // Pasa los argumentos restantes (incluidos los específicos del proveedor) al constructor padre.
    super(...params);
    // Información de depuración personalizada.
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

class ErrorFailedRequest extends Error {
  constructor(
    errorCode = errorCodes.failedRequest,
    errorDescription = errorDescriptions.failedRequest,
    ...params
  ) {
    super(...params);
    this.name = 'failedRequest';
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
  }
}

class ErrorInvalidGrant extends Error {
  constructor(
    errorCode = errorCodes.invalidGrant,
    errorDescription = errorDescriptions.invalidGrant,
    ...params
  ) {
    super(...params);
    this.name = 'invalidGrant';
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
  }
}

class ErrorInvalidToken extends Error {
  constructor(
    errorCode = errorCodes.invalidToken,
    errorDescription = errorDescriptions.invalidToken,
    ...params
  ) {
    super(...params);
    this.name = 'invalidToken';
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
  }
}

class ErrorInvalidClient extends Error {
  constructor(
    errorCode = errorCodes.invalidClient,
    errorDescription = errorDescriptions.invalidClient,
    ...params
  ) {
    super(...params);
    this.name = 'invalidClienta';
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
  }
}

class ErrorInvalidIdTokenHint extends Error {
  constructor(
    errorCode = errorCodes.invalidIdTokenHint,
    errorDescription = errorDescriptions.invalidIdTokenHint,
    ...params
  ) {
    super(...params);
    this.name = 'invalidTokenHint';
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
  }
}

class ErrorInvalidUrlLogout extends Error {
  constructor(
    errorCode = errorCodes.invalidUrlLogout,
    errorDescription = errorDescriptions.invalidUrlLogout,
    ...params
  ) {
    super(...params);
    this.name = 'invalidUrlLogout';
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
  }
}

class ErrorInvalidSub extends Error {
  constructor(
    errorCode = errorCodes.invalidSub,
    errorDescription = errorDescriptions.invalidSub,
    ...params
  ) {
    super(...params);
    this.name = 'invalidSub';
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
  }
}

class ErrorInvalidIdToken extends Error {
  constructor(
    errorCode = errorCodes.invalidIdToken,
    errorDescription = errorDescriptions.invalidIdToken,
    ...params
  ) {
    super(...params);
    this.name = 'invalidIdToken';
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
  }
}

class ErrorInvalidState extends Error {
  constructor(
    errorCode = errorCodes.invalidState,
    errorDescription = errorDescriptions.invalidState,
    ...params
  ) {
    super(...params);
    this.name = 'invalidState';
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
  }
}

class ErrorBase64InvalidLength extends Error {
  constructor(
    errorCode = errorCodes.invalidLengthError,
    errorDescription = errorDescriptions.invalidLengthError,
    ...params
  ) {
    super(...params);
    this.name = 'invalidLengthError';
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
  }
}

class ErrorInvalidTokenType extends Error {
  constructor(
    errorCode = errorCodes.invalidTokenType,
    errorDescription = errorDescriptions.invalidTokenType,
    ...params
  ) {
    super(...params);
    this.name = 'invalidTokenType';
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
  }
}

class ErrorBase64ToHexConversion extends Error {
  constructor(
    errorCode = errorCodes.invalidBase64ToHexConversion,
    errorDescription = errorDescriptions.invalidBase64ToHexConversion,
    ...params
  ) {
    super(...params);
    this.name = 'invalidBase64ToHexConversion';
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
  }
}

class ErrorInvalidScope extends Error {
  constructor(
    errorCode = errorCodes.invalidScope,
    errorDescription = errorDescriptions.invalidScope,
    ...params
  ) {
    super(...params);
    this.name = 'invalidScope';
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
  }
}

class ErrorInvalidExpiresIn extends Error {
  constructor(
    errorCode = errorCodes.invalidExpiresIn,
    errorDescription = errorDescriptions.invalidExpiresIn,
    ...params
  ) {
    super(...params);
    this.name = 'invalidExpiresIn';
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
  }
}

class ErrorInvalidProduction extends Error {
  constructor(
    errorCode = errorCodes.invalidProduction,
    errorDescription = errorDescriptions.invalidProduction,
    ...params
  ) {
    super(...params);
    this.name = 'invalidProduction';
    this.errorCode = errorCode;
    this.errorDescription = errorDescription;
  }
}

class ErrorInvalidParameterType extends Error {
  constructor(
    errorCode = errorCodes.invalidParameterType,
    errorDescription = errorDescriptions.invalidParameterType,
    ...params
  ) {
    super(...params);
    this.name = 'invalidParameterType';
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
  FAILED_REQUEST: new ErrorFailedRequest(),
  INVALID_GRANT: new ErrorInvalidGrant(),
  INVALID_TOKEN: new ErrorInvalidToken(),
  INVALID_CLIENT: new ErrorInvalidClient(),
  INVALID_ID_TOKEN_HINT: new ErrorInvalidIdTokenHint(),
  INVALID_URL_LOGOUT: new ErrorInvalidUrlLogout(),
  INVALID_SUB: new ErrorInvalidSub(),
  INVALID_ID_TOKEN: new ErrorInvalidIdToken(),
  INVALID_BASE64_LENGTH: new ErrorBase64InvalidLength(),
  INVALID_BASE64_TO_HEX_CONVERSION: new ErrorBase64ToHexConversion(),
  INVALID_STATE: new ErrorInvalidState(),
  INVALID_TOKEN_TYPE: new ErrorInvalidTokenType(),
  INVALID_SCOPE: new ErrorInvalidScope(),
  INVALID_EXPIRES_IN: new ErrorInvalidExpiresIn(),
  INVALID_PRODUCTION: new ErrorInvalidProduction(),
  INVALID_PARAMETER_TYPE: new ErrorInvalidParameterType(),
};

export default ERRORS;
