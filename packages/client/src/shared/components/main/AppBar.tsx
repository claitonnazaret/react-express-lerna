import React from 'react';
import {
  Avatar,
  Box,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useAppTheme, useAuth, useDrawer } from '../../contexts/hooks';
import { AppBarComponent } from './util';
import { Link } from 'react-router-dom';

interface IAppbar {}

export const AppBar: React.FC<IAppbar> = () => {
  const { appInfo, isOpen, toogleOpen } = useDrawer();
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
              <Avatar alt="Remy Sharp" src={appInfo.iconProfile} sx={{ width: 24, height: 24 }} />
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
            <MenuList dense>
              <MenuItem component={Link} onClick={() => setProfile(null)} to="/profile">
                <Icon>person</Icon>
                <Typography textAlign="center"> Profile </Typography>
              </MenuItem>
              <MenuItem onClick={logout}>
                <Icon>logout</Icon>
                <Typography textAlign="center"> Logout </Typography>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Toolbar>
    </AppBarComponent>
  );
};
