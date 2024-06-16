import React, { useState, useEffect, useContext } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { getCarreras } from '../../../services/requests/carreraService';
import { getAsignaturasDeCarrera, cursadasPendientes, cambiarResultadoCursada } from '../../../services/requests/asignaturaService';
import Save from '@mui/icons-material/Save';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import Autocomplete, { createFilterOptions } from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
const filters = createFilterOptions

export default function ListadoCarreras() {
  const { user } = useContext(AuthContext);
  const [carreraData, setCarreraData] = useState([]);
  const [value, setValue] = useState(null);
  const [filter, setFilter] = useState('');
  const history = useNavigate();
  const [error, setError] = useState(null);
  const [cursadasData, setCursadasData] = useState([]);
  const [asignaturaData, setAsignaturaData] = useState([]);
  const [selectedCarrera, setSelectedCarrera] = useState('');
  const [resultadoData, setResultado] = useState('');

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
      // console.log("Carreras: ", carreraData);
    }
  }, [carreraData]);

  const handleChangeCarrera = (event, newValue) => {
    // console.log("Selected: ", newValue);
    setSelectedCarrera(newValue);
    if (newValue !== null) {
      getInfoCarrera(newValue);
    }
  };

  async function getInfoCarrera(selectedCarrera) {
    let result = await getAsignaturasDeCarrera(selectedCarrera, user.jwtLogin);
    setAsignaturaData(result);
  }

  const handleModificar = async (idCursada) => {
    // console.log("Id: ", idCursada, resultadoData,);
    // const result = await cambiarResultadoCursada(idCursada, resultadoData, user.jwtLogin);
    // console.log("CursadasPendientes: ", result);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let idAsignatura = data.get('idasignatura');
    let anioLectivo = parseInt(data.get('aniolectivo'), 10);

    const resp = await cursadasPendientes(idAsignatura, anioLectivo, user.jwtLogin);
    setCursadasData(resp);
  };

  const handleFilter = (nombre) => setFilter(nombre);
  const filteredUsers = filter ? carreraData.filter((user) => user.nombre === filter) : carreraData;

  const handleAutocompleteChange = (event, newValue) => {
    setValue(newValue);
    setFilter(newValue ? newValue.nombre : '');
  };

  return (
    <Box component="form" sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }} onSubmit={handleSubmit}>
      <Card sx={{ display: 'flex', alignSelf: 'center', }}>
        <Box sx={{ margin: 0.6, alignSelf: 'center' }}>
          <Typography sx={{ textAlign: 'center' }} variant="plain" color="primary" noWrap>Listado Carreras</Typography>
        </Box>
        <Divider />
        <Stack direction="column" sx={{ display: { xs: 'flex', md: 'flex' }, alignSelf: 'center' }}>
          <FormControl sx={{ display: { sm: 'flex', md: 'flex', width: '540px' }, gap: 0.3 }}>
            {/* <Select size="sm" defaultValue="Seleccionar carrera" placeholder="Seleccionar carrera" id="idcarrera" name="idcarrera" onChange={handleChangeCarrera} >
              {carreraData.map((carrera, index) => (
                <Option key={index} value={carrera.idCarrera}>{carrera.nombre}</Option>
              ))}
            </Select> */}

            <Autocomplete
              sx={{ width: '100%' }}
              placeholder="Filtrar por nombre"
              options={carreraData}
              getOptionLabel={(option) => option.nombre}
              onChange={handleAutocompleteChange}
              value={value}
            // filterOptions={(options, params) => {
            //   const filtered = filters(options, params);
            //   const { inputValue } = params;
            //   const isExisting = options.some((option) => inputValue === option.nombre);
            //   if (inputValue !== '' && !isExisting) {
            //     filtered.push({ nombre: inputValue });
            //   }
            //   return filtered;
            // }}
            // renderOption={(props, option) => (
            //   <AutocompleteOption {...props} key={option.nombre}>
            //     {/* {option.nombre} */}
            //   </AutocompleteOption>
            // )}
            />

            {/* onChange={handleChangeAsignatura} */}
            {/* <Select size="sm" placeholder="Seleccionar asignatura" id="idasignatura" name="idasignatura" required>
              {Array.isArray(asignaturaData) && asignaturaData.map((asignatura, index) => (
                <Option key={index} value={asignatura.idAsignatura}>{asignatura.nombre}</Option>
              ))}
            </Select> */}
            <Divider sx={{ marginBottom: 1.5, marginTop: 1 }} />
            <section className="text-black body-font">
              <div>
                <Sheet variant="outlined"
                  sx={{
                    '--TableCell-height': '30px', '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
                    '--Table-firstColumnWidth': '190px', '--Table-lastColumnWidth': '90px', '--Table-lastColumnWidth2': '60px', '--Table-buttonColumnWidth': '65px', '--TableRow-hoverBackground': 'rgb(3, 202, 192, 0.30)',
                    borderCollapse: 'separate', borderTopLeftRadius: '12px', borderTopRightRadius: '12px', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', overflow: 'auto',
                  }}>

                  <Table hoverRow>
                    <thead>
                      <tr>
                        <th style={{ width: 'var(--Table-firstColumnWidth)' }}>Nombre</th>
                        {/* <th style={{ width: 'var(--Table-lastColumnWidth)' }}>Cédula</th> */}
                        <th style={{ width: 'var(--Table-buttonColumnWidth)' }}></th>
                        <th style={{ width: 'var(--Table-buttonColumnWidth)' }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {carreraData.map((row) => (
                        (
                          <tr key={row.idCarrera}>
                            <td>{row.nombre}</td>
                            {/* <td>{row.cedula}</td> */}
                            {/* <td>
															<Select size="sm" placeholder="Pendiente" id="idresultado" name="idresultado" onChange={handleChangeResultado}>
																{diasSemana.map((resultado, index) => (
																	<Input key={index} value={resultado.value}>{resultado.label}</Input>
																))}
															</Select>
														</td> */}
                            {/* <td>
                              <Select size="sm" placeholder="0" onChange={(event, newValue) => setResultado(newValue)}
                                id="idresultado" name="idresultado">{notas.map((nota) => (
                                  <Option key={notas} value={nota}>{nota}</Option>
                                ))}
                              </Select>
                            </td> */}
                            <td>
                              <Button size="sm" sx={{ border: 0.1, borderColor: '#3d3d3d', alignItems: 'right' }} variant="outlined" color='primary'
                                onClick={() => handleModificar(row.idCursada)} >
                                Asignaturas
                              </Button>
                            </td>
                            <td>
                              <Button size="sm" sx={{ border: 0.1, borderColor: '#3d3d3d', alignItems: 'right' }} variant="outlined" color='primary'
                                onClick={() => handleModificar(row.idCursada)} >
                                Info
                              </Button>
                            </td>
                          </tr>
                        )
                      ))}
                    </tbody>
                  </Table>
                </Sheet>
              </div>
            </section>
          </FormControl>
        </Stack>
      </Card>
    </Box>
  );
};

const timeSlots = Array.from(new Array(24 * 1)).map(
  (_, index) =>
    `${index < 20 ? '' : ''}${Math.floor(index / 1)
    }:00`,
);

