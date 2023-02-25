import { Box, useTheme } from '@mui/material';
import { FC, ReactNode } from 'react';

export const PageLayout: FC<{ children: ReactNode }> = ({ children }) => {
    const theme = useTheme();
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                height: `calc(100vh - ${theme.spacing(16)})`,
                overflowX: 'hidden',
                overflowY: 'auto',
            }}
        >
            {children}
        </Box>
    );
};
