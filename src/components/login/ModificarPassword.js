import React, { useContext } from 'react';

import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { modificarPassword } from '../../services/requests/loginTest';
import { AuthContext } from '../../context/AuthContext';

export function ModificarPassword() {
    // console.log("open: ");
    const [open, setOpen] = React.useState(true);
    const { user } = useContext(AuthContext);

    const handleReset = () => {
        modificarPassword("1", user.jwtLogin);
        console.log(`Validar usuario con ID: ${user.idUsuario}`);
    };
    return (
        <React.Fragment>
            <Modal open={open} onClose={(handleSubmit) => setOpen(true)}>
                <ModalDialog variant="outlined" role="alertdialog" onSubmit={handleReset}>
                    <DialogTitle>
                        <WarningRoundedIcon />
                        Confirmation
                    </DialogTitle>
                    <Divider />
                    <DialogContent>
                        Are you sure you want to discard all of your notes?
                    </DialogContent>
                    <DialogActions>
                        <Button variant="solid" color="danger" type="submit" onClick={handleReset} >
                            Discard notes
                        </Button>
                        <Button variant="plain" color="neutral" type="submit" onClick={(handleReset) => setOpen(true)}>
                            Cancel
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
export default ModificarPassword;