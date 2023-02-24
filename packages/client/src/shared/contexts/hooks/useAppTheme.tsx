import { useContext } from 'react';
import { AppThemeContext } from '..';

export const useAppTheme = () => {
    const context = useContext(AppThemeContext);

    return context;
};
