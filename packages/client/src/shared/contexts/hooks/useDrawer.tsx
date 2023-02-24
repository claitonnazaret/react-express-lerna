import { useContext } from 'react';
import { DrawerContext } from '..';

export const useDrawer = () => {
    const context = useContext(DrawerContext);

    return context;
};
