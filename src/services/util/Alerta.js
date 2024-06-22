// import * as React from 'react';
// import Button from '@mui/joy/Button';
// import Snackbar from '@mui/joy/Snackbar';
// import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';

// export default function SnackbarWithDecorators() {
//     const [open, setOpen] = React.useState(false);

//     return (
//         <React.Fragment>
//             <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
//                 Show Snackbar
//             </Button>
//             <Snackbar
//                 variant="soft"
//                 color="success"
//                 open={open}
//                 onClose={() => setOpen(false)}
//                 anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//                 startDecorator={<PlaylistAddCheckCircleRoundedIcon />}
//                 endDecorator={
//                     <Button
//                         onClick={() => setOpen(false)}
//                         size="sm"
//                         variant="soft"
//                         color="success"
//                     >
//                         Dismiss
//                     </Button>
//                 }
//             >
//                 Your message was sent successfully.
//             </Snackbar>
//         </React.Fragment>
//     );
// }


import React, { useState, useEffect, useContext } from 'react';

import Alert from '@mui/joy/Alert';
import AspectRatio from '@mui/joy/AspectRatio';
import IconButton from '@mui/joy/IconButton';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import CircularProgress from '@mui/joy/CircularProgress';
import LinearProgress from '@mui/joy/LinearProgress';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import Warning from '@mui/icons-material/Warning';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { useNavigate } from 'react-router-dom';


export function Alerta() {
    const [open, setOpen] = React.useState(false);

    const history = useNavigate();
    return (
        <React.Fragment>
            <Button variant="outlined" color="neutral" onClick={() => setOpen(true)}>
                Open modal
            </Button>
            <Modal open={open} onClose={() => setOpen(false)}>

                <ModalDialog>
                    <Alert
                        size="sm"
                        color="success"
                        variant="none"
                        invertedColors
                        // startDecorator={
                        //     // <AspectRatio
                        //     //     variant="solid"
                        //     //     color="success"
                        //     //     opacity="0.1"
                        //     //     ratio="1"
                        //     //     sx={{
                        //     //         minWidth: 40,
                        //     //         borderRadius: '50%',
                        //     //         boxShadow: '0 2px 12px 0 rgb(0 0 0/0.2)',
                        //     //     }}
                        //     // >
                        //     //     {/* <CircularProgress size="lg" color="danger">
                        //     //         <Check fontSize="xl2" />
                        //     //     </CircularProgress> */}
                        //     // </AspectRatio>
                        // }
                        endDecorator={
                            <IconButton
                                variant="plain"
                                sx={{
                                    '--IconButton-size': '32px',
                                    transform: 'translate(1rem, -1rem)',
                                }}
                            >
                                <Close />
                            </IconButton>
                        } sx={{ alignItems: 'flex-start', overflow: 'hidden' }}                    >
                        <div>
                            <Typography level="title-lg">Success</Typography>
                            <Typography level="body-sm">
                                Success is walking from failure to failure with no loss of enthusiam.
                            </Typography>
                        </div>
                    </Alert>
                    <LinearProgress
                        variant="solid"
                        color="success"
                        value={40}
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            borderRadius: 0,
                        }} />

                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}

//    <Alert
//             variant="soft"
//             color="danger"
//             invertedColors
//             startDecorator={
//                 <CircularProgress size="lg" color="danger">
//                     <Warning />
//                 </CircularProgress>
//             }
//             sx={{ alignItems: 'flex-start', gap: '1rem' }}
//         >
//             <Box sx={{ flex: 1 }}>
//                 <Typography level="title-md">Lost connection</Typography>
//                 <Typography level="body-md">
//                     Please verify your network connection and try again.
//                 </Typography>
//                 <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
//                     <Button variant="outlined" size="sm">
//                         Open network settings
//                     </Button>
//                     <Button variant="solid" size="sm">
//                         Try again
//                     </Button>
//                 </Box>
//             </Box>
//         </Alert> 