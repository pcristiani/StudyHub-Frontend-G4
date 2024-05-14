// import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import '../../css/style-navbar.css';

import 'bootstrap/dist/css/bootstrap.min.css';


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
