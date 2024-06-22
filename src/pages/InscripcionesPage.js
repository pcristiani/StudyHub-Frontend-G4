import React from 'react';

import ListadoCarreras from '../components/busqueda/ListadoCarreras';
import Stack from '@mui/joy/Stack';


const InscripcionesPage = () => {
  return (
    <Stack direction="row" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} spacing={2}>
      <>
        <div className="tracking-tight lg:flex-row-reverse">
          <div className="flex grid lg:grid-cols-2 grid-cols-2">
            <section className="text-black body-font">
              <div className="px-2 py-2 mx-auto">
                <ListadoCarreras />
              </div>
            </section>
          </div>
        </div>
      </>
    </Stack>
  );
}

export default InscripcionesPage;