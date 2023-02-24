import { useContext } from 'react';
import { LoadingContext } from '..';

export const useLoading = () => {
    const context = useContext(LoadingContext);

    return context;
};
