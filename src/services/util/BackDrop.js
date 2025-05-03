import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// export default function BackDrop(estado) {
export function BackDrop() {
    const [open, setOpen] = React.useState(false);

    setOpen(true);
    const handleClose = () => {
    };
    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <div>
            {/* <Button onClick={handleClose}>Show backdrop</Button> */}
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 12 }} open={open} onClick={handleOpen}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}

export default BackDrop;