import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" mt={0.2}>
            {'Copyright © '}
            <Link color="inherit" href="https://">StudyHub</Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

function Footer() {
    return (
        <div className='footer py-3'>
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: { xs: 3, sm: 3 }, width: '100%', borderTop: '1px solid', borderColor: 'divider', }}>
                    <div>
                        <Copyright />
                    </div>
                </Box>
            </Container>
        </div>
    );
}
export default Footer;
