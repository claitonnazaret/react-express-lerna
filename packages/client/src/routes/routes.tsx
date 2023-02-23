import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { DashboardPage, LoginPage } from '../pages';
import { ProtectedLayout } from '../shared/layouts';

interface IRoute {
    path: string;
    element: ReactNode | null;
}

export const mainRoutes: IRoute[] = [
    { path: '/login', element: <DashboardPage /> },
    { path: '*', element: <Navigate to="/login" /> },
];

// export const mainRoutes: IRoute[] = [
//     { path: '/login', element: <LoginPage /> },
//     {
//         path: '/protected',
//         element: (
//             <ProtectedLayout>
//                 <DashboardPage />
//             </ProtectedLayout>
//         ),
//     },
//     { path: '*', element: <Navigate to="/login" /> },
// ];
