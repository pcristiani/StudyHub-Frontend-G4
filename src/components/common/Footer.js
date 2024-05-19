// import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import '../../css/style-navbar.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useContext } from 'react';
import { useColorScheme } from '@mui/joy/styles';
import Nav from 'react-bootstrap/Nav';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import Avatar from '@mui/joy/Avatar';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Tooltip from '@mui/joy/Tooltip';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import ListDivider from '@mui/joy/ListDivider';
import Drawer from '@mui/joy/Drawer';
import ModalClose from '@mui/joy/ModalClose';
import DialogTitle from '@mui/joy/DialogTitle';
import { CssVarsProvider } from '@mui/joy/styles';
import ListItem from '@mui/joy/ListItem';

import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AccountCircleOutlined from '@mui/icons-material/AccountCircleOutlined';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import Person from '@mui/icons-material/Person';
import PropTypes from 'prop-types';

import Navigation from './Navigation';
import { useNavigate } from 'react-router-dom'

import '../../css/style-navbar.css';
import Logo from '../../img/logo.png';
import { AuthContext } from '../../context/AuthContext';
import { types } from '../../context/types';
// import '../css/bootstrap.min.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

import { URI_FRONT, TIPO_ROL } from '../../services/util/constants'
import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({ cssVarPrefix: 'demo' });

function ColorSchemeToggle() {
    const { mode, setMode } = useColorScheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        setMode('dark')
        return <IconButton size="sm" variant="outlined" color="primary" />;
    }
    return (
        <Tooltip title="Cambiar tema" variant="outlined">
            <IconButton id="toggle-mode" size="sm" variant="plain" color="neutral" sx={{ alignSelf: 'center' }}
                onClick={() => {
                    if (mode === 'dark') {
                        setMode('light');
                    } else {
                        setMode('dark');
                    }
                }}>
                {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
            </IconButton>
        </Tooltip>
    );
}
const modifiers = [
    {
        name: 'offset',
        options: {
            offset: ({ placement }) => {
                if (placement.includes('end')) {
                    return [8, 20];
                }
                return [-34, 10];
            },
        },
    },
];

function Copyright() {
    return (
        <>
            <Box className="toggle-mode" sx={{ display: 'flex', justifyContent: 'space-between', pt: { xs: 3, sm: 3 }, width: '100%', borderTop: '1px solid', borderColor: 'divider' }}>
                <div className='toggle-mode'>
                    <Typography variant="body2" color="text.secondary" mt={0.2}>
                        <a className="link-footer" href="./">{'Copyright © '}StudyHub{' '}{new Date().getFullYear()}</a>
                    </Typography>
                </div>
                <Typography variant="body2" color="text.secondary" mt={0.1}>
                    <a className="link-footer" href="./nuestro-equipo">Sobre Nosotros</a>
                </Typography>
            </Box>
        </>
    );
}

function Footer() {
    return (
        <CssVarsProvider className="toggle-mode" defaultMode="dark" theme={theme} colorSchemeSelector="#demo_dark-mode-by-default" modeStorageKey="demo_dark-mode-by-default" disableNestedContext>
            <div className='footer py-3'>
                <Container>
                    <Copyright />
                </Container>
            </div>
        </CssVarsProvider>
    );
}
export default Footer;
