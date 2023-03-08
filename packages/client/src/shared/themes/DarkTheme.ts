import { createTheme } from '@mui/material';
import { cyan, red } from '@mui/material/colors';

export const DarkTheme = createTheme({
  palette: {
    mode: 'dark',
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
      default: '#202124',
      paper: '#303134',
    },
  },
});
