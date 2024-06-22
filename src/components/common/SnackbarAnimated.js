// import * as React from 'react';
// import Button from '@mui/joy/Button';
// import Snackbar from '@mui/joy/Snackbar';
// import { keyframes } from '@mui/system';

// const inAnimation = keyframes`
//   0% {
//     transform: scale(0);
//     opacity: 0;
//   }
//   100% {
//     transform: scale(1);
//     opacity: 1;
//   }
// `;

// const outAnimation = keyframes`
//   0% {
//     transform: scale(1);
//     opacity: 1;
//   }
//   100% {
//     transform: scale(0);
//     opacity: 0;
//   }
// `;

// export function SnackbarAnimated(mensaje) {
//     const [open, setOpen] = React.useState(false);
//     const animationDuration = 600;

//     const handleClick = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     return (
//         <div>
//             <Button variant="outlined" color="neutral" onClick={handleClick}>
//                 Cambios guardados
//             </Button>
//             <Snackbar
//                 anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//                 open={open}
//                 onClose={handleClose}
//                 autoHideDuration={4000}
//                 animationDuration={animationDuration}
//                 sx={{
//                     ...(open && {
//                         animation: `${inAnimation} ${animationDuration}ms forwards`,
//                     }),
//                     ...(!open && {
//                         animation: `${outAnimation} ${animationDuration}ms forwards`,
//                     }),
//                 }}>
//                 mensaje
//             </Snackbar>
//         </div>
//     );
// }

// // ¡Este es un mensaje de texto de muestra!
// export function SnackbarAnimated == (mensaje) => {
//     const [open, setOpen] = React.useState(false);
//     const animationDuration = 600;


//     return (
//         <div>
//             <Button variant="outlined" color="neutral" onClick={handleClick}>
//                 Show Snackbar
//             </Button>
//             <Snackbar
//                 anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
//                 open={open}
//                 onClose={handleClose}
//                 autoHideDuration={4000}
//                 animationDuration={animationDuration}
//                 sx={{
//                     ...(open && {
//                         animation: `${inAnimation} ${animationDuration}ms forwards`,
//                     }),
//                     ...(!open && {
//                         animation: `${outAnimation} ${animationDuration}ms forwards`,
//                     }),
//                 }}>
//                 {mensaje}
//             </Snackbar>
//         </div>
//     );
// };