import React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import { extendTheme } from '@mui/joy/styles';

const Page404 = () => {
	return (
		<>
			<Sheet>
				<Box component="form" sx={{ marginTop: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}  >
					<h1 component="h1" >
						404
					</h1>
				</Box>
			</Sheet>
		</>
	);
};

export default Page404;