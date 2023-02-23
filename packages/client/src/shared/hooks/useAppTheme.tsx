import { useContext } from 'react';
import { AppThemeContext } from '../contexts';

export const useAppTheme = () => {
    const context = useContext(AppThemeContext);

    return context;
};
