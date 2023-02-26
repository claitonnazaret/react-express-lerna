import { useContext } from 'react';
import { AppFormContext } from '..';

export const useAppForm = () => {
    const context = useContext(AppFormContext);

    return context;
};
