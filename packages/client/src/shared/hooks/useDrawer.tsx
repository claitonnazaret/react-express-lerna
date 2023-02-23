import { useContext } from 'react';
import { DrawerContext } from '../contexts';

export const useDrawer = () => {
    const context = useContext(DrawerContext);

    return context;
};
