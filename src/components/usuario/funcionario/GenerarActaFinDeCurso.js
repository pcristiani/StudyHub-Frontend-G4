import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import Option from '@mui/joy/Option';
import dayjs from 'dayjs';
import Select from '@mui/joy/Select';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import Modal from '@mui/joy/Modal';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { getAsignaturasDeCarrera, getHorarios, getActaAsignatura } from '../../../services/requests/asignaturaService';
import { getCarreras } from '../../../services/requests/carreraService';
import { jsPDF } from "jspdf";
import { formatoCi } from '../../../services/util/formatoCi';
import { errors } from '../../../services/util/errors';
import { formatFechaEmision } from '../../../services/util/formatoFecha';
import { SelectProps } from '../../common/SelectProps';

dayjs.extend(isBetweenPlugin);


export default function GenerarActaFinDeCurso() {
   const { user } = useContext(AuthContext);
   const [carreraData, setCarreraData] = useState([]);
   const [selectedCarrera, setSelectedCarrera] = useState('');
   const [error, setError] = useState(null);
   const [asignaturaData, setAsignaturaData] = useState([]);
   const [actaCursoData, setActaCursoData] = useState('');

   const history = useNavigate();
   const [horarioData, setHorarioData] = useState('');

   const [pdfUrl, setPdfUrl] = useState('');
   const [open, setOpen] = useState(false);


   useEffect(() => {
      const fetchCarreras = async () => {
         try {
            const result = await getCarreras(user.jwtLogin);
            setCarreraData(result);
         } catch (error) {
            setError(error.message);
         }
      };
      fetchCarreras();
   }, [user]);

   useEffect(() => {
      if (carreraData) {
         // console.log(carreraData);
      }
   }, [carreraData]);

   const handleChange = (event, newValue) => {
      setSelectedCarrera(newValue);
      if (newValue !== null) {
         getInfoCarrera(newValue);
      }
   };

   async function getInfoCarrera(selectedCarrera) {
      let resultPeriodo = await getAsignaturasDeCarrera(selectedCarrera, user.jwtLogin);
      setActaCursoData([]);
      setAsignaturaData(resultPeriodo);
   }


   const handleChangeAsignatura = (event, idasignatura) => {
      if (idasignatura !== null && idasignatura !== undefined) {
         setActaCursoData([]);
         getInfoCurso(idasignatura);
      }
   };

   async function getInfoCurso(idasignatura) {
      if (idasignatura !== null && idasignatura !== undefined && idasignatura !== '') {
         try {
            const result = await getHorarios(idasignatura, user.jwtLogin);
            if (Array.isArray(result) && result.length > 0) {
               setHorarioData(consolidarHorarios(result));
            } else {
               setHorarioData([]);
            }
         } catch (error) {
            console.error("Error fetching horarios: ", error);
            setHorarioData([]);
         }
      }
   }


   const consolidarHorarios = (result) => {
      if (Array.isArray(result) && result.length > 0) {
         return result.map(horario => {
            if (horario.dtHorarioDias && Array.isArray(horario.dtHorarioDias)) {
               let dias = horario.dtHorarioDias.map(dia => `${dia.diaSemana} de ${dia.horaInicio} a ${dia.horaFin} (${horario.anio})`).join(', ');
               return {
                  ...horario,
                  diasConsolidados: dias
               };
            } else {
               return {
                  ...horario,
                  diasConsolidados: 'No hay datos de horario disponibles'
               };
            }
         });
      } else {
         return [];
      }
   };


   const handleChangeAnio = (event, anio) => {
      if (anio !== null && anio !== undefined && anio !== '') {
         //  console.log("anio: ", anio);
         getInfoAnio(anio);
      }
   };

   async function getInfoAnio(idHorarioAsig) {
      if (idHorarioAsig !== null && idHorarioAsig !== undefined && idHorarioAsig !== '') {
         try {
            const result = await getActaAsignatura(idHorarioAsig, user.jwtLogin);
            setActaCursoData(result.data);
         } catch (error) {
            console.error("Error al obtener el acta de asignatura: ", error);
         }
      }
   }


   ///

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

   const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      let idC = data.get('idcarrera');
      if (idC !== null && idC !== undefined && idC !== "") {
         visualizarPDF(idC);
      }
   };


   const visualizarPDF = async (idCarreras) => {
      if (!actaCursoData || !actaCursoData.asignatura) {
         console.error("ActaCursoData o asignatura no definidos");
         return;
      }

      try {
         var doc = new jsPDF();
         let y = 45;
         const logoURL = 'https://frontstudyhub.vercel.app/static/media/logo-text.1b43604a02cff559bc6a.png';
         const logoBase64 = await convertirURLaBase64(logoURL);

         doc.setFontSize(22);
         doc.setTextColor(34);
         doc.setFont('helvetica', 'bold');
         doc.text("ACTA DE FIN DE CURSO", 20, 20);
         doc.setFontSize(13);
         doc.setFont('helvetica', 'normal');
         doc.text(`Año lectivo ${actaCursoData.horarioAsignatura.anio}`, 20, 26);
         doc.setFontSize(18);
         doc.setFont('helvetica', 'bold');
         doc.text(`${actaCursoData.asignatura}`, 20, 45);

         doc.setFontSize(9);
         doc.setFont('helvetica', 'normal');
         doc.text(`Emisión ${fechaEmision()}`, 150, 8);
         doc.addImage(logoBase64, 'PNG', 150, 13, 40, 10);

         doc.setFontSize(12);
         doc.setFont('helvetica', 'bold');
         doc.setTextColor(0);
         doc.text(`Docente`, 150, y);
         y += 3;
         doc.setLineWidth(0.2);
         doc.line(20, y, 190, y);

         doc.setFontSize(12);
         doc.setFont('helvetica', 'normal');
         actaCursoData.docentes.forEach(docente => {
            y += 6;
            doc.text(`${docente.nombre}`, 150, y);
         });

         y += 6;
         doc.setFontSize(12);
         doc.setFont('helvetica', 'bold');
         doc.text("Alumnos inscriptos", 20, y + 2);
         y += 6;
         doc.setLineWidth(0.1);
         doc.line(20, y, 190, y);

         y += 8;
         doc.setFont('helvetica', 'bold');
         doc.text("Cedula", 20, y);
         doc.text("Nombre", 88, y);
         doc.text("Calificación", 150, y);

         doc.setFont('helvetica', 'normal');
         doc.setLineWidth(0.1);
         doc.setDrawColor(60, 57, 48);

         actaCursoData.estudiantes.forEach(estudiante => {
            y += 6;
            doc.setFontSize(12);
            doc.text(`${formatoCi(estudiante.cedula)}`, 20, y);
            doc.text(`${estudiante.nombre}` + ` ` + `${estudiante.apellido}`, 88, y);
            doc.setLineWidth(0.1);
            doc.line(20, y + 1, 190, y + 1);
         });

         let largo = actaCursoData.estudiantes.length;
         if (largo > 0) {
            largo = 0;
            var blob = doc.output("blob");
            var url = URL.createObjectURL(blob);
            setPdfUrl(url);
         } else {
            let title = "No hay estudiantes inscriptos!\n\n";
            errors(title, title, 400, false);
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
         <Box component="form" sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }} onSubmit={handleSubmit} >
            <Card sx={{ display: 'flex', alignSelf: 'center', }}>
               <Box sx={{ margin: 0.6, alignSelf: 'center' }}>
                  <Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Generar acta de fin de curso</Typography>
               </Box>
               <Divider />
               <Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
                  <FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '320px' }, gap: 0.8 }}>

                     <SelectProps size="sm" placeholder="Seleccionar carrera" id="idcarrera" name="idcarrera" onChange={handleChange} required>
                        {carreraData.map((carrera, index) => (
                           <Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
                        ))}
                     </SelectProps>

                     <SelectProps size="sm" placeholder="Seleccionar asignatura" id="idasignatura" name="idasignatura" onChange={handleChangeAsignatura} required >
                        {Array.isArray(asignaturaData) && asignaturaData.map((asignatura, index) => (
                           <Option key={index} value={asignatura.idAsignatura}>{asignatura.nombre}</Option>
                        ))}
                     </SelectProps>

                     <Select size="sm" placeholder="Seleccionar horario" id="idhorario" name="idhorario" onChange={handleChangeAnio} required
                        slotProps={{ listbox: { placement: 'bottom-start', sx: { maxWidth: '320px' } } }}>
                        {Array.isArray(horarioData) && horarioData.map((horari, index) => (
                           <>
                              <Option key={index} value={horari.idHorarioAsignatura}>
                                 {horari.diasConsolidados}
                              </Option>
                              <Divider />
                           </>
                        ))}
                     </Select>
                     <Stack direction="row" spacing={0.6} sx={{ marginTop: 0.8, justifyContent: 'right', zIndex: '1000' }}>
                        <Button size="sm" type='submit' fullWidth variant="soft" color="primary" sx={{ mt: 1, mb: 3, border: 0.01, borderColor: '#3d3d3d' }}>
                           Visualizar PDF
                        </Button>
                     </Stack>
                  </FormControl>
               </Stack>
            </Card>
         </Box>
         <Modal open={open} onClose={() => setOpen(false)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {pdfUrl &&
               <iframe src={pdfUrl} style={{ width: '90%', maxWidth: '80vw', height: '100%', maxHeight: '95vh', border: 'none' }}
                  frameBorder="0" title="PDF Viewer" />
            }
         </Modal>
      </>
   );
};
