import { decode } from 'base-64';
import ERRORS from './errors';

const base64URLtoBase64 = input => {
  let res = input.replace(/-/g, '+').replace(/_/g, '/');
  const pad = input.length % 4;
  if (pad) {
    if (pad === 1) {
      throw ERRORS.INVALID_BASE64_LENGTH;
    }
    res += new Array(5 - pad).join('=');
  }
  return res;
};

const base64ToHex = str => {
  try {
    const raw = decode(str);
    let result = '';
    for (let i = 0; i < raw.length; i += 1) {
      const hex = raw.charCodeAt(i).toString(16);
      result += hex.length === 2 ? hex : `0${hex}`;
    }
    return result.toUpperCase();
  } catch (error) {
    throw ERRORS.INVALID_BASE64_TO_HEX_CONVERSION;
  }
};

export { base64ToHex, base64URLtoBase64 };
