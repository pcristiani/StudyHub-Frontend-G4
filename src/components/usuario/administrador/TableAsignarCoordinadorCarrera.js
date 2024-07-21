import { useState, useEffect, useContext } from 'react';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { TablePagination, tablePaginationClasses as classes, } from '@mui/base/TablePagination';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { getUsuarios } from '../../../services/requests/usuarioService';
import { ModalSelect } from './ModalSelect';
import { formatoCi } from '../../../services/util/formatoCi';


function selectValidar(id, validado) {
  return { id, validado };
}

export default function TableAsignarCoordinadorCarrera() {
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
  return (
    <Box sx={{ minHeight: '20vh', maxWidth: '550px' }}>
      {/* <Typography level="body-sm" color='neutral' textAlign="center" sx={{ pb: 1 }}>
        ← Asignar Coordinador a carrera →
      </Typography> */}
      <Box sx={{ margin: 0.6, alignSelf: 'center', pb: 1.2 }}>
        <Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Asignar Coordinador a carrera</Typography>
      </Box>
      <Sheet
        variant="outlined"
        sx={{
          '--TableCell-height': '30px', '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
          '--Table-firstColumnWidth': '120px', '--Table-lastColumnWidth': '90px', '--Table-lastColumnWidth2': '60px', '--Table-buttonColumnWidth': '60px',
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
        }}>

        <Table hoverRow>
          <thead>
            <tr>
              <th style={{ width: 'var(--Table-firstColumnWidth)' }}>Nombre</th>
              {/* <th style={{ width: 'var(--Table-lastColumnWidth)' }}>Cédula</th> */}
              <th style={{ width: 'var(--Table-lastColumnWidth)' }}>Rol</th>
              <th style={{ width: 'var(--Table-lastColumnWidth2)' }}>Estado</th>
              <th aria-label="last" style={{ width: 'var(--Table-buttonColumnWidth)' }} />
            </tr>
          </thead>
          <tbody>
            {coordinadorData.map((row) => (
              row.rol === 'C' && (
                <tr key={row.idUsuario}>
                  <td>{row.nombre} {row.apellido}</td>
                  {/* <td>{formatoCi(row.cedula)}</td> */}
                  <td>{row.rol === "F" ? 'Funcionario' : row.rol === "C" ? 'Coordinador' : ''}</td>
                  <td>{row.activo ? 'Activo' : 'Inactivo'}</td>
                  <td>
                    <ModalSelect ida={row.idUsuario} />
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