import {
    AppBar,
    Avatar,
    Badge,
    Box,
    CssBaseline,
    Divider,
    Drawer,
    Icon,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import Logo from '../../../assets/react.svg';
import { ReactNode } from 'react';
import { useDrawer } from '../../hooks/useDrawer';

interface ILeftMenu {
    children: ReactNode;
}
const LeftMenu: React.FC<ILeftMenu> = ({ children }) => {
    const theme = useTheme();
    const { isOpen, toogleOpen } = useDrawer();
    const mq = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer open={isOpen} variant="persistent" onClose={toogleOpen}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                        width: theme.spacing(!isOpen ? 0 : 28),
                    }}
                >
                    <IconButton onClick={toogleOpen}>
                        <Icon>chevron_left</Icon>
                    </IconButton>
                </Toolbar>
                <Divider />
                <Box flex={1}>
                    <List component="nav">
                        <ListItemButton>
                            <ListItemIcon>
                                <Icon>dashboard</Icon>
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                    </List>
                </Box>
            </Drawer>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                    marginLeft: theme.spacing(!isOpen ? 0 : 28),
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default LeftMenu;
