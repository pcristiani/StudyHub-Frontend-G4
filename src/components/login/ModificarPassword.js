import React, { useEffect, useContext } from 'react';

import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Input from '@mui/joy/Input';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import swal from 'sweetalert';
import { AuthContext } from '../../context/AuthContext';
import { modificarPassword } from '../../services/requests/loginService';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';


export default function ModificarPassword() {
    const { user } = useContext(AuthContext);
    const history = useNavigate();
    const [open, setOpen] = React.useState(true);

    async function modificarPasswordUsuario(ud, s, userjwtLogin) {
        const result = await modificarPassword(ud, s, userjwtLogin);
        if (result !== null && result !== undefined) {
            swal("¡Éxito!", 'Has cambiado correctamente la contraseña', "success", {
                timer: 3000
            });
            history('/');
        } else {
            swal("¡Advertencia!", 'Un error inesperado ocurrio', "error", {
                timer: 3000
            });
        }
    }

    const handleAsignar = (event) => {
        event.preventDefault();
        const dat = new FormData(event.currentTarget);
        let newPassword = dat.get('password');
        let newPassword2 = dat.get('password2');

        if (newPassword2 !== newPassword) {
            swal("¡Advertencia!", 'Contraseñas no coinciden', "error", {
                timer: 2000,
            });
            // history('/');
        } else {
            modificarPasswordUsuario(user.id, newPassword, user.jwtLogin);
        }
    }
    useEffect(() => {
        if (!open) {
            history('/');
        }
    }, [open, history]);
    return (
        <React.Fragment>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog>
                    <Typography level="title-md">Cambiar contraseña</Typography>
                    <form onSubmit={(event) => {
                        event.preventDefault(); handleAsignar(event) && setOpen(false);
                    }}>
                        <Stack spacing={1.5}>
                            <FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '260px' }, gap: 0.8 }}>
                                <Input size="sm" type='password' id="password" name="password" placeholder="Nueva contraseña" required />
                                <Input size="sm" type='password' id="password2" name="password2" placeholder="Confirmar nueva contraseña" required />
                            </FormControl>
                            <Button type="submit" variant="soft" color="primary" >Actualizar contraseña</Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
