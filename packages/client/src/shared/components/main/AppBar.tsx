import {
    Avatar,
    Box,
    Icon,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import { useAppTheme, useAuth, useDrawer } from '../../contexts/hooks';
import { AppBarComponent } from './util';

interface IAppbar {}

export const AppBar: React.FC<IAppbar> = () => {
    const { appInfo, isOpen, toogleOpen, drawerOptions } = useDrawer();
    const [profile, setProfile] = React.useState<null | HTMLElement>(null);
    const { themeName, toogleTheme } = useAppTheme();
    const { logout } = useAuth();
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

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
                    {appInfo.titulo}
                </Typography>
                <IconButton color="inherit" onClick={toogleTheme}>
                    <Icon>{themeName === 'light' ? 'dark_mode' : 'light_mode'}</Icon>
                </IconButton>
                <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <IconButton onClick={(ev) => setProfile(ev.currentTarget)} sx={{ p: 0 }}>
                            <Avatar alt="Remy Sharp" src={appInfo.iconProfile} />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={profile}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(profile)}
                        onClose={() => setProfile(null)}
                    >
                        <MenuItem onClick={() => setProfile(null)}>
                            <Typography textAlign="center"> Profile </Typography>
                        </MenuItem>
                        <MenuItem onClick={logout}>
                            <Typography textAlign="center"> Logout </Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBarComponent>
    );
};
