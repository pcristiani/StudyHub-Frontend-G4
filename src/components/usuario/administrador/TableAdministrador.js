import { useState, useEffect, useContext } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { formatoCi, borrarFormatoCi } from '../../../services/util/formatoCi';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { getUsuarios, bajaUsuario, getUsuario, modificarDatosUsuario } from '../../../services/requests/usuarioService';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

import Tooltip from '@mui/joy/Tooltip';
import { URI_FRONT, redirigir } from '../../../services/util/constants';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';


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
  const [dataBaja, setDataBaja] = useState([]);

  // useEffect(() => {
  //   const fetchCoordinador = async () => {
  //     try {
  //       const result = await getUsuarios(user.jwtLogin);
  //       setCoordinadorData(result);
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //   };
  //   fetchCoordinador();
  // }, [user]);

  const fetchCoordinador = async () => {
    try {
      const result = await getUsuarios(user.jwtLogin);
      setDataBaja(result);
    } catch (error) {
      setError(error.message);
    }

  };

  useEffect(() => {
    fetchCoordinador();
  }, [user]);


  useEffect(() => {
    if (dataBaja) {
      console.log("coordinadorData: ", dataBaja);
    }
  }, [dataBaja]);

  ///
  const handleModificar = (idUsuario) => {
    redirigir(URI_FRONT.modificarFuncionarioUri + `?id=${idUsuario}`);
  }

  const handleDeleteUser = async (idUsuario, activo) => {
    if (!activo) {
      // const usuario = await getUsuario(idUsuario, user.jwtLogin);
      //   await modificarDatosUsuario(idUsuario, usuario.nombre, usuario.apellido, usuario.email, usuario.fechaNacimiento, usuario.rol, usuario.cedula, user.jwtLogin);
      // .then((result) => {
      // if (result) {
      //   console.log("Datos modificados correctamente: ", result);
      // } else {
      //   console.log("Error al modificar los datos del usuario: ", result);
      // }
      //  fetchCoordinador();
      //  });
    } else {
      try {
        await bajaUsuario(idUsuario, user.jwtLogin);
        fetchCoordinador();
      } catch (error) {
        setError(error.message);
      }
    }
  };


  return (
    <Box sx={{ minHeight: '20vh', maxWidth: '550px' }}>
      <Box sx={{ margin: 0.6, alignSelf: 'center', pb: 1.2 }}>
        <Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Funcionarios y Coordinadores</Typography>
      </Box>
      <Sheet
        variant="outlined"
        sx={{
          '--TableCell-height': '30px', '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
          '--Table-firstColumnWidth': '120px', '--Table-lastColumnWidth': '90px', '--Table-lastColumnWidth2': '60px', '--Table-buttonColumnWidth': '60px',
          '--TableRow-hoverBackground': 'rgb(3, 202, 192, 0.30)',
          borderCollapse: 'separate', borderSpacing: '0', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', overflow: 'auto',
          background: (theme) =>
            `linear-gradient(to right, ${theme.vars.palette.background.surface} 30%, rgba(255, 255, 255, 0)),
        linear-gradient(to right, rgba(255, 255, 255, 0), ${theme.vars.palette.background.surface} 90%) 0 100%`,
          backgroundSize:
            '40px calc(100% - var(--TableCell-height)), 40px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))', backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'local, local, scroll, scroll',

          backgroundColor: 'background.surface',
        }}
      >
        {/* <Sheet variant="outlined" sx={{ boxShadow: 'sm', borderRadius: 'sm', minHeight: '10vh', maxWidth: '520px' }}> */}

        <Table aria-labelledby="tableTitle" hoverRow
          sx={{
            cursor: 'pointer',
            '--TableRow-hoverBackground': 'rgb(3, 87, 4, 0.20)',
            '--TableCell-headBackground': 'transparent',
            borderCollapse: 'separate', borderSpacing: '0', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px', overflow: 'auto',
            '& thead th:nth-child(1)': { width: '68%', },
            '& thead th:nth-child(2)': { width: '15%' },
            '& tr > *:nth-child(n+3)': { width: '11%', textAlign: 'center' },
          }}
        >
          
          {/* <Table hoverRow> */}
          <thead>
            <tr>
              <th style={{ width: 'var(--Table-firstColumnWidth)' }}>Nombre</th>
              {/* <th style={{ width: 'var(--Table-lastColumnWidth2)' }}>Cédula</th> */}
              <th style={{ width: 'var(--Table-lastColumnWidth)' }}>Rol</th>
              <th style={{ width: 'var(--Table-lastColumnWidth2)' }}>Estado</th>
              <th aria-label="last" style={{ width: 'var(--Table-buttonColumnWidth)' }} />
            </tr>
          </thead>
          <tbody>
            {dataBaja.map((row) => (
              row.rol !== 'E' && row.rol !== 'A' && (
                <tr key={row.idUsuario}>
                  <td>{row.nombre} {row.apellido}</td>
                  {/* <td>{formatoCi(row.cedula)}</td> */}
                  <td>{row.rol === "F" ? 'Funcionario' : row.rol === "C" ? 'Coordinador' : ''}</td>
                  <td>{row.activo ? 'Activo' : 'Inactivo'}</td>
                  <td>
                    <Box sx={{ display: 'flex', gap: 0 }}>
                      <Button size="small" variant="plain" color="primary" onClick={() => handleModificar(row.idUsuario)}>
                        <Tooltip title="Modificar datos" variant="plain" color="primary">
                          <DriveFileRenameOutlineOutlinedIcon />
                        </Tooltip>
                      </Button>
                      <Button size="small" variant="none" color="warning" onClick={() => handleDeleteUser(row.idUsuario, row.activo)}>
                        <Tooltip title="Baja usuario" >
                          <td>{row.activo ? <ToggleOnOutlinedIcon variant="plain" color="primary" /> : <ToggleOffOutlinedIcon variant="plain" color="warning" />}</td>
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
