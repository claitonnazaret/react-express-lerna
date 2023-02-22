import React, { useState } from 'react';
import { Button, CssBaseline, ThemeProvider, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../shared/hooks/useAuth';
import { ColorModeContext, useMode } from '../../theme';

const Dashboard = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [theme, colorMode] = useMode();

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <h1>Dashboard Page</h1>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default Dashboard;
