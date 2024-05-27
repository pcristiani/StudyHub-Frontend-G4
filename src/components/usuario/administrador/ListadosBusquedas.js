import React, { useState, useEffect, useContext } from 'react';

import { useLocation } from 'react-router-dom';
import TableAdministrador from './TableAdministrador';
import TableAsignarCoordinadorCarrera from './TableAsignarCoordinadorCarrera';
import Stack from '@mui/material/Stack';
import { getAsignaturasDeCarrera } from '../../../services/requests/asignaturaService';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

export default function ListadosBusquedas() {
    const [open, setOpen] = React.useState(true);
    // const toggleDrawer = () => {
    //     setOpen(!open);
    // };
    const { user } = useContext(AuthContext);
    const history = useNavigate();
    const [asignaturasCarreraData, setAsignaturasCarreraData] = useState([]);
    const [error, setError] = useState(null);

  
    useEffect(() => {
        const fetchCarreras = async () => {
            try {
                const result = await getAsignaturasDeCarrera(2,user.jwtLogin);
                setAsignaturasCarreraData(result);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchCarreras();
    }, [user]);

    useEffect(() => {
        if (asignaturasCarreraData) {
            console.log("Carreras: ", asignaturasCarreraData);
        }
    }, [asignaturasCarreraData]);

    ///
    return (
        <Stack direction="row" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} spacing={2}>
            <>
                <div className="tracking-tight lg:flex-row-reverse">
                    <div className="flex grid lg:grid-cols-2 grid-cols-2">
                        <section className="text-black body-font">
                            <div className="px-2 py-5 mx-auto">
                                <div>

                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </>
        </Stack>
    );
}