import { useContext } from 'react';
import { AppBarContext } from '..';

export const useAppBar = () => {
    const context = useContext(AppBarContext);

    return context;
};
