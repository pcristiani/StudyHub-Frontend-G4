import React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function Copyright(props) {
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
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: { xs: 2, sm: 4 }, py: { xs: 4, sm: 5 }, textAlign: { sm: 'center', md: 'left' }, }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: { xs: 2, sm: 4 }, width: '100%', borderTop: '1px solid', borderColor: 'divider', }}>
                <div>
                    <Copyright />
                </div>
            </Box>
        </Container>
    );
}
export default Footer;
