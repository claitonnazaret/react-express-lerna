import { DashboardPage, LoginPage } from '../pages';
import { IDrawerOptionListItem } from '../shared/contexts';

export const mainRoutes: IDrawerOptionListItem[] = [
    {
        icon: 'dashboard',
        label: 'Dashboard',
        path: 'dashboard',
        element: <h1>Dashboard</h1>,
    },
    { icon: 'star', label: 'Cidades', path: 'cidade', element: <h1>Cidades</h1> },
    {
        icon: 'drafts',
        label: 'Menu',
        path: null,
        element: undefined,
        children: [
            { icon: 'star', label: 'SubMenu 1', path: 'submenu1', element: <h1>Submenu 1</h1> },
            {
                icon: 'star',
                label: 'SubMenu 2',
                path: null,
                element: undefined,
                children: [
                    {
                        icon: 'star',
                        label: 'Cidades 1',
                        path: 'submenu2-menu1',
                        element: <h1>SubMenu 2 - Menu 1</h1>,
                    },
                    {
                        icon: 'star',
                        label: 'Cidades 2',
                        path: 'submenu2-menu2',
                        element: <h1>SubMenu 2 - Menu 2</h1>,
                    },
                ],
            },
        ],
    },
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
