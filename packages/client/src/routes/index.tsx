import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { IDrawerOptionListItem } from '../shared/contexts';
import { routes, menus } from './routes';
import { useDrawer } from '../shared/contexts/hooks';
import uuid from 'react-uuid';
import _ from 'lodash';

const AppRoutes = () => {
    const { setDrawerOptions } = useDrawer();

    useEffect(() => {
        setDrawerOptions(menus);
    }, []);

    return (
        <Routes>
            <>
                {routes.map((option) => (
                    <Route key={uuid()} path={option.path} element={option.element} />
                ))}
            </>
        </Routes>
    );
};

export default AppRoutes;
