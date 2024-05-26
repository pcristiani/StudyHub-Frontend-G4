import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useColorScheme } from '@mui/joy/styles';
import IconButton from '@mui/joy/IconButton';
import Tooltip from '@mui/joy/Tooltip';

import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: { xs: 3, sm: 3 }, width: '100%', borderTop: '1px solid', borderColor: 'divider' }}>
                <div>
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
        <div className='footer py-3' style={{ width: '100%', padding: '20px' }}>
            <Box>
                <Copyright />
            </Box>
        </div>
    );
}
export default Footer;
