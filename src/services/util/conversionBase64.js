// Convertir texto a base64.
function textToBase64(text) {
  return btoa(text);
}

// Convertir base64 a texto.
function base64ToText(base64) {
  return atob(base64);
}

// Convertir base64 a urlImagen.
function base64ToImage(base64) {
  let img = document.createElement('img');
  img.src = base64;

  return img.src;
  // let base64 = "aHR0cHM6Ly9qd3QuaW8vaW1nL2xvZ28tYXNzZXQuc3Zn"; //
  //  return  document.getElementById('root').appendChild(img);
}

// Codificar JWT
function codificarJwt(header, payload, secret) {
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(payload));
  const signature = btoa(encodedHeader + "." + encodedPayload + secret);
  return encodedHeader + "." + encodedPayload + "." + signature;
}

// Decodificar JWT
function decodificaJwt(strJwt) {
  let parts = strJwt.split('.');
  if (parts.length !== 3) {
    throw new Error('Token JWT inválido');
  }

  let base64Url = parts[1];
  let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  try {
    console.log('decodificaJwt: ', JSON.parse(jsonPayload));
  } catch (error) {
    console.error(error);
  }
  return JSON.parse(jsonPayload);
}


export { textToBase64, base64ToText, base64ToImage, decodificaJwt, codificarJwt };