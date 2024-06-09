// Formatear la cédula con puntos y guiones.
export function formatoCi(ci) {
    if (ci.length === 8) {
        ci = ci.toString();
        const lastDigit = ci.slice(-1);
        const restDigits = ci.slice(0, -1);
        const reversedDigits = restDigits.split('').reverse().join('');
        const formattedReversed = reversedDigits.replace(/(\d{3})(?=\d)/g, '$1.');
        const ciConFormato = formattedReversed.split('').reverse().join('') + '-' + lastDigit;
        return ciConFormato;
    }
    return ci
}

///
// Quitar los puntos y guiones de la cédula.
export function borrarFormatoCi(ci) {
    const ciSinFortmato = ci.replace(/\D/g, '');
    return ciSinFortmato;
}
