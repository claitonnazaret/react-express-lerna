import { Backdrop, CircularProgress } from '@mui/material';
import { createContext, FC, ReactNode, useState } from 'react';

interface ILoadingContext {
    setOpen: (open: boolean) => void;
}

export const LoadingContext = createContext<ILoadingContext>({} as ILoadingContext);

export const LoadingProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [open, setOpen] = useState(false);

    return (
        <LoadingContext.Provider value={{ setOpen }}>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress color="inherit" />
                {children}
            </Backdrop>
        </LoadingContext.Provider>
    );
};
