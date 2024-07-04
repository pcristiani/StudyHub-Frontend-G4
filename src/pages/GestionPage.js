import React, { useContext, useState, useEffect } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import { jsPDF } from "jspdf";
import { AuthContext } from '../context/AuthContext';
import { Stack } from '@mui/joy';
import { formatoCi } from '../services/util/formatoCi';
import { getCalificacionesAsignaturas, getCalificacionesExamenes } from '../services/requests/estudianteService';
import { getCarrerasInscripto, getCarreraById } from '../services/requests/carreraService';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import { formatFechaEmision } from '../services/util/formatoFecha';
import { errors } from '../services/util/errors';


const GestionPage = () => {
	const { user } = useContext(AuthContext);
	const [open, setOpen] = useState(false);
	const [pdfUrl, setPdfUrl] = useState('');
	const [carreraData, setCarreraData] = useState([]);

	useEffect(() => {
		const fetchCarreras = async () => {
			try {
				const result = await getCarrerasInscripto(user.id, user.jwtLogin);
				setCarreraData(result);
			} catch (error) {
				//	setError(error.message);
			}
		};
		fetchCarreras();
	}, [user]);

	useEffect(() => {
		if (carreraData) {
			//	console.log("Carreras: ", carreraData);
		}
	}, [carreraData]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		let idC = data.get('idcarrera');
		// console.log("Carrera:sss ", idC.status);
		if (idC !== null && idC !== undefined && idC !== "") {
			visualizarPDF(idC);
		} else
			errors("¡Advertencia!", "No es posible generar escolaridad.", 400, true);

	};

	function fechaEmision() {
		const date = new Date();
		const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
		date.toLocaleDateString('es-UY', options);
		return formatFechaEmision(date);
	}

	const convertirURLaBase64 = (url) => {
		return new Promise((resolve, reject) => {
			let img = new Image();
			img.crossOrigin = 'Anonymous';
			img.onload = () => {
				let canvas = document.createElement('canvas');
				let ctx = canvas.getContext('2d');
				canvas.height = img.height;
				canvas.width = img.width;
				ctx.drawImage(img, 0, 0);
				let dataURL = canvas.toDataURL('image/png');
				resolve(dataURL);
			};
			img.onerror = () => {
				reject(new Error('No se pudo cargar la imagen.'));
			};
			img.src = url;
		});
	};

	const visualizarPDF = async (idCarrera) => {
		const carrera = await getCarreraById(idCarrera, user.jwtLogin);
		try {
			var doc = new jsPDF();
			const logoURL = 'https://frontstudyhub.vercel.app/static/media/logo-text.1b43604a02cff559bc6a.png';
			const logoBase64 = await convertirURLaBase64(logoURL);

			doc.setFontSize(22);
			doc.setTextColor(34);
			doc.setFont('helvetica', 'bold');
			doc.text("Certificado de Escolaridad", 20, 20);
			doc.setFontSize(14);
			doc.setFont('helvetica', 'normal');
			doc.text("Resultados finales", 20, 26);
			doc.setFontSize(18);
			doc.setFont('helvetica', 'bold');
			doc.text(`${carrera.data.nombre}`, 20, 40);
			doc.setFontSize(10);
			doc.setFont('helvetica', 'normal');
			doc.text(`Emisión ${fechaEmision()}`, 150, 8);

			doc.addImage(logoBase64, 'PNG', 150, 13, 40, 10);
			doc.setLineWidth(0.2);
			doc.line(20, 45, 190, 45);

			doc.setFontSize(12);
			doc.setTextColor(0);
			doc.text(`Nombre: ${user?.nombre + " " + user?.apellido || "Nombre del Estudiante"}`, 20, 55);
			doc.text(`Cédula: ${formatoCi(user?.cedula) || "ID del Estudiante"}`, 20, 61);
			doc.text(`Email: ${user?.email || "Correo del Estudiante"}`, 20, 67);

			let y = 92;
			let contCursos = 0;
			let calificacionCursos = 0;
			doc.setFontSize(14);
			doc.setFont('helvetica', 'bold');
			let resultCalificaciones = await getCalificacionesAsignaturas(user.id, idCarrera, user.jwtLogin);
			console.log("Calificaciones: ", resultCalificaciones);

			if (resultCalificaciones && resultCalificaciones.length > 0) {
				//  resultCalificaciones.data !== undefined && resultCalificaciones !== '' && resultCalificaciones.status !== 200) {
				doc.text("Cursos", 20, 87);
				doc.setFontSize(12);
				doc.setFont('helvetica', 'normal');

				resultCalificaciones.forEach(notas => {
					if (notas.calificaciones[0].calificacion !== 0) {
						doc.text(`${notas.asignatura}`, 20, y);
						doc.text(`Calificación: ${notas.calificaciones[0].calificacion}`, 90, y);
						doc.text(`${notas.calificaciones[0].resultado}`, 155, y);
						contCursos = contCursos + 1;
						calificacionCursos = calificacionCursos + notas.calificaciones[0].calificacion;
						y += 6;
					}
				});
				doc.setLineWidth(0.2);
				doc.line(20, y, 190, y);
			} else {
				let title = "No hay estudiantes inscriptos!\n\n";
				errors(resultCalificaciones.data, resultCalificaciones.data, 400, false);
			}

			let contExamen = 0;
			let calificacionExamen = 0;
			y += 10;
			const resultExamenes = await getCalificacionesExamenes(user.id, idCarrera, user.jwtLogin);
			console.log("Examenes: ", resultExamenes);

			if (resultExamenes && resultExamenes.length > 0) {
				doc.setFontSize(14);
				doc.setFont('helvetica', 'bold');
				doc.text("Examenes", 20, y);
				doc.setFontSize(12);
				doc.setFont('helvetica', 'normal');
				y += 6;

				resultExamenes.forEach(notasx => {
					if (notasx.calificacion !== 0) {
						doc.text(`${notasx.asignatura}`, 20, y);
						doc.text(`Calificación: ${notasx.calificacion}`, 90, y);
						doc.text(`${notasx.resultado}`, 155, y);
						contExamen = contExamen + 1;
						calificacionExamen = calificacionExamen + notasx.calificacion;
						y += 6;
					}
				});
				doc.setLineWidth(0.2);
				doc.line(20, y, 190, y);
				y += 10;
			}

			doc.setFontSize(12);
			doc.text(`Cantidad cursadas: ${contCursos}`, 20, y);
			y += 6
			doc.text(`Cantidad examenes: ${contExamen}`, 20, y);
			doc.text(`Total: ` + `${contCursos + contExamen}`, 90, y - 3);

			let promedio = (calificacionCursos + calificacionExamen) / (contCursos + contExamen);
			let promedioFormat = promedio.toFixed(2);
			if (isNaN(promedio)) {
				promedioFormat = 0;
			}
			y += 10;
			doc.setFontSize(15);
			doc.setFont('helvetica', 'bold');
			doc.text(`Promedio General: ` + `${promedioFormat}`, 20, y);

			let largo = resultExamenes.length;
			if (largo > 0) {
				largo = 0;
				var blob = doc.output("blob");
				var url = URL.createObjectURL(blob);
				setPdfUrl(url);
			} else {
				let title = "No hay estudiantes inscriptos!\n\n";
				errors(resultExamenes.data, resultExamenes.data, 400, false);
			}
		}

		catch (error) {
			console.log("Error: ", error);
		}
	};

	useEffect(() => {
		if (pdfUrl) {
			setOpen(true);
		}
	}, [pdfUrl]);


	return (
		<>
			<Box component="form" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10px', marginBottom: '80px' }} onSubmit={handleSubmit}>
				<Card sx={{ marginTop: 6, display: 'flex', alignSelf: 'center', }}>
					<Box sx={{ margin: 0.6, alignSelf: 'center' }}>
						<Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Escolaridad</Typography>
					</Box>
					<Divider />
					<Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
						<FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '320px' }, gap: 0.6 }}>
							<Select size="sm" defaultValue="Seleccionar carrera" placeholder="Seleccionar carrera" id="idcarrera" name="idcarrera">
								{carreraData.map((carrera, index) => (
									<Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
								))}
							</Select>
							<Stack direction="row" spacing={0.6} sx={{ marginTop: 0.8, justifyContent: 'right', zIndex: '1000' }}>
								<Button type='submit' fullWidth variant="soft" color="primary" sx={{ mt: 1, mb: 3, border: 0.01, borderColor: '#3d3d3d' }}>
									Visualizar PDF
								</Button>
							</Stack>
						</FormControl>
					</Stack>
				</Card>
			</Box>

			<Modal open={open} onClose={() => setOpen(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
				{pdfUrl &&
					<iframe src={pdfUrl}
						style={{ width: '90%', maxWidth: '80vw', height: '100%', maxHeight: '95vh', border: 'none', }}
						frameBorder="0" title="PDF Viewer" />
				}
			</Modal>
		</>
	);
};

export default GestionPage;