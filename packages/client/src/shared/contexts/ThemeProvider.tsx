import { Box, ThemeProvider } from '@mui/material';
import { createContext, ReactNode, useCallback, useMemo, useState } from 'react';
import { DarkTheme, LightTheme } from '../themes';

interface IThemeContext {
    themeName: 'light' | 'dark';
    toogleTheme: () => void;
}

interface IThemeProvider {
    children: ReactNode;
}

export const AppThemeContext = createContext({} as IThemeContext);

export const AppThemeProvider: React.FC<IThemeProvider> = ({ children }: IThemeProvider) => {
    const [themeName, setTheme] = useState<'light' | 'dark'>('light');

    const toogleTheme = useCallback(() => {
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
    }, []);

    const theme = useMemo(() => {
        return themeName === 'light' ? LightTheme : DarkTheme;
    }, [themeName]);

    return (
        <AppThemeContext.Provider value={{ themeName, toogleTheme }}>
            <ThemeProvider theme={theme}>
                <Box width="100vw" height="100vh" bgcolor={theme.palette.background.default}>
                    {children}
                </Box>
            </ThemeProvider>
        </AppThemeContext.Provider>
    );
};
