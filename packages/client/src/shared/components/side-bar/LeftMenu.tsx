import {
    Box,
    Collapse,
    CssBaseline,
    Divider,
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
import { ReactNode, useState } from 'react';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { AppBar } from './AppBar';
import { DrawerComponent } from './util';
import { IDrawerOptionListItem } from '../../contexts';
import uuid from 'react-uuid';
import { useDrawer } from '../../contexts/hooks';

interface ILeftMenu {
    children: ReactNode;
}

const ListItemLink: React.FC<IDrawerOptionListItem> = ({
    path,
    icon,
    label,
    onClick,
    children,
    ...otherProps
}) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const resolverPath = useResolvedPath(path ?? '');
    const match = useMatch({ path: resolverPath.pathname, end: false });

    const handleClick = () => {
        if (!!path) {
            navigate(`/${path}`);
            onClick?.();
        } else {
            setOpen(!open);
        }
    };

    return (
        <>
            {!children?.length ? (
                <ListItemButton {...otherProps} selected={!!match} onClick={handleClick}>
                    <ListItemIcon>
                        <Icon>{icon}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={label} />
                </ListItemButton>
            ) : (
                <>
                    <ListItemButton onClick={handleClick}>
                        <ListItemIcon>
                            <Icon>{icon}</Icon>
                        </ListItemIcon>
                        <ListItemText primary={label} />
                        <Icon>{open ? 'expand_less' : 'expand_more'}</Icon>
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {children.map((option) => (
                                <ListItemLink key={uuid()} {...option} />
                            ))}
                        </List>
                    </Collapse>
                </>
            )}
        </>
    );
};

const LeftMenu: React.FC<ILeftMenu> = ({ children }) => {
    const theme = useTheme();
    const { isOpen, toogleOpen, drawerOptions } = useDrawer();
    const mq = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar />
            <DrawerComponent open={isOpen} variant="permanent">
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toogleOpen}>
                        <Icon>chevron_left</Icon>
                    </IconButton>
                </Toolbar>
                <Divider />
                <Box flex={1}>
                    <List component="nav">
                        {drawerOptions.map((option: IDrawerOptionListItem) => (
                            <ListItemLink key={uuid()} {...option} />
                        ))}
                    </List>
                </Box>
            </DrawerComponent>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default LeftMenu;
