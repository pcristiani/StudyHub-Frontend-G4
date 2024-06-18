export function formatFecha(data) {
    let fechaExamen = new Date(data);
    const year = fechaExamen.getFullYear();
    const month = String(fechaExamen.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
    const day = String(fechaExamen.getDate()).padStart(2, '0');
    const hours = String(fechaExamen.getHours()).padStart(2, '0');
    const minutes = String(fechaExamen.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year} - ${hours}:${minutes} hs`;
}

// const f = new Date('2024-06-13');
// const dtf = new DtFecha(f);
// console.log('DtFecha: ', dtf.format());


///
/*
'dd MMM yyyy p' => '10 Dec 2023 14:00'
'dd MMM yyyy' => '10 Dec 2023'
'dd/MM/yyyy' => '10/12/2023'
'yyyy-MM-dd' => '2023-12-10'
'yyyy-MM-dd HH:mm:ss' => '2023-12-10 14:00:00'
'yyyy-MM-dd HH:mm:ss.SSS' => '2023-12-10 14:00:00.000'
*/


// export function fDate(date, newFormat) {
// 	const fm = newFormat || 'dd MMM yyyy';
// 	return date ? format(new Date(date), fm) : '';
// }

// export function fDateTime(date, newFormat) {
// 	const fm = newFormat || 'dd MMM yyyy p';
// 	return date ? format(new Date(date), fm) : '';
// }

// export function fTimestamp(date) {
// 	return date ? getTime(new Date(date)) : '';
// }

// export function fToNow(date) {
// 	return date ? formatDistanceToNow(new Date(date), { addSuffix: true, }) : '';
// }
