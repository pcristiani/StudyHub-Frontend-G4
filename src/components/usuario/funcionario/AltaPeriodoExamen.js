import React, { useContext, useState } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import { AuthContext } from '../../../context/AuthContext';

import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';


export default function AltaPeriodoExamen() {
    const { user } = useContext(AuthContext);

    const history = useNavigate();
    const [value, setValue] = useState(dayjs('2022-04-17'));
    const [value2, setValue2] = useState(dayjs('2022-04-17'));

  

    async function altaPeriodoExamen(codigoDocente, nombre) {

    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let fechaInicio = data.get('fechaInicio');
        let fechaFin = data.get('fechaFin');
        console.log('fechaInicio: ', fechaInicio);
        console.log('fechaFin: ', fechaFin);
        altaPeriodoExamen(fechaInicio, fechaFin);
        history('/Novedades');
    };


    return (
        <>
            <Box component="form" sx={{ marginTop: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} onSubmit={handleSubmit}>
                <Card sx={{ display: 'flex', alignSelf: 'center', }}>
                    <Box sx={{ margin: 1, alignSelf: 'center' }}>
                        <Typography level="title-lg">Alta periodo de examen</Typography>
                    </Box>
                    <Divider />
                    <Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
                        <FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '350px' }, gap: 1 }}>
                            <Input size="sm" type="date" id="fechaInicio" name="fechaInicio" required />
                            <Input size="sm" type="date" id="fechaFin" name="fechaFin" required />
                            {/* value={value2} onChange={(newValue2) => setValue2(newValue2)} /> */}
                            <Divider />

                        </FormControl>
                        <Stack direction="row" spacing={1} sx={{ marginTop: 1, justifyContent: 'right' }}>
                            <Button type="submit" size="md" fullWidth variant="solid">Guardar</Button>
                            <Button size="md" variant="outlined" fullWidth color="neutral" href='/'>Cancelar</Button>
                        </Stack>
                    </Stack>
                </Card>
            </Box>
        </>
    );
};
