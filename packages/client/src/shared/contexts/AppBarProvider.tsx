import {
    BottomNavigation,
    BottomNavigationAction,
    Icon,
    Link,
    Paper,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { createContext, FC, ReactNode, useState } from 'react';
import { Box } from '@mui/system';
import _ from 'lodash';

interface IAppBarContext {
    setTitulo: (titulo: string) => void;
}

export const AppBarContext = createContext<IAppBarContext>({} as IAppBarContext);

export const AppBarProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const location = useLocation();
    const theme = useTheme();
    const pathnames = location.pathname.split('/').filter((x) => x);
    const [titulo, setTitulo] = useState('Titulo da Pagina');
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <AppBarContext.Provider value={{ setTitulo }}>
            <Toolbar>
                <Box>
                    <Typography variant="h5">{titulo}</Typography>
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
                square
                sx={{
                    flexGrow: 1,
                    height: `calc(100vh - ${theme.spacing(sm ? 20.1 : 23.1)})`,
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    paddingLeft: 2,
                    paddingRight: 2,
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
