/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { getUsuarios } from '../services/requests/usuarioService';

import { CssVarsProvider } from '@mui/joy/styles';
import Container from '@mui/joy/Container';
import ListadoCarreras from '../components/busqueda/ListadoCarreras';
import Stack from '@mui/joy/Stack';
import ListadosBusquedas from '../components/usuario/administrador/ListadosBusquedas';


const InscripcionesPage = () => {
  const { user } = useContext(AuthContext); // Obtengo la informacion de logueo

  useEffect(() => {
    // getUsuarios(user.id).then(result => {
    // console.log("Datos Usuario: ", result);
    // });
  }, []);

  return (
    <Stack direction="row" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} spacing={2}>
      <>
        <div className="tracking-tight lg:flex-row-reverse">
          <div className="flex grid lg:grid-cols-2 grid-cols-2">
            <section className="text-black body-font">
              <div className="px-2 py-2 mx-auto">
                <ListadoCarreras />
                {/* <ListadosBusquedas /> */}
              </div>
            </section>
          </div>
        </div>
      </>
    </Stack>
  );
}

//   return (
//     <CssVarsProvider>
//       <Container component="main" maxWidth="md">
//         <Stack direction="row" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} spacing={2}>
//           <>
//             <div className="tracking-tight lg:flex-row-reverse">
//               <div className="flex grid lg:grid-cols-2 grid-cols-2">
//                 <section className="text-black body-font">
//                   <div className="px-2 py-2 mx-auto">
//                     <div>
//                       <ListadoCarreras />
//                     </div>
//                   </div>
//                 </section>
//               </div>
//             </div>
//           </>
//         </Stack>
//       </Container>
//     </CssVarsProvider>
//   );
// }

export default InscripcionesPage;