import React, { useState, useEffect, useContext } from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import Stack from '@mui/joy/Stack';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Tooltip from '@mui/joy/Tooltip';
import { AuthContext } from '../../../context/AuthContext';
import { getCarreras, asignarCoordinadorCarrera } from '../../../services/requests/carreraService';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

function selectValidar(id, validado) {
    return { id, validado };
}
const dataSelect = [
    selectValidar(true, "Validado"),
    selectValidar(false, "No Validado"),
];

export function ModalSelect(ida) {
    const { user } = useContext(AuthContext);
    const [open, setOpen] = React.useState(false);
    const [carreraData, setCarreraData] = useState([]);
    const [error, setError] = useState(null);
    const history = useNavigate();

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
            console.log("Carrerass: ", carreraData);
        }
    }, [carreraData]);

    ///
    let intValue = parseInt(ida.value, 10);
    // let intValue = convertObjectToInt(ida);
    console.log(ida.id);

    const handleAsignar = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let idCarrera = data.get('idcarrera');
        let idUsuario = data.get(ida);

        const idCa = idCarrera;
        console.log(`IDcarrera: ${idCarrera}`);
        console.log("IDcoorinador: ", ida.id);
        if (ida !== null) {
            try {
                await asignarCoordinadorCarrera(idCarrera, ida, user.jwtLogin);
                swal({
                    title: "¡Cambios validados!\n\n",
                    text: "Se le asigno al coordinador la carrera \n" + carreraData[idCa - 1].nombre, ///idCa.ida + "",
                    icon: "success",
                    dangerMode: false,
                    position: "center",
                    timer: 5000
                });
                //    history('/Novedades');
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
        }
    };

    return (
        <React.Fragment>
            <Tooltip title="Asignar coordinador a una carrera">
                <Button size="sm" variant="outlined" color="primary" onClick={() => setOpen(true)}>
                    Asignar
                </Button>
            </Tooltip>
            <Modal open={open} onClose={() => setOpen(false)}>
                <ModalDialog>
                    <DialogTitle>Asignar carrera</DialogTitle>
                    <form onSubmit={(event) => {
                        event.preventDefault(); handleAsignar(event) && setOpen(false);
                    }}>
                        <Stack spacing={2}>
                            <FormControl>
                                <Select size="sm" defaultValue="Seleccionar una carrera..." placeholder="Seleccionar una carrera..." id="idcarrera" name="idcarrera">
                                    {carreraData.map((carrera, index) => (
                                        <Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button type="submit">Confirmar</Button>
                        </Stack>
                    </form>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}
