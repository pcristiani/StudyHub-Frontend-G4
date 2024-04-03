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
  //  return  document.getElementById('root').appendChild(img);
}

// let base64 = "aHR0cHM6Ly9qd3QuaW8vaW1nL2xvZ28tYXNzZXQuc3Zn"; // Reemplaza esto con tu cadena base64, ejemplo url img

export { textToBase64, base64ToText, base64ToImage };
