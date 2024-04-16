// import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import '../css/style-navbar.css';

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
                <Typography variant="body2" color="text.secondary" mt={0.2}>
                    <a className="link-footer" href="./">Sobre nosotros</a>
                </Typography>
            </Box>
        </>
    );
}

function Footer() {
    return (
        <div className='footer py-3'>
            <Container>
                <Copyright />

            </Container>
        </div>
    );
}
export default Footer;
