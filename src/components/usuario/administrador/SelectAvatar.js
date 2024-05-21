import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';



export default function SelectAvatar() {
    return (
        <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>

            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: 4,
                }}
            >
                {[].map((inset) => (
                    <div key={inset || 'default'}>
                        <Typography level="body-xs" mb={2}>
                            <code>{inset ? `inset="${inset}"` : '(default)'}</code>
                        </Typography>
                        <List
                            variant="outlined"
                            sx={{
                                minWidth: 240,
                                borderRadius: 'sm',
                            }}
                        >
                            <ListItem>
                                <ListItemDecorator>
                                    <Avatar size="sm" src="/static/images/avatar/1.jpg" />
                                </ListItemDecorator>
                                Mabel Boyle
                            </ListItem>
                            <ListDivider inset={inset} />
                            <ListItem>
                                <ListItemDecorator>
                                    <Avatar size="sm" src="/static/images/avatar/2.jpg" />
                                </ListItemDecorator>
                                Boyd Burt
                            </ListItem>
                        </List>
                    </div>
                ))}
            </Box>
        

            </div>

    );
}

