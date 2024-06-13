import * as React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';

function Root(props) {
    return (
        <Box
            {...props}
            sx={[{
                bgcolor: 'background.surface',
                display: 'grid',
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'minmax(64px, 200px) minmax(450px, 1fr)',
                    md: 'minmax(160px, 300px) minmax(300px, 500px) minmax(500px, 1fr)',
                },
                gridTemplateRows: '64px 1fr',
                minHeight: '10vh',
            },
            ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
            ]}
        />
    );
}

function Header(props) {
    return (
        <Box
            component="header"
            className="Header"
            {...props}
            sx={[
                {
                    p: 0.5,
                    gap: 2,
                    bgcolor: 'background.surface',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gridColumn: '1 / -1',
                    borderBottom: '1.5px solid',
                    borderColor: 'divider',
                    position: 'sticky',
                    top: 0,
                    zIndex: 1100,
                },
                ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
            ]}
        />
    );

}

function SideNav(props) {
    return (
        <Box
            component="nav"
            className="Navigation"
            {...props}
            sx={[
                {
                    p: 2,
                    bgcolor: 'background.surface',
                    borderRight: '1px solid',
                    borderColor: 'divider',
                    display: {
                        xs: 'none',
                        sm: 'initial',
                    },
                },
                ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
            ]}
        />
    );
}

function SidePane(props) {
    return (
        <Box
            className="Inbox"
            {...props}
            sx={[
                {
                    bgcolor: 'background.surface',
                    borderRight: '1px solid',
                    borderColor: 'divider',
                    display: {
                        xs: 'flex',
                        md: 'initial',
                    },
                },
                ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
            ]}
        />
    );
}



function Main(props) {
    return (
        <Box
            component="main"
            className="Main"

            {...props}
            sx={[
                {
                    position: 'fixed',
                    // zIndex: 1200,
                    width: '100%',
                    height: '100%',
                    // bgcolor: '#0d1117',
                    // color:'text-primary',
                    bgcolor: 'background.surface',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gridColumn: '1 / -1',
                    // borderBottom: '1px solid',
                    // position: 'sticky',
                    // display: {
                    //     xs: 'foxed',
                    //     sm: 'flex',
                    //     md: 'flex',
                    //     xl: 'fixed',
                    // },
                    // margin: 0,
                    display: 'relative',
                    // top: 0,
                    // bottom: 0,
                    //   minHeight: '768px',
                    // zIndex: 1100,
                }, ...(Array.isArray(props.sx) ? props.sx : [props.sx])]}
        />
    );
}

function SideDrawer(
    props,
) {
    const { onClose, ...other } = props;
    return (
        <Box
            {...other}
            sx={[
                {
                    position: 'fixed', zIndex: 1200, width: '100%', height: '100%',
                    bgcolor: 'background.surface',

                }, ...(Array.isArray(other.sx) ? other.sx : [other.sx]),
            ]}
        >
            <Box
                role="button"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    inset: 0,
                    bgcolor: (theme) =>
                        `rgba(${theme.vars.palette.neutral.darkChannel} / 0.8)`,
                    // bgcolor: '#0d1117',

                }}
            />
            <Sheet
                sx={{
                    minWidth: 256,
                    width: 'max-content',
                    height: '100%',
                    p: 2,
                    boxShadow: 'lg',
                    bgcolor: 'background.surface',

                }}
            >
                {other.children}
            </Sheet>
        </Box>
    );
}

export default { Root, Header, SideNav, SidePane, SideDrawer, Main };