import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../shared/hooks/useAuth';
import { useAppTheme } from '../../shared/hooks/useAppTheme';
import { LeftMenu } from '../../shared/components';
import { useDrawer } from '../../shared/hooks/useDrawer';

const DashboardPage = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const theme = useAppTheme();
    const { toogleOpen } = useDrawer();

    return (
        <>
            <LeftMenu>
                <Button variant="contained" color="primary" onClick={toogleOpen}>
                    Drawer
                </Button>
                <Button variant="contained" color="primary" onClick={theme.toogle}>
                    Theme
                </Button>
            </LeftMenu>
        </>
    );
};

export default DashboardPage;
