import React from 'react';
import Panel from "../components/Panel";
import { CssVarsProvider } from '@mui/joy/styles';

const Contact = () => {
  return (
    <>
      <CssVarsProvider data-bs-theme="dark">
        <Panel />
      </CssVarsProvider>
    </>
  );
};

export default Contact;