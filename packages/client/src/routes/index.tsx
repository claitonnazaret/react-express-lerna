import { Routes, Route } from 'react-router-dom';
import { mainRoutes } from './routes';

const AppRoutes = () => {
    return (
        <Routes>
            <>
                {mainRoutes.map((r) => (
                    <Route path={r.path} element={r.element} />
                ))}
            </>
        </Routes>
    );
};

export default AppRoutes;
