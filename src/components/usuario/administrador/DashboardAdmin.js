import React from 'react';

import TableAdmin from './TableAdmin';
import Stack from '@mui/material/Stack';
import Root from './TableAdmin';
import Button from '@mui/joy/Button';

const options = [];

export default function DashboardAdmin() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    // const [value, setValue] = React.useState(options[0]);
    // const [inputValue, setInputValue] = React.useState('');
    // const [isButtonVisible, setIsButtonVisible] = React.useState(false);

    return (
        <Stack direction="row" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} spacing={2}>
            <>
                <div className="tracking-tight lg:flex-row-reverse">
                    <div className="flex grid lg:grid-cols-2 grid-cols-2">

                        <section className="text-black body-font">
                            <div className="px-2 py-5 mx-auto">
                                {/* <div className="flex flex-col text-center w-full mb-2">
                                    <div className="select-none text-black flex space-x-2 mx-auto max-w-sm justify-center">
                                        <Button variant="soft" color="primary" type="submit" className="text-white px-4 py-1 mx-1 rounded-md" onClick={() => window.location.href = '/'}>
                                            Alta
                                        </Button>
                                        <Button variant="soft" color="primary" type="submit" className="text-white px-4 py-1 mx-1 rounded-md" onClick={() => window.location.href = '/'}>
                                            Buscar
                                        </Button>
                                        <Button variant="soft" color="primary" type="submit" className="text-white px-4 py-1 mx-1 rounded-md" onClick={() => window.location.href = '/'}>
                                            Modificar
                                        </Button>
                                        <Button variant="soft" color="primary" type="submit" className="text-white px-4 py-1 mx-1 rounded-md" onClick={() => window.location.href = '/'}>
                                            Baja
                                        </Button>
                                    </div>
                                </div> */}
                                {/* <h5 className="text-left sm:text-md text-base">Usuarios</h5> */}
                                <TableAdmin />
                            </div>
                        </section>
                    </div>
                </div>
            </>

        </Stack>
    );
}