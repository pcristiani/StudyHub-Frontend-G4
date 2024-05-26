import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TableAdmin from './TableAdmin';
import AsignarCoordinadorCarrera from './AsignarCoordinadorCarrera';
import Stack from '@mui/material/Stack';


export default function DashboardAdmin() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const location = useLocation();
    const [id, setId] = useState(null);

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const idFromUrl = queryParams.get('id');
        setId(idFromUrl);
    }, [location]);

    return (
        <Stack direction="row" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} spacing={2}>
            <>
                <div className="tracking-tight lg:flex-row-reverse">
                    <div className="flex grid lg:grid-cols-2 grid-cols-2">
                        <section className="text-black body-font">
                            <div className="px-2 py-5 mx-auto">
                                <div>
                                    {id === 'm' ? <TableAdmin /> : id === 'a' ? <AsignarCoordinadorCarrera /> : ''}
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </>
        </Stack>
    );
}