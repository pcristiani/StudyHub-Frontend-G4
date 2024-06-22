import { format, getTime, formatDistanceToNow } from 'date-fns';

export default class DtFecha {

	constructor(fechaInicio) {
		if (typeof fechaInicio === 'string' || typeof fechaInicio === 'number') {
			fechaInicio = new Date(fechaInicio);
		}
		let day = String(fechaInicio.getUTCDate()).padStart(2, '0');
		let month = String(fechaInicio.getUTCMonth() + 1).padStart(2, '0');
		let year = fechaInicio.getUTCFullYear();
		this.date = new Date(year, month - 1, day);
	}

	getYear() {
		return this.date.getFullYear();
	}

	getMonth() {
		return this.date.getMonth() + 1;
	}

	getDay() {
		return this.date.getDate();
	}

	// Formato fecha 05/06/2024
	format() {
		const day = String(this.getDay()).padStart(2, '0');
		const month = String(this.getMonth()).padStart(2, '0');
		const year = this.getYear();
		return `${day}/${month}/${year}`;
	}

	// Formato fecha 2024-06-13 01:50:21
	formatoSistema(date) {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		const seconds = String(date.getSeconds()).padStart(2, '0');
		return `${year}-${month}-${day} ${hours}:s${minutes}:${seconds}`;
	}


	addDays(days) {
		this.date.setDate(this.date.getDate() + days);
	}

	addMonths(months) {
		this.date.setMonth(this.date.getMonth() + months);
	}

	addYears(years) {
		this.date.setFullYear(this.date.getFullYear() + years);
	}

	isEqualTo(otherDate) {
		console.log('this.date', this.date);
		return this.date.getTime() === otherDate.date.getTime();
	}

	fDate(date, newFormat) {
		const fm = newFormat || 'dd MMM yyyy';
		return date ? format(new Date(date), fm) : '';
	}

	fDateTime(date, newFormat) {
		const fm = newFormat || 'dd MMM yyyy p';
		return date ? format(new Date(date), fm) : '';
	}

	fTime(date, newFormat) {
		const fm = newFormat || 'HH:mm';
		return date ? format(new Date(date), fm) : '';
	}

	fTimestamp(date) {
		return date ? getTime(new Date(date)) : '';
	}

	fToNow(date) {
		return date ? formatDistanceToNow(new Date(date), { addSuffix: true, }) : '';
	}

	fDataLocal() {
		const date = new Date();
		const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
		return date.toLocaleDateString('es-UY', options);
	}
}


const f = new Date('2024-06-13');
const dtf = new DtFecha(f);
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
