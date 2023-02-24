import { Icon, IconButton, Toolbar, Typography, useTheme } from '@mui/material';
import React from 'react';
import { useAppTheme, useDrawer } from '../../contexts/hooks';
import { AppBarComponent } from './util';

interface IAppbar {}

export const AppBar: React.FC<IAppbar> = () => {
    const { isOpen, toogleOpen, drawerOptions } = useDrawer();
    const theme = useTheme();
    const { themeName, toogleTheme } = useAppTheme();

    return (
        <AppBarComponent position="absolute" open={isOpen}>
            <Toolbar
                sx={{
                    pr: '24px',
                    backgroundColor: theme.palette.primary.main,
                }}
            >
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={toogleOpen}
                    sx={{
                        marginRight: '36px',
                        ...(isOpen && { display: 'none' }),
                    }}
                >
                    <Icon>menu</Icon>
                </IconButton>
                <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                    Dashboard
                </Typography>
                <IconButton color="inherit" onClick={toogleTheme}>
                    <Icon>{themeName === 'light' ? 'dark_mode' : 'light_mode'}</Icon>
                </IconButton>
            </Toolbar>
        </AppBarComponent>
    );
};
