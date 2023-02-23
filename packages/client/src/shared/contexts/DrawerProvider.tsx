import { createContext, ReactNode, useCallback, useState } from 'react';

interface IDrawerContext {
    isOpen: boolean;
    toogleOpen: () => void;
}

interface IDrawerProvider {
    children: ReactNode;
}

export const DrawerContext = createContext({} as IDrawerContext);

export const DrawerProvider: React.FC<IDrawerProvider> = ({ children }: IDrawerProvider) => {
    const [isOpen, setOpen] = useState(true);

    const toogleOpen = useCallback(() => {
        setOpen((isOpen) => !isOpen);
    }, []);

    return (
        <DrawerContext.Provider value={{ isOpen, toogleOpen }}>{children}</DrawerContext.Provider>
    );
};
