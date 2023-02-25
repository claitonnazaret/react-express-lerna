import { Backdrop, CircularProgress } from '@mui/material';
import { createContext, FC, ReactNode, useState } from 'react';

interface ILoadingContext {
    loading: (open: boolean) => void;
}

export const LoadingContext = createContext<ILoadingContext>({} as ILoadingContext);

export const LoadingProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [open, loading] = useState(false);

    return (
        <LoadingContext.Provider value={{ loading }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            {children}
        </LoadingContext.Provider>
    );
};
