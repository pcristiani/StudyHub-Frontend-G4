import React, { useState, useEffect, useContext } from 'react';

import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
 import { AuthContext } from '../../../context/AuthContext';
 import { URL_BACK } from '../../../services/util/constants';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { DatosCarreras, DatosAsignaturas } from '../../../services/requests/carreraService';
import { getCarreras } from '../../../services/requests/carreraService';

export default function AltaAsignatura() {
    const { user } = useContext(AuthContext);
    const history = useNavigate();
    const [carreraData, setCarreraData] = useState([]);
    const [error, setError] = useState(null);
    const [idCarreraSeleccionada, setIdCarreraSeleccionada] = useState(null);


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
            console.log("Datos del Usuario: ", carreraData);
        }
    }, [carreraData]);

    const handleChange = (event) => {
        if (event && event.target) {
            const value = event.target.value;
            setIdCarreraSeleccionada(value);
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let nombre = data.get('nombre');
        let creditos = parseInt(data.get('creditos'), 10);
        let descripcion = data.get('descripcion');
        let departamento = data.get('departamento');
        let previaturas = data.get('previaturas') ? data.get('previaturas').split(',').map(item => item.trim()) : [];
        let idCarrera = data.get('idcarrera');

        console.log('ID de la carrera seleccionada:', idCarrera); 
        try {
            await altaAsignatura(nombre, creditos, descripcion, departamento,  previaturas, idCarrera);
            swal({
                title: "La asignatura ha sido creada con éxito\n\n",
                icon: "success",
                position: "center",
                timer: 4000
            });
            history('/Novedades');
        } catch (error) {
            let errorMsg = 'Los datos ingresados no son correctos o ya existe una asignatura con ese nombre';
            if (error.status === 401) {
                errorMsg = 'No autorizado. Verifica tu token de autenticación.';
            } else if (error.status === 500) {
                errorMsg = 'Error interno del servidor. Inténtalo más tarde.';
            }
            swal("Error", errorMsg, "error", {
                timer: 3000
            });
        }
    };

    const altaAsignatura = async (nombre, creditos, descripcion, departamento,  previaturas, idCarrera) => {
        let body = {
            "nombre": nombre,
            "creditos": creditos,
            "descripcion": descripcion,
            "departamento": departamento,
            "activa": true,
            "previaturas": previaturas,
            "idCarrera": idCarrera
        };

        let response = await fetch(URL_BACK.altaAsignatura, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.jwtLogin}`,
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw {status: response.status};
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!carreraData) {
        return <div>Cargando...</div>;
    }
    return (
        <Box component="form" sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} onSubmit={handleSubmit}>
            <Card sx={{ display: 'flex', alignSelf: 'center', }}>
                <Box sx={{ margin: 1, alignSelf: 'center' }}>
                    <Typography level="title-lg">Alta asignatura</Typography>
                </Box>
                <Divider />
                <Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
                    {/* <FormControl sx={{ width: '100%', maxWidth: 350, gap: 1 }}> */}
                    <FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '350px' }, gap: 1 }}>
<Select defaultValue="Seleccionar carrera" placeholder="Seleccionar carrera" id="idcarrera" name="idcarrera" onChange={handleChange}>
                            {carreraData.map((carrera, index) => (
                                <Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
                            ))}
                        </Select>
                        <Divider />

                        {/* <FormLabel htmlFor="nombre">Nombre</FormLabel> */}
                        <Input size="sm" id="nombre" name="nombre" placeholder="Nombre" required />
                        {/* <FormLabel htmlFor="creditos">Créditos</FormLabel> */}
                        <Input size="sm" id="creditos" name="creditos" placeholder="Créditos" required />
                        {/* <FormLabel htmlFor="descripcion">Descripción</FormLabel> */}
                        <Input size="sm" id="descripcion" name="descripcion" placeholder="Descripción" required />
                        {/* <FormLabel htmlFor="departamento">Departamento</FormLabel> */}
                        <Input size="sm" id="departamento" name="departamento" placeholder="Departamento" required />
                    
                    </FormControl>
                    <Stack direction="row" spacing={1} sx={{ marginTop: 2, justifyContent: 'right' }}>
                        <Button type="submit" size="md" variant="solid">Guardar</Button>
                        <Button size="md" variant="outlined" color="neutral" href='/'>Cancelar</Button>
                    </Stack>
                </Stack>
            </Card>
        </Box>
    );
};



// import React, { useContext, useEffect, useState } from 'react';
// import Box from '@mui/joy/Box';
// import Button from '@mui/joy/Button';
// import Divider from '@mui/joy/Divider';
// import FormControl from '@mui/joy/FormControl';
// import FormLabel from '@mui/joy/FormLabel';
// import Input from '@mui/joy/Input';
// import Stack from '@mui/joy/Stack';
// import Typography from '@mui/joy/Typography';
// import Card from '@mui/joy/Card';
// import { AuthContext } from '../../../context/AuthContext';
// import { URL_BACK } from '../../../services/util/constants';
// import swal from 'sweetalert';
// import { useNavigate } from 'react-router-dom';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Select from '@mui/joy/Select';
// import Option from '@mui/joy/Option';
// import { DatosCarreras, DatosAsignaturas } from '../../../services/requests/carreraService';
// import { getCarreras } from '../../../services/requests/carreraService';


// export default function AltaAsignatura() {
//     const { user } = useContext(AuthContext);
//     console.log(user.jwtLogin);
//     const history = useNavigate();
//     const [carreraData, setCarreraData] = useState(null);
//     const [error, setError] = useState(null);
//     const context = useContext(AuthContext);
//     const [idCarreraSeleccionada, setIdCarreraSeleccionada] = useState([]);
//     // const [carreraData, setCarreraData] = useState([]);

//     useEffect(() => {
//         const fetchCarreras = async () => {
//             try {
//                 const result = await getCarreras(user.jwtLogin);
//                 setCarreraData(result);
//             } catch (error) {
//                 setError(error.message);
//             }
//         };
//         fetchCarreras();
//     }, [user]);

//     useEffect(() => {
//         if (carreraData) {
//             console.log("Datos del Usuario: ", carreraData);
//         }
//     }, [carreraData]);

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     if (!carreraData) {
//         return <div>Cargando...</div>;
//     }


//     async function altaAsignatura(nombre, creditos, descripcion, departamento, activa, previaturas = [], idCarrera) {
//         console.log("Alta asignatura:", nombre, descripcion);

//         let body = {
//             "nombre": nombre,
//             "creditos": creditos,
//             "descripcion": descripcion,
//             "departamento": departamento,
//             "activa": activa,
//             "previaturas": previaturas,
//             "idCarrera": idCarrera
//         };
//         let response = await fetch(URL_BACK.altaAsignatura, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${user.jwtLogin}`,
//             },
//             body: JSON.stringify(body)
//         })

//         if (response.ok) {
//             console.log("response: ", response);
//             swal({
//                 title: "La asignatura ha sido creada con éxito\n\n",
//                 icon: "success",
//                 position: "center",
//                 timer: 4000
//             });
//         } else {
//             let errorMsg = 'Los datos ingresados no son correctos o ya existe una asignatura con ese nombre';
//             if (response.status === 401) {
//                 errorMsg = 'No autorizado. Verifica tu token de autenticación.';
//             } else if (response.status === 500) {
//                 errorMsg = 'Error interno del servidor. Inténtalo más tarde.';
//             }
//             swal("Error", errorMsg, "error", {
//                 timer: 3000
//             });
//         }
//     };


//     const handleChange = (event) => {
//         const value = event.target.value;
//         setIdCarreraSeleccionada(value);
//     }


//     const handleSubmit = (event) => {
//         event.preventDefault();
//         const data = new FormData(event.currentTarget);
//         let nombre = data.get('nombre');
//         let creditos = parseInt(data.get('creditos'), 10);
//         let descripcion = data.get('descripcion');
//         let departamento = data.get('departamento');
//         let activa = data.get('activa');
//         let previaturas = data.get('previaturas') ? data.get('previaturas').split(',').map(item => item.trim()) : [];
//         let idCarrera = data.get('idCarrera');
//         altaAsignatura(nombre, creditos, descripcion, departamento, activa, previaturas = [], idCarrera);
//         history('/Novedades');
//     };

//     return (
//         <Box component="form" sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} onSubmit={handleSubmit}>
//             <Card sx={{ display: 'flex', alignSelf: 'center', }}>
//                 <Box sx={{ alignSelf: 'center' }}>
//                     <Typography level="title-md">Alta asignatura</Typography>
//                 </Box>
//                 <Divider />
//                 <Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
//                     {/* <FormControl sx={{ width: '100%', maxWidth: 350, gap: 1 }}> */}
//                     <FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '350px' }, gap: 1 }}>
//                         <Select defaultValue="Seleccionar carrera" onChange={handleChange}>
//                             {carreraData.map((carrera, index) => (
//                                 <Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
//                             ))}
//                         </Select>
//                         <p>ID de la carrera seleccionada: {idCarreraSeleccionada}</p>

//                         <Divider />

//                         <FormLabel htmlFor="nombre">Nombre</FormLabel>
//                         <Input size="small" id="nombre" name="nombre" placeholder="Nombre" required />
//                         <FormLabel htmlFor="creditos">Créditos</FormLabel>
//                         <Input size="small" id="creditos" name="creditos" placeholder="Créditos" required />
//                         <FormLabel htmlFor="descripcion">Descripción</FormLabel>
//                         <Input size="small" id="descripcion" name="descripcion" placeholder="Descripción" required />
//                         <FormLabel htmlFor="departamento">Departamento</FormLabel>
//                         <Input size="small" id="departamento" name="departamento" placeholder="Departamento" required />
                    
//                     </FormControl>
//                     <Stack direction="row" spacing={2} sx={{ marginTop: 2, justifyContent: 'center' }}>
//                         <Button type="submit" size="small" variant="solid">Guardar</Button>
//                         <Button size="small" variant="outlined" color="neutral" href='/'>Cancelar</Button>
//                     </Stack>
//                 </Stack>
//             </Card>
//         </Box>
//     );
// };



// // {/* <FormControlLabel control={<Checkbox value="activa" color="primary" />}
// //                             label="Activa" /> */}
// // {/* <Select defaultValue="Seleccionar previas">
// //                             {carreras.map((carrera, index) => (
// //                                 <Option key={index} value={carrera.name}>{carrera.name}</Option>
// //                             ))}
// //                         </Select>
// //                         <br></br>*/}