import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from '../../theme';

const Dashboard = () => {
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
