import { createContext, ReactNode, useCallback, useState } from 'react';

interface IDrawerContext {
    isOpen: boolean;
    toogleOpen: () => void;
    drawerOptions: IDrawerOption[];
    setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
}

interface IDrawerProvider {
    children: ReactNode;
}

export interface IDrawerOption {
    icon: string;
    path: string;
    label: string;
    element: ReactNode | undefined;
}

export const DrawerContext = createContext({} as IDrawerContext);

export const DrawerProvider: React.FC<IDrawerProvider> = ({ children }: IDrawerProvider) => {
    const [isOpen, setOpen] = useState(true);
    const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);

    const toogleOpen = useCallback(() => {
        setOpen((isOpen) => !isOpen);
    }, []);

    const handleSetDrawerOptions = useCallback((newOption: IDrawerOption[]) => {
        setDrawerOptions(newOption);
    }, []);

    return (
        <DrawerContext.Provider
            value={{ isOpen, toogleOpen, drawerOptions, setDrawerOptions: handleSetDrawerOptions }}
        >
            {children}
        </DrawerContext.Provider>
    );
};
