import { createContext } from 'react';
import { AppBarContext } from '../AppBarProvider';

export const useAppBar = () => {
    const context = createContext(AppBarContext);

    return context;
};
