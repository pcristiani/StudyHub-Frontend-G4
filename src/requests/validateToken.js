import { validateTokenEndpoint, issuer } from '../utils/endpoints';
import ERRORS from '../utils/errors';
import { getParameters } from '../configuration';
import { validateTokenSecurity } from '../security';
import { MUTEX } from '../utils/constants';

const validateToken = async () => {
  const mutexRelease = await MUTEX.validateTokenMutex.acquire();

  try {
    const { idToken, clientId, production } = getParameters();

    if (!idToken) {
      return Promise.reject(ERRORS.INVALID_ID_TOKEN);
    }
    if (!clientId) {
      return Promise.reject(ERRORS.INVALID_CLIENT_ID);
    }

    const jwksResponse = await fetch(validateTokenEndpoint(), {
      method: 'GET',
      // pkPinning: !production && Platform.OS === 'ios',
      disableAllSecurity: production,
      sslPinning: !production && {
        certs: ['certificate'],
      },
      headers: {
        Accept: 'application/json; charset=utf-8',
      },
    });
    const jwksResponseJson = await jwksResponse.json();

    return validateTokenSecurity(jwksResponseJson, idToken, clientId, issuer());
  } catch (error) {
    return Promise.reject(ERRORS.FAILED_REQUEST);
  } finally {

    mutexRelease();
  }
};

export default validateToken;
