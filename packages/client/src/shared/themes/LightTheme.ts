import { createTheme } from '@mui/material';
import { cyan, grey, red } from '@mui/material/colors';

export const LightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: red[700],
            dark: red[800],
            light: red[500],
            contrastText: '#fff',
        },
        secondary: {
            main: cyan[500],
            dark: cyan[400],
            light: cyan[300],
            contrastText: '#fff',
        },
        background: {
            default: '#f7f6f3',
            paper: '#fff',
        },
    },
});
