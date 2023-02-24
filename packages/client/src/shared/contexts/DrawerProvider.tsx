import { ButtonBaseProps, ListItemButtonBaseProps } from '@mui/material';
import { createContext, ReactNode, useCallback, useState } from 'react';

export interface IDrawerOptionListItem extends Omit<ListItemButtonBaseProps, 'children'> {
    path: string | null;
    label: string;
    icon: string;
    element: ReactNode | undefined;
    onClick?: (() => void) | undefined;
    children?: IDrawerOptionListItem[] | undefined;
}

interface IDrawerContext {
    drawWidth: number;
    isOpen: boolean;
    toogleOpen: () => void;
    drawerOptions: IDrawerOptionListItem[];
    setDrawerOptions: (newDrawerOptions: IDrawerOptionListItem[]) => void;
}

interface IDrawerProvider {
    children: ReactNode;
}

export const DrawerContext = createContext({} as IDrawerContext);

export const DrawerProvider: React.FC<IDrawerProvider> = ({ children }: IDrawerProvider) => {
    const drawWidth = import.meta.env.VITE_DRAWER_WIDTH;
    const [isOpen, setOpen] = useState(true);
    const [drawerOptions, setDrawerOptions] = useState<IDrawerOptionListItem[]>([]);

    const toogleOpen = useCallback(() => {
        setOpen((isOpen) => !isOpen);
    }, []);

    const handleSetDrawerOptions = useCallback((newOption: IDrawerOptionListItem[]) => {
        setDrawerOptions(newOption);
    }, []);

    return (
        <DrawerContext.Provider
            value={{
                drawWidth,
                isOpen,
                toogleOpen,
                drawerOptions,
                setDrawerOptions: handleSetDrawerOptions,
            }}
        >
            {children}
        </DrawerContext.Provider>
    );
};
