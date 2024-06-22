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
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import Modal from '@mui/joy/Modal';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { getCarrerasConPeriodoExamen, getPeriodosDeCarrera } from '../../../services/requests/carreraService';
import { getExamenesPeriodo, getActaExamen } from '../../../services/requests/examenService';
import { jsPDF } from "jspdf";
import { SelectProps } from '../../common/SelectProps';
import { formatoCi } from '../../../services/util/formatoCi';
import { errors } from '../../../services/util/errors';
import { formatFechaEmision } from '../../../services/util/formatoFecha';


dayjs.extend(isBetweenPlugin);

export default function GenerarActaExamen() {
   const { user } = useContext(AuthContext);
   const [carreraData, setCarreraData] = useState([]);
   const [docenteData, setDocenteData] = useState([]);
   const [selectedCarrera, setSelectedCarrera] = useState('');
   const [error, setError] = useState(null);
   const [periodoData, setPeriodoData] = useState([]);
   const history = useNavigate();

   const [actaData, setActaData] = useState('');
   const [pdfUrl, setPdfUrl] = useState('');
   const [open, setOpen] = useState(false);


   useEffect(() => {
      const fetchCarreras = async () => {
         try {
            const result = await getCarrerasConPeriodoExamen(user.jwtLogin);
            setCarreraData(result);
         } catch (error) {
            setError(error.message);
         }
      };
      fetchCarreras();
   }, [user]);

   useEffect(() => {
      if (carreraData) {
         console.log("Carreras: ", carreraData);
      }
   }, [carreraData]);

   const handleChange = (event, newValue) => {
      setSelectedCarrera(newValue);
      if (newValue !== null) {
         getInfoCarrera(newValue);
      }
   };

   async function getInfoCarrera(selectedCarrera) {
      let resultPeriodo = await getPeriodosDeCarrera(selectedCarrera, user.jwtLogin);
      setPeriodoData(resultPeriodo);
   }

   const handleChangeFecha = (event, idPeriodoExamen) => {
      if (idPeriodoExamen !== null && idPeriodoExamen !== undefined) {
         //   console.log("fechaFin: ", idPeriodoExamen.idPeriodoExamen);
         getInfoPeriodoExamen(idPeriodoExamen.idPeriodoExamen);
      }
   };

   async function getInfoPeriodoExamen(idPeriodoExamen) {
      let result = await getExamenesPeriodo(idPeriodoExamen, user.jwtLogin);
      //  console.log("getExamenesPeriodo: ", result.data);
      setDocenteData(result.data);
   }

   const handleChangeAsignatura = (event, idExamen) => {
      getInfoExamen(idExamen);
   };

   async function getInfoExamen(idExamen) {
      if (idExamen !== null && idExamen !== undefined && idExamen !== '') {
         let result = await getActaExamen(idExamen, user.jwtLogin);
         setActaData(result.data);
         //    console.log("actaData: ", actaData);
      }
   }


   ///
   const handleSubmit = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      let idC = data.get('idcarrera');
      if (idC !== null && idC !== undefined && idC !== "") {
         visualizarPDF(idC);
      }
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
      try {
         var doc = new jsPDF();
         let y = 45;
         const logoURL = 'https://frontstudyhub.vercel.app/static/media/logo-text.1b43604a02cff559bc6a.png';
         const logoBase64 = await convertirURLaBase64(logoURL);

         doc.setFontSize(22);
         doc.setTextColor(34);
         doc.setFont('helvetica', 'bold');
         doc.text("ACTA DE EXAMEN", 20, 20);
         doc.setFontSize(14);
         doc.setFont('helvetica', 'normal');
         doc.text(`Periodo ${actaData.examen.periodoExamen}`, 20, 25);

         doc.setFontSize(18);
         doc.setFont('helvetica', 'bold');
         doc.text(`${actaData.asignatura}`, 20, 45);

         doc.setFontSize(9);
         doc.setFont('helvetica', 'normal');
         doc.text(`Emisión ${fechaEmision()}`, 160, 8,);
         doc.addImage(logoBase64, 'PNG', 160, 13, 40, 10);

         doc.setFontSize(12);
         doc.setFont('helvetica', 'bold');
         doc.setTextColor(0);
         doc.text(`Docente`, 150, y);
         y += 3;
         doc.setLineWidth(0.2);
         doc.line(20, y, 190, y);

         doc.setFontSize(12);
         doc.setFont('helvetica', 'normal');
         actaData.docentes.forEach(docente => {
            y += 6;
            doc.text(`${docente.nombre}`, 150, y);
         });

         y += 6;
         doc.setFontSize(12);
         doc.setFont('helvetica', 'bold');
         doc.text("Alumnos inscriptos", 20, y);
         y += 3;
         doc.setLineWidth(0.1);
         doc.line(20, y, 190, y);
         y += 6;
         doc.setFont('helvetica', 'bold');
         doc.text("Cedula", 20, y);
         doc.text("Nombre", 88, y);
         doc.text("Calificación", 150, y);
         doc.setFont('helvetica', 'normal');

         actaData.estudiantes.forEach(estudiante => {
            y += 6;
            doc.setFontSize(12);
            doc.text(`${formatoCi(estudiante.cedula)}`, 20, y);
            doc.text(`${estudiante.nombre}` + ` ` + `${estudiante.apellido}`, 88, y);
         });
         var blob = doc.output("blob");
         var url = URL.createObjectURL(blob);
         setPdfUrl(url);

         // guardar
         // const blob = doc.output('blob');
         // doc.save('document.pdf');
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
                  <Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Generar acta de examen</Typography>
               </Box>
               <Divider />
               <Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
                  <FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '320px' }, gap: 0.8 }}>

                     <SelectProps size="sm" placeholder="Seleccionar carrera" id="idcarrera" name="idcarrera" onChange={handleChange} >
                        {carreraData.map((carrera, index) => (
                           <Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
                        ))}
                     </SelectProps>

                     <SelectProps size="sm" placeholder="Seleccionar periodo" id="idperiodo" name="idperiodo" onChange={handleChangeFecha} slotProps={{ listbox: { sx: { width: '100%', }, }, }}>
                        {Array.isArray(periodoData) && periodoData.map((periodo, index) => (
                           <Option key={index} value={periodo}>Periodo {periodo.nombre}</Option>
                        ))}
                     </SelectProps>

                     <SelectProps size="sm" placeholder="Seleccionar asignatura" id="idasignatura" name="idasignatura" onChange={handleChangeAsignatura} >
                        {Array.isArray(docenteData) && docenteData.map((asignatura, index) => (
                           <Option key={index} value={asignatura.idExamen}>{asignatura.asignatura}</Option>
                        ))}
                     </SelectProps>
                     <Divider />

                     <Stack direction="row" spacing={0.6} sx={{ marginTop: 1, justifyContent: 'right', zIndex: '1000' }}>
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
               <iframe src={pdfUrl}
                  style={{ width: '90%', maxWidth: '80vw', height: '100%', maxHeight: '95vh', border: 'none', }}
                  frameBorder="0" title="PDF Viewer" />
            }
         </Modal>
      </>
   );
};
