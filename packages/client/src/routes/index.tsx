import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { IDrawerOptionListItem } from '../shared/contexts';
import { mainRoutes } from './routes';
import { useDrawer } from '../shared/hooks';
import uuid from 'react-uuid';
import _ from 'lodash';

const AppRoutes = () => {
    const { setDrawerOptions } = useDrawer();
    const [routes, setRoutes] = useState<IDrawerOptionListItem[]>([]);

    const extract = (arr: IDrawerOptionListItem[]): IDrawerOptionListItem[] => {
        return _.concat(
            arr,
            _.flattenDeep(
                arr.map((item) =>
                    !item.children ? [] : extract(item.children as IDrawerOptionListItem[])
                )
            )
        );
    };

    useEffect(() => {
        setDrawerOptions(mainRoutes);
        setRoutes(extract(mainRoutes));
    }, []);

    return (
        <>
            <Routes>
                {routes.map((option) =>
                    !!option.path ? (
                        <Route key={uuid()} path={option.path} element={option.element} />
                    ) : (
                        <></>
                    )
                )}
            </Routes>
            <pre>{JSON.stringify(routes, null, 2)}</pre>
        </>
    );
};

export default AppRoutes;
