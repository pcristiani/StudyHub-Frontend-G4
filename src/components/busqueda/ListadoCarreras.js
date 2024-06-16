import React, { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../../context/AuthContext';
import { getCarreras } from '../../services/requests/carreraService';
import PropTypes from 'prop-types';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Tooltip from '@mui/joy/Tooltip';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { visuallyHidden } from '@mui/utils';
import { Menu, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import Autocomplete, { createFilterOptions } from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import { AddBox } from '@mui/icons-material';
import { URI_FRONT, redirigir } from '../../services/util/constants';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

const filters = createFilterOptions();

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'nombre',
    numeric: false,
    disablePadding: false,
    label: 'Nombre',
  },
  {
    id: 'descripcion',
    numeric: true,
    disablePadding: false,
    label: 'Desripción',
  },

];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <thead>
      <tr>
        <th>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            slotProps={{ input: { 'aria-label': 'select all desserts' } }}
            sx={{ verticalAlign: 'sub' }}
          />
        </th>
        {headCells.map((headCell) => {
          const active = orderBy === headCell.id;
          return (
            <th key={headCell.id} aria-sort={active ? { asc: 'ascending', desc: 'descending' }[order] : undefined}>
              <Link underline="none" color="neutral" textColor={active ? 'primary.plainColor' : undefined}
                component="button" onClick={createSortHandler(headCell.id)} fontWeight="lg"
                startDecorator={
                  headCell.numeric ? (
                    <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                  ) : null
                }
                endDecorator={
                  !headCell.numeric ? (
                    <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                  ) : null
                }
                sx={{
                  '& svg': { transition: '0.2s', transform: active && order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)', }, '&:hover': { '& svg': { opacity: 1 } },
                }}>
                {headCell.label}
                {active ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </Link>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const handleAdd = (idCarrera) => {
  console.log('Agregar carrera con ID:', idCarrera);
};

const handleModificar = (idCarrera) => {
  redirigir(URI_FRONT.modificarFuncionarioUri + `?id=${idCarrera}`);
}

const handleAlta = () => {
  redirigir(URI_FRONT.altaFuncionarioCoordinadorUri);
}

function EnhancedTableToolbar(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { numSelected, onFilter, selected } = props;
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', py: 0.8, pl: { sm: 2 }, pr: { xs: 1, sm: 1 }, bgcolor: numSelected > 0 ? 'background.level1' : 'transparent', borderTopLeftRadius: 'var(--unstable_actionRadius)', borderTopRightRadius: 'var(--unstable_actionRadius)' }}>
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} component="div">{numSelected} seleccionado</Typography>
      ) : (
        <Typography level="body-lg" sx={{ flex: '1 1 100%' }} id="tableTitle" component="div">Carreras</Typography>
      )}
      {numSelected > 0 ? (
        <>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', gap: 0.5 }}>
            <Tooltip title="Alta funcionario/coordinador">
              <IconButton size="sm" color="neutral" variant="outlined" onClick={() => handleAlta()}>
                <AddBox />
              </IconButton>
            </Tooltip>

            <Tooltip title="Modificar">
              <IconButton size="sm" variant="outlined" color="neutral" onClick={() => handleModificar(selected[0])}>
                <DriveFileRenameOutlineOutlinedIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Borrar">
              <IconButton size="sm" variant="outlined" color="neutral" onClick={() => handleAdd(selected[0])}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      ) : (
        <>
          <IconButton size="sm" variant="outlined" color="neutral" onClick={handleClick}>
            <FilterListIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={() => onFilter('La duración de la carrera será de 2 años')}>2 años de duración</MenuItem>
            <MenuItem onClick={() => onFilter('La duración de la carrera será de 3 años')}>3 años de duración</MenuItem>
            <MenuItem onClick={() => onFilter('La duración de la carrera será de 4 años')}>4 años de duración</MenuItem>
            <MenuItem onClick={() => onFilter('')}>Todas las carreras</MenuItem>
          </Menu>
        </>
      )}
    </Box>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onFilter: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
};

export default function ListadoCarreras() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('nombre');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filter, setFilter] = useState('');

  const [carrerasData, setCarrerasData] = useState([]);
  const { user } = useContext(AuthContext);
  const [value, setValue] = useState(null);

  useEffect(() => {
    async function fetchCarreras() {
      const carreras = await getCarreras(user.jwtLogin);
      if (carreras !== undefined) {
        setCarrerasData(carreras);
      }
    }
    fetchCarreras();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = carrerasData.map((n) => n.idCarrera);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, idCarrera) => {
    const selectedIndex = selected.indexOf(idCarrera);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, idCarrera);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setRowsPerPage(parseInt(event.target.value, 10));
  //   setPage(0);
  // };

  // const handleFilter = (filterValue) => {
  //   setFilter(filterValue);
  // };

  // const filteredData = carrerasData.filter((carrera) => carrera.descripcion.includes(filter));

  // const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredData.length - page * rowsPerPage);

  const handleChangePage = (newPage) => setPage(newPage);
  const isSelected = (idCarrera) => selected.indexOf(idCarrera) !== -1;
  const handleFilter = (nombre) => setFilter(nombre);
  const filteredUsers = filter ? carrerasData.filter((user) => user.nombre === filter) : carrerasData;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers.length) : 0;
  const handleAutocompleteChange = (event, newValue) => {
    setValue(newValue);
    setFilter(newValue ? newValue.nombre : '');
  };
  // const isSelected = (idCarrera) => selected.indexOf(idCarrera) !== -1;

  // const handleFilter = (descripcion) => setFilter(descripcion);

  // const filteredUsers = filter ? carrerasData.filter((user) => user.descripcion === filter) : carrerasData;
  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredUsers.length) : 0;

  // const handleAutocompleteChange = (event, newValue) => {
  //   setValue(newValue);
  //   setFilter(newValue ? newValue.descripcion : '');
  // };

  // const groupedOptions = filteredData.length ? filteredData : [];

  return (
    <Sheet variant="outlined" sx={{ marginTop: 6, boxShadow: 'sm', borderRadius: 'sm', minHeight: '10vh', maxWidth: '600px' }}>
      <EnhancedTableToolbar numSelected={selected.length} onFilter={handleFilter} selected={selected} />
      <Table aria-labelledby="tableTitle" hoverRow
        sx={{
          '--TableCell-headBackground': 'transparent', '--TableCell-selectedBackground': (theme) => theme.vars.palette.success.softBg,
          '& thead th:nth-child(1)': { width: '40px' }, '& thead th:nth-child(2)': { width: '35%' },
        }}>
        <EnhancedTableHead
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={carrerasData.length}
        />
        <tbody>
          {stableSort(filteredUsers, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((carrera, index) => {
              // const isItemSelected = selected.indexOf(carrera.idCarrera) !== -1;
              // const labelId = `enhanced-table-checkbox-${index}`;
              const isItemSelected = isSelected(carrera.idCarrera);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <tr
                  onClick={(event) => handleClick(event, carrera.idCarrera)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={carrera.idCarrera}
                  selected={isItemSelected}
                >
                  <th scope="row">
                    <Checkbox
                      checked={isItemSelected}
                      slotProps={{ input: { 'aria-labelledby': labelId } }}
                      sx={{ verticalAlign: 'top' }}
                    />
                  </th>
                  <th id={labelId} scope="row">
                    {carrera.nombre}
                  </th>
                  <td>{carrera.descripcion}</td>
                </tr>
              );
            })}
          {emptyRows > 0 && (
            <tr style={{ height: 63 * emptyRows }}>
              <td colSpan={3} />
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>
              <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                {/* <Autocomplete
                  placeholder="Buscar carrera"
                  options={carrerasData.map((carrera) => carrera.nombre)}
                  sx={{ width: '50%' }}
                  filterOptions={(options, state) => filters(options, state)}
                  onChange={(event, newValue) => {
                    const selectedCarrera = carrerasData.find((carrera) => carrera.nombre === newValue);
                    if (selectedCarrera) {
                      handleClick(event, selectedCarrera.id);
                    }
                  }}
                  renderOption={(props, option) => (
                    <AutocompleteOption {...props} key={option}>
                      {option}
                    </AutocompleteOption>
                  )}
                /> */}
                <Autocomplete
                  sx={{ width: '100%' }}
                  placeholder="Filtrar por nombre"
                  options={filteredUsers}
                  getOptionLabel={(option) => option.nombre}
                  onChange={handleAutocompleteChange}
                  value={value}
                  filterOptions={(options, params) => {
                    const filtered = filters(options, params);
                    const { inputValue } = params;
                    const isExisting = options.some((option) => inputValue === option.nombre);
                    if (inputValue !== '' && !isExisting) {
                      filtered.push({ nombre: inputValue });
                    }
                    return filtered;
                  }}
                  renderOption={(props, option) => (
                    <AutocompleteOption {...props} key={option.nombre}>
                      {option.nombre}
                    </AutocompleteOption>
                  )}
                />
                <Box sx={{ width: '20%', display: 'flex', alignItems: 'center', gap: 0.5, justifyContent: 'flex-end' }}>
                  <IconButton size="sm" color="neutral"
                    variant="outlined" disabled={page === 0}
                    onClick={() => handleChangePage(page - 1)}
                    sx={{ bgcolor: 'background.surface' }}>
                    <KeyboardArrowLeftIcon />
                  </IconButton>
                  <IconButton size="sm" color="neutral" variant="outlined"
                    disabled={carrerasData.length !== -1 ? page >= Math.ceil(carrerasData.length / rowsPerPage) - 1 : false}
                    onClick={() => handleChangePage(page + 1)}
                    sx={{ bgcolor: 'background.surface' }}>
                    <KeyboardArrowRightIcon />
                  </IconButton>
                </Box>
              </Box>
            </td>
          </tr>
        </tfoot>
      </Table>
    </Sheet>
  );
}


// import React, { useState, useEffect, useContext } from 'react';
// import Box from '@mui/joy/Box';
// import Button from '@mui/joy/Button';
// import Divider from '@mui/joy/Divider';
// import FormControl from '@mui/joy/FormControl';
// import Stack from '@mui/joy/Stack';
// import Typography from '@mui/joy/Typography';
// import Card from '@mui/joy/Card';

// import { useNavigate } from 'react-router-dom';
// import { AuthContext } from '../../context/AuthContext';
// import { getCarreras } from '../../services/requests/carreraService';
// import { getAsignaturasDeCarrera, getCursadasPendientes, cambiarResultadoCursada } from '../../services/requests/asignaturaService';
// import Save from '@mui/icons-material/Save';
// import Sheet from '@mui/joy/Sheet';
// import Table from '@mui/joy/Table';
// import Autocomplete, { createFilterOptions } from '@mui/joy/Autocomplete';
// import AutocompleteOption from '@mui/joy/AutocompleteOption';
// const filters = createFilterOptions

// export default function ListadoCarreras() {
//   const { user } = useContext(AuthContext);
//   const [carreraData, setCarreraData] = useState([]);
//   const [value, setValue] = useState(null);
//   const [filter, setFilter] = useState('');
//   const history = useNavigate();
//   const [error, setError] = useState(null);
//   const [cursadasData, setCursadasData] = useState([]);
//   const [asignaturaData, setAsignaturaData] = useState([]);
//   const [selectedCarrera, setSelectedCarrera] = useState('');
//   const [resultadoData, setResultado] = useState('');

//   useEffect(() => {
//     const fetchCarreras = async () => {
//       try {
//         const result = await getCarreras(user.jwtLogin);
//         setCarreraData(result);
//       } catch (error) {
//         setError(error.message);
//       }
//     };
//     fetchCarreras();
//   }, [user]);

//   useEffect(() => {
//     if (carreraData) {
//       // console.log("Carreras: ", carreraData);
//     }
//   }, [carreraData]);

//   const handleChangeCarrera = (event, newValue) => {
//     // console.log("Selected: ", newValue);
//     setSelectedCarrera(newValue);
//     if (newValue !== null) {
//       getInfoCarrera(newValue);
//     }
//   };

//   async function getInfoCarrera(selectedCarrera) {
//     let result = await getAsignaturasDeCarrera(selectedCarrera, user.jwtLogin);
//     setAsignaturaData(result);
//   }

//   const handleModificar = async (idCursada) => {
//     // console.log("Id: ", idCursada, resultadoData,);
//     // const result = await cambiarResultadoCursada(idCursada, resultadoData, user.jwtLogin);
//     // console.log("CursadasPendientes: ", result);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     let idAsignatura = data.get('idasignatura');
//     let anioLectivo = parseInt(data.get('aniolectivo'), 10);

//     const resp = await getCursadasPendientes(idAsignatura, anioLectivo, user.jwtLogin);
//     setCursadasData(resp);
//   };

//   const handleFilter = (nombre) => setFilter(nombre);
//   const filteredUsers = filter ? carreraData.filter((user) => user.nombre === filter) : carreraData;

//   const handleAutocompleteChange = (event, newValue) => {
//     setValue(newValue);
//     setFilter(newValue ? newValue.nombre : '');
//   };

//   return (
//     <Box component="form" sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }} onSubmit={handleSubmit}>
//       <Card sx={{ display: 'flex', alignSelf: 'center', }}>
//         <Box sx={{ margin: 0.6, alignSelf: 'center' }}>
//           <Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Listado Carreras</Typography>
//         </Box>
//         <Divider />
//         <Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
//           <FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '540px' }, gap: 0.3 }}>
//             {/* <Select size="sm" defaultValue="Seleccionar carrera" placeholder="Seleccionar carrera" id="idcarrera" name="idcarrera" onChange={handleChangeCarrera} >
//               {carreraData.map((carrera, index) => (
//                 <Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
//               ))}
//             </Select> */}

//             <Autocomplete
//               sx={{ width: '100%' }}
//               placeholder="Filtrar por nombre"
//               options={carreraData}
//               getOptionLabel={(option) => option.nombre}
//               onChange={handleAutocompleteChange}
//               value={value}
//             // filterOptions={(options, params) => {
//             //   const filtered = filters(options, params);
//             //   const { inputValue } = params;
//             //   const isExisting = options.some((option) => inputValue === option.nombre);
//             //   if (inputValue !== '' && !isExisting) {
//             //     filtered.push({ nombre: inputValue });
//             //   }
//             //   return filtered;
//             // }}
//             // renderOption={(props, option) => (
//             //   <AutocompleteOption {...props} key={option.nombre}>
//             //     {/* {option.nombre} */}
//             //   </AutocompleteOption>
//             // )}
//             />

//             {/* onChange={handleChangeAsignatura} */}
//             {/* <Select size="sm" placeholder="Seleccionar asignatura" id="idasignatura" name="idasignatura" required>
//               {Array.isArray(asignaturaData) && asignaturaData.map((asignatura, index) => (
//                 <Option key={index} value={asignatura.idAsignatura}>{asignatura.nombre}</Option>
//               ))}
//             </Select> */}
//             <Divider sx={{ marginBottom: 1.5, marginTop: 1 }} />
//             <section className="text-black body-font">
//               <div>
//                 <Sheet variant="outlined"
//                   sx={{
//                     '--TableCell-height': '30px', '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
//                     '--Table-firstColumnWidth': '190px', '--Table-lastColumnWidth': '90px', '--Table-lastColumnWidth2': '60px', '--Table-buttonColumnWidth': '65px', '--TableRow-hoverBackground': 'rgb(3, 202, 192, 0.30)',
//                     borderCollapse: 'separate', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', overflow: 'auto',
//                   }}>

//                   <Table hoverRow>
//                     <thead>
//                       <tr>
//                         <th style={{ width: 'var(--Table-firstColumnWidth)' }}>Nombre</th>
//                         {/* <th style={{ width: 'var(--Table-lastColumnWidth)' }}>Cédula</th> */}
//                         <th style={{ width: 'var(--Table-buttonColumnWidth)' }}></th>
//                         <th style={{ width: 'var(--Table-buttonColumnWidth)' }}></th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {carreraData.map((row) => (
//                         (
//                           <tr key={row.idCarrera}>
//                             <td>{row.nombre}</td>
//                             {/* <td>{row.cedula}</td> */}
//                             {/* <td>
// 															<Select size="sm" placeholder="Pendiente" id="idresultado" name="idresultado" onChange={handleChangeResultado}>
// 																{diasSemana.map((resultado, index) => (
// 																	<Input key={index} value={resultado.value}>{resultado.label}</Input>
// 																))}
// 															</Select>
// 														</td> */}
//                             {/* <td>
//                               <Select size="sm" placeholder="0" onChange={(event, newValue) => setResultado(newValue)}
//                                 id="idresultado" name="idresultado">{notas.map((nota) => (
//                                   <Option key={notas} value={nota}>{nota}</Option>
//                                 ))}
//                               </Select>
//                             </td> */}
//                             <td>
//                               <Button size="sm" sx={{ border: 0.1, borderColor: '#3d3d3d', alignItems: 'right' }} variant="outlined" color='primary'
//                                 onClick={() => handleModificar(row.idCursada)} >
//                                 Asignaturas
//                               </Button>
//                             </td>
//                             <td>
//                               <Button size="sm" sx={{ border: 0.1, borderColor: '#3d3d3d', alignItems: 'right' }} variant="outlined" color='primary'
//                                 onClick={() => handleModificar(row.idCursada)} >
//                                 Info
//                               </Button>
//                             </td>
//                           </tr>
//                         )
//                       ))}
//                     </tbody>
//                   </Table>
//                 </Sheet>
//               </div>
//             </section>
//           </FormControl>
//         </Stack>
//       </Card>
//     </Box>
//   );
// };

// const timeSlots = Array.from(new Array(24 * 1)).map(
//   (_, index) =>
//     `${index < 20 ? '' : ''}${Math.floor(index / 1)
//     }:00`,
// );

