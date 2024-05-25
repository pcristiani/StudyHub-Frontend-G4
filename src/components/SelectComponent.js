// import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { getUsuarios } from '../services/requests/usuarioService';
// import { DatosCarreras, DatosAsignaturas } from '../services/requests/carreraService';

// import Select from '@mui/joy/Select';
// import Option from '@mui/joy/Option';
// import { CssVarsProvider } from '@mui/joy/styles';

// export default function SelectComponent() {
//     const { user } = useContext(AuthContext); // Obtengo la informacion de logueo
//     console.log("ssss : ", user.name);

//     const [ban, setBan] = useState(null);
//     const handleChange = (event, newValue) => {
//         // alert(`Select "${newValue}"`);
//         // setBan('se');
//         console.log("Select: ", newValue);
//     };
//     const handleChanges = (event, newValue) => {
//         // alert(`Select "${newValue}"`);
//         // setBan('se');
//         console.log("Select: ", newValue);
//     };

//     const [isButtonVisible, setIsButtonVisible] = React.useState(false);
//     return (
//         <>
//             {!isButtonVisible && (
//                 <CssVarsProvider disableTransitionOnChange>
//                     {/* <Select defaultValue="Seleccionar Carrera" onChange={() => { setIsButtonVisible(false); mostrar('grupo1') }}>
//                         {DatosCarreras.map((carrera, index) => (
//                             <Option key={index} value={carrera.name}>{carrera.name}</Option>
//                         ))}
//                     </Select> */}
//                     {/* <br></br> */}
//                     {/* <Select defaultValue="Seleccionar Carrera" onChange={handleChanges}>
//                         {DatosAsignaturas.map((asignaturas, index) => (
//                             <Option key={index} value={asignaturas.idCarrera}>{asignaturas.name}</Option>
//                         ))}
//                     </Select> */}
//                 </CssVarsProvider>
//             )}
//             <div id="grupo1">
//                 <CssVarsProvider disableTransitionOnChange>
//                     <Select defaultValue="Seleccionar Carrera">
//                         {DatosCarreras.map((carrera, index) => (
//                             <Option key={index} value={carrera.name}>{carrera.name}</Option>
//                         ))}
//                     </Select>
//                     <br></br>
//                     <Select defaultValue="Seleccionar Carrera">
//                         {DatosAsignaturas.map((asignaturas, index) => (
//                             <Option key={index} value={asignaturas.idCarrera}>{asignaturas.name}</Option>
//                         ))}
//                     </Select>
//                 </CssVarsProvider>
//             </div>
//         </>
//     );
// }

// function ocultar(id) {
//     var elemento = document.getElementById(id);
//     elemento.style.display = "none";
// }

// function mostrar(id) {
//     var elemento = document.getElementById(id);
//     elemento.style.display = "block";
// }