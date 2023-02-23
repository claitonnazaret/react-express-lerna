import { DashboardPage, LoginPage } from '../pages';
import { IDrawerOption } from '../shared/contexts';
import { ProtectedLayout } from '../shared/layouts';

export const mainRoutes: IDrawerOption[] = [
    { icon: 'dashboard', label: 'Dashboard', path: '/dashboard', element: <DashboardPage /> },
    { icon: 'star', label: 'Cidades', path: '/cidade', element: <LoginPage /> },
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
