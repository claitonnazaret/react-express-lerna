import {
    Box,
    CssBaseline,
    Divider,
    Icon,
    IconButton,
    List,
    Toolbar,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import { ReactNode, useEffect } from 'react';
import { AppBar } from './AppBar';
import { DrawerComponent } from './util';
import { AppBarProvider, IDrawerOptionListItem } from '../../contexts';
import uuid from 'react-uuid';
import { useDrawer } from '../../contexts/hooks';
import { ListItemLink } from './ListItemLink';
import { PageLayout } from '../../layouts/PageLayout';

interface ILeftMenu {
    children: ReactNode;
}

export const SideBar: React.FC<ILeftMenu> = ({ children }) => {
    const theme = useTheme();
    const { isOpen, setOpen, toogleOpen, drawerOptions } = useDrawer();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        setOpen(!sm);
    }, [sm]);

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
                <Box
                    sx={{
                        flexGrow: 1,
                        height: `calc(100vh - ${theme.spacing(8)})`,
                        overflowX: 'hidden',
                        overflowY: 'auto',
                    }}
                >
                    <List component="nav">
                        {drawerOptions.map((option: IDrawerOptionListItem) => (
                            <ListItemLink key={uuid()} {...option} />
                        ))}
                    </List>
                </Box>
            </DrawerComponent>
            <Box component="main" flex={1}>
                <Toolbar />
                <AppBarProvider>
                    <PageLayout>{children}</PageLayout>
                </AppBarProvider>
            </Box>
        </Box>
    );
};
