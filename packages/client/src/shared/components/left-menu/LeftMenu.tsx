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
    useMediaQuery,
    useTheme,
} from '@mui/material';
import Logo from '../../../assets/react.svg';
import { ReactNode } from 'react';
import { useDrawer } from '../../hooks/useDrawer';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

interface ILeftMenu {
    children: ReactNode;
}

interface IListItemLink {
    to: string;
    icon: string;
    label: string;
    onClick: (() => void) | undefined;
}

const ListItemLink: React.FC<IListItemLink> = ({ to, icon, label, onClick }) => {
    const navigate = useNavigate();
    const resolverPath = useResolvedPath(to);
    const match = useMatch({ path: resolverPath.pathname, end: false });

    const handleClick = () => {
        navigate(to);
        onClick?.();
    };

    return (
        <ListItemButton selected={!!match} onClick={handleClick}>
            <ListItemIcon>
                <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={label} />
        </ListItemButton>
    );
};

const LeftMenu: React.FC<ILeftMenu> = ({ children }) => {
    const theme = useTheme();
    const { isOpen, toogleOpen, drawerOptions } = useDrawer();
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
                        {drawerOptions.map((option) => (
                            <ListItemLink
                                key={option.path}
                                icon={option.icon}
                                to={option.path}
                                label={option.label}
                                onClick={toogleOpen}
                            />
                        ))}
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
