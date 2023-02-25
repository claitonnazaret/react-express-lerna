import {
    BottomNavigation,
    BottomNavigationAction,
    Icon,
    Link,
    Paper,
    Toolbar,
    Typography,
    useTheme,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { createContext, FC, ReactNode } from 'react';
import { Box } from '@mui/system';
import _ from 'lodash';

export const AppBarContext = createContext({});

export const AppBarProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const location = useLocation();
    const theme = useTheme();
    const pathnames = location.pathname.split('/').filter((x) => x);

    return (
        <AppBarContext.Provider value={{}}>
            <Toolbar>
                <Box>
                    <Typography variant="h5">Titulo da Page</Typography>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link component={RouterLink} underline="hover" color="inherit" to="/">
                            Dashboard
                        </Link>
                        {pathnames.map((value, index) => {
                            const last = index === pathnames.length - 1;
                            const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                            return last ? (
                                <Typography color="text.primary" key={to}>
                                    {_.capitalize(value)}
                                </Typography>
                            ) : (
                                <Link
                                    component={RouterLink}
                                    underline="hover"
                                    color="inherit"
                                    to={to}
                                    key={to}
                                >
                                    {_.capitalize(value)}
                                </Link>
                            );
                        })}
                    </Breadcrumbs>
                </Box>
            </Toolbar>
            <Paper
                variant="outlined"
                square
                sx={{
                    flexGrow: 1,
                    height: `calc(100vh - ${theme.spacing(23.3)})`,
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    padding: '0 20px',
                }}
            >
                {children}
            </Paper>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation showLabels>
                    <BottomNavigationAction label="Recents" icon={<Icon>restore</Icon>} />
                    <BottomNavigationAction label="Favorites" icon={<Icon>favorite</Icon>} />
                    <BottomNavigationAction label="Archive" icon={<Icon>archive</Icon>} />
                </BottomNavigation>
            </Paper>
        </AppBarContext.Provider>
    );
};
