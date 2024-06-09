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

	// Formato fecha "dd-mm-yyyy"
	format() {
		const day = String(this.getDay()).padStart(2, '0');
		const month = String(this.getMonth()).padStart(2, '0');
		const year = this.getYear();
		return `${day}-${month}-${year}`;
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
		return this.date.getTime() === otherDate.date.getTime();
	}
}


///

export function fDate(date, newFormat) {
	const fm = newFormat || 'dd MMM yyyy';
	return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
	const fm = newFormat || 'dd MMM yyyy p';
	return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
	return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
	return date ? formatDistanceToNow(new Date(date), { addSuffix: true, }) : '';
}
