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

    // Formatear la fecha como "dd-mm-yyyy"
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

