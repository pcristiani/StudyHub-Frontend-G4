import React, { useState, useEffect, useContext } from 'react';

import { useLocation } from 'react-router-dom';
import TableAdministrador from './TableAdministrador';
import TableAsignarCoordinadorCarrera from './TableAsignarCoordinadorCarrera';
import Stack from '@mui/material/Stack';
import { getAsignaturasDeCarrera } from '../../../services/requests/asignaturaService';
import Typography from '@mui/joy/Typography';

import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete, { createFilterOptions } from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Add from '@mui/icons-material/Add';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import { FormatCedula, DeleteFormatCedula } from '../../../services/data/FormatCedula';

import { getUsuarios, bajaUsuario, getUsuario, modificarDatosUsuario } from '../../../services/requests/usuarioService';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

import Tooltip from '@mui/joy/Tooltip';
import { URI_FRONT, redirigir } from '../../../services/util/constants';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
const filter = createFilterOptions();


export default function ListadosBusquedas() {
    const [open, setOpen] = React.useState(true);

    const { user } = useContext(AuthContext);
    const history = useNavigate();
    const [asignaturasCarreraData, setAsignaturasCarreraData] = useState([]);
    const [error, setError] = useState(null);
    const [value, setValue] = React.useState(null);
    const [dataBaja, setDataBaja] = useState([]);

    useEffect(() => {
        const fetchCarreras = async () => {
            try {
                const result = await getUsuarios(user.jwtLogin);
                setAsignaturasCarreraData(result);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchCarreras();
    }, [user]);

    useEffect(() => {
        if (asignaturasCarreraData) {
            console.log("Carreras: ", asignaturasCarreraData);
        }
    }, [asignaturasCarreraData]);

    const handleModificar = (idUsuario) => {
        redirigir(URI_FRONT.modificarFuncionarioUri + `?id=${idUsuario}`);
    }

    const handleDeleteUser = async (idUsuario, activo) => {
        if (!activo) {
        } else {
            try {
                await bajaUsuario(idUsuario, user.jwtLogin);
        //        fetchCoordinador();
            } catch (error) {
                setError(error.message);
            }
        }
    };

    ///
    return (
        <Stack direction="row" sx={{ marginTop: 6, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', }} spacing={2}>
            <>

                <FormControl id="free-solo-with-text-demo">
                    <FormLabel> Buscar usuarios del sistema</FormLabel>
                    <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                            if (typeof newValue === 'string') {
                                setValue({
                                    title: newValue,
                                });
                            } else if (newValue && newValue.inputValue) {
                                //Crear un nuevo valor a partir de la entrada del usuario
                                setValue({
                                    title: newValue.inputValue,
                                });
                            } else {
                                setValue(newValue);
                            }
                        }}
                        filterOptions={(options, params) => {
                            const filtered = filter(options, params);

                            const { inputValue } = params;
                            // Sugerir la creación de un nuevo valor
                            const isExisting = options.some((option) => inputValue === option.idAsignatura);
                            if (inputValue !== '' && !isExisting) {
                                filtered.push({
                                    inputValue,
                                    title: `Add "${inputValue}"`,
                                });
                            }

                            return filtered;
                        }}
                        selectOnFocus
                        clearOnBlur
                        handleHomeEndKeys
                        freeSolo
                        options={asignaturasCarreraData}
                        getOptionLabel={(option) => {
                            // Valor seleccionado con Enter, directamente desde la entrada
                            if (typeof option === 'string') {
                                return option;
                            }
                            // Agregar opción "xxx" creada dinámicamente
                            if (option.inputValue) {
                                return option.inputValue;
                            }
                            // opción regular
                            return option.nombre;
                        }}
                        renderOption={(props, option) => (
                            <AutocompleteOption {...props}>
                                {option.nombre?.startsWith('Add "') && (
                                    <ListItemDecorator>
                                        <Add />
                                    </ListItemDecorator>
                                )}

                                {option.nombre}
                            </AutocompleteOption>
                        )}
                        sx={{ width: 300 }}
                    />
                </FormControl>
                <Box sx={{ minHeight: '20vh', maxWidth: '600px' }}>
                    <Typography level="body-sm" color='neutral' textAlign="center" sx={{ pb: 1 }}>
                        ← Funcionarios y Coordinadores →
                    </Typography>
                    <Sheet
                        variant="outlined"
                        sx={{
                            '--TableCell-height': '30px',
                            '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
                            '--Table-firstColumnWidth': '130px', '--Table-lastColumnWidth': '90px', '--Table-lastColumnWidth2': '80px', '--Table-buttonColumnWidth': '75px',
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
                                    <th style={{ width: 'var(--Table-lastColumnWidth2)' }}>Cédula</th>
                                    <th style={{ width: 'var(--Table-lastColumnWidth)' }}>Rol</th>
                                    <th style={{ width: 'var(--Table-lastColumnWidth2)' }}>Estado</th>
                                    <th aria-label="last" style={{ width: 'var(--Table-buttonColumnWidth)' }} />
                                </tr>
                            </thead>
                            <tbody>
                                {asignaturasCarreraData.map((row) => (
                                    row.rol !== 'E' && row.rol !== 'A' && (
                                        <tr key={row.idUsuario}>
                                            <td>{row.nombre} {row.apellido}</td>
                                            <td>{FormatCedula(row.cedula)}</td>
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
            </>
        </Stack>
    );
}





const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: '12 Angry Men', year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: 'Pulp Fiction', year: 1994 },
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
        title: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },
    { title: 'Life Is Beautiful', year: 1997 },
    { title: 'The Usual Suspects', year: 1995 },
    { title: 'Léon: The Professional', year: 1994 },
    { title: 'Spirited Away', year: 2001 },
    { title: 'Saving Private Ryan', year: 1998 },
    { title: 'Once Upon a Time in the West', year: 1968 },
    { title: 'American History X', year: 1998 },
    { title: 'Interstellar', year: 2014 },
    { title: 'Casablanca', year: 1942 },
    { title: 'City Lights', year: 1931 },
    { title: 'Psycho', year: 1960 },
    { title: 'The Green Mile', year: 1999 },
    { title: 'The Intouchables', year: 2011 },
    { title: 'Modern Times', year: 1936 },
    { title: 'Raiders of the Lost Ark', year: 1981 },
    { title: 'Rear Window', year: 1954 },
    { title: 'The Pianist', year: 2002 },
    { title: 'The Departed', year: 2006 },
    { title: 'Terminator 2: Judgment Day', year: 1991 },
    { title: 'Back to the Future', year: 1985 },
    { title: 'Whiplash', year: 2014 },
    { title: 'Gladiator', year: 2000 },
    { title: 'Memento', year: 2000 },
    { title: 'The Prestige', year: 2006 },
    { title: 'The Lion King', year: 1994 },
    { title: 'Apocalypse Now', year: 1979 },
    { title: 'Alien', year: 1979 },
    { title: 'Sunset Boulevard', year: 1950 },
    {
        title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        year: 1964,
    },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Paths of Glory', year: 1957 },
    { title: 'Django Unchained', year: 2012 },
    { title: 'The Shining', year: 1980 },
    { title: 'WALL·E', year: 2008 },
    { title: 'American Beauty', year: 1999 },
    { title: 'The Dark Knight Rises', year: 2012 },
    { title: 'Princess Mononoke', year: 1997 },
    { title: 'Aliens', year: 1986 },
    { title: 'Oldboy', year: 2003 },
    { title: 'Once Upon a Time in America', year: 1984 },
    { title: 'Witness for the Prosecution', year: 1957 },
    { title: 'Das Boot', year: 1981 },
    { title: 'Citizen Kane', year: 1941 },
    { title: 'North by Northwest', year: 1959 },
    { title: 'Vertigo', year: 1958 },
    {
        title: 'Star Wars: Episode VI - Return of the Jedi',
        year: 1983,
    },
    { title: 'Reservoir Dogs', year: 1992 },
    { title: 'Braveheart', year: 1995 },
    { title: 'M', year: 1931 },
    { title: 'Requiem for a Dream', year: 2000 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Like Stars on Earth', year: 2007 },
    { title: 'Taxi Driver', year: 1976 },
    { title: 'Lawrence of Arabia', year: 1962 },
    { title: 'Double Indemnity', year: 1944 },
    {
        title: 'Eternal Sunshine of the Spotless Mind',
        year: 2004,
    },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },
    { title: "Singin' in the Rain", year: 1952 },
    { title: 'Toy Story', year: 1995 },
    { title: 'Bicycle Thieves', year: 1948 },
    { title: 'The Kid', year: 1921 },
    { title: 'Inglourious Basterds', year: 2009 },
    { title: 'Snatch', year: 2000 },
    { title: '3 Idiots', year: 2009 },
    { title: 'Monty Python and the Holy Grail', year: 1975 },
];
