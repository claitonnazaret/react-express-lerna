import { ListItemButtonBaseProps } from '@mui/material';
import { createContext, ReactNode, useCallback, useState } from 'react';

export interface IDrawerOptionListItem extends Omit<ListItemButtonBaseProps, 'children'> {
    path?: string;
    label: string;
    icon: string;
    onClick?: (() => void) | undefined;
    children?: IDrawerOptionListItem[] | undefined;
}

interface IAppInfo {
    titulo: string;
    iconProfile: string;
}

interface IDrawerContext {
    appInfo: IAppInfo;
    setAppInfo: (info: IAppInfo) => void;
    isOpen: boolean;
    setOpen: (isOpen: boolean) => void;
    toogleOpen: () => void;
    drawerOptions: IDrawerOptionListItem[];
    setDrawerOptions: (newDrawerOptions: IDrawerOptionListItem[]) => void;
}

interface IDrawerProvider {
    children: ReactNode;
}

export const DrawerContext = createContext({} as IDrawerContext);

export const DrawerProvider: React.FC<IDrawerProvider> = ({ children }: IDrawerProvider) => {
    const [appInfo, setAppInfo] = useState({} as IAppInfo);
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
                appInfo,
                setAppInfo,
                isOpen,
                setOpen,
                toogleOpen,
                drawerOptions,
                setDrawerOptions: handleSetDrawerOptions,
            }}
        >
            {children}
        </DrawerContext.Provider>
    );
};
