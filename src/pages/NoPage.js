import { CssVarsProvider } from '@mui/joy/styles';

const NoPage = () => {
    return (
        <>
            <CssVarsProvider data-bs-theme="dark">
                <h1>404</h1>
            </CssVarsProvider>
        </>
    );
};

export default NoPage;