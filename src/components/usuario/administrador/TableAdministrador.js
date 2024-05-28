import { useState, useEffect, useContext } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

import { TablePagination, tablePaginationClasses as classes, } from '@mui/base/TablePagination';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import { getUsuarios, bajaUsuario } from '../../../services/requests/usuarioService';
import TaskAltSharpIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/joy/Tooltip';
import { URI_FRONT, redirigir } from '../../../services/util/constants';


function selectValidar(id, validado) {
  return { id, validado };
}
const dataSelect = [
  selectValidar(true, "Validado"),
  selectValidar(false, "No Validado"),
];


export default function TableAdministrador() {
  const { user } = useContext(AuthContext);
  const history = useNavigate();
  const [error, setError] = useState(null);
  const [coordinadorData, setCoordinadorData] = useState([]);

  useEffect(() => {
    const fetchCoordinador = async () => {
      try {
        const result = await getUsuarios(user.jwtLogin);
        setCoordinadorData(result);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchCoordinador();
  }, [user]);

  useEffect(() => {
    if (coordinadorData) {
      console.log("coordinadorData: ", coordinadorData);
    }
  }, [coordinadorData]);

  ///
  const handleModificar = (idUsuario) => {
    console.log(`ID54: ${idUsuario}`);
    redirigir(URI_FRONT.modificarFuncionarioUri + `?id=${idUsuario}`);
  }

  const handleDeleteUser = async (idUsuario) => {
    await bajaUsuario(idUsuario, user.jwtLogin);
    console.log(`IDs: ${idUsuario}`);
  };

  return (
    <Box sx={{ minHeight: '20vh', maxWidth: '600px' }}>
      <Typography level="body-sm" color='neutral' textAlign="center" sx={{ pb: 1 }}>
        ← Funcionarios y Coordinadores →
      </Typography>
      <Sheet
        variant="outlined"
        sx={{
          '--TableCell-height': '30px',
          '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
          '--Table-firstColumnWidth': '140px', '--Table-lastColumnWidth': '90px', '--Table-buttonColumnWidth': '80px',
          '--TableRow-hoverBackground': 'rgb(3, 202, 192, 0.30)',
          borderCollapse: 'separate', borderSpacing: '0', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', overflow: 'auto',
          background: (theme) =>
            `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
        linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 90%) 0 100%`,
          backgroundSize:
            '40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))', backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'local, local, scroll, scroll',
          backgroundPosition:
            'var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)',
          backgroundColor: 'background.surface',
        }}
      >

        <Table hoverRow>
          <thead>
            <tr>
              <th style={{ width: 'var(--Table-firstColumnWidth)' }}>Nombre</th>
              <th style={{ width: 'var(--Table-lastColumnWidth)' }}>Cédula</th>
              <th style={{ width: 'var(--Table-lastColumnWidth)' }}>Rol</th>
              <th style={{ width: 'var(--Table-lastColumnWidth)' }}>Estado</th>
              <th aria-label="last" style={{ width: 'var(--Table-buttonColumnWidth)' }} />
            </tr>
          </thead>
          <tbody>
            {coordinadorData.map((row) => (
              row.rol !== 'E' && row.rol !== 'A' && (
                <tr key={row.idUsuario}>
                  <td>{row.nombre} {row.apellido}</td>
                  <td>{row.cedula}</td>
                  <td>{row.rol === "F" ? 'Funcionario' : row.rol === "C" ? 'Coordinador' : ''}</td>
                  <td>{row.activo ? 'Activo' : 'Inactivo'}</td>
                  <td>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <Button size="small" variant="plain" color="primary" onClick={() => handleModificar(row.idUsuario)}>
                        <Tooltip title="Modificar datos" variant="plain" color="primary">
                          <AccountBoxRoundedIcon />
                        </Tooltip>
                      </Button>
                      <Button size="small" variant="plain" color="danger" onClick={() => handleDeleteUser(row.idUsuario)}>
                        <Tooltip title="Baja usuario" variant="plain" color="danger">
                          <TaskAltSharpIcon />
                        </Tooltip>
                      </Button>
                    </Box>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </Table>
      </Sheet>
    </Box>
  );
}
