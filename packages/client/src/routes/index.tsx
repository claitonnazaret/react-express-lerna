import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawer } from '../shared/hooks/useDrawer';
import { mainRoutes } from './routes';

const AppRoutes = () => {
    const { drawerOptions, setDrawerOptions } = useDrawer();

    useEffect(() => {
        setDrawerOptions(mainRoutes);
    }, []);

    return (
        <Routes>
            <>
                {drawerOptions.map((r) => (
                    <Route path={r.path} element={r.element} />
                ))}
                <Route path="*" element={<Navigate to="dashboard" />} />
            </>
        </Routes>
    );
};

export default AppRoutes;
