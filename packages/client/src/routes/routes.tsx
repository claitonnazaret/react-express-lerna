import { ReactNode } from 'react';
import { createBrowserRouter, redirect } from 'react-router-dom';
import { DashboardPage, LoginPage, RegisterPage } from '../pages';
import { IDrawerOptionListItem } from '../shared/contexts';
import { PageLayout } from '../shared/layouts/PageLayout';

interface IRoute {
    index?: boolean;
    path: string;
    element: ReactNode;
}
export const routes: IRoute[] = [
    { index: true, path: 'dashboard', element: <h1>Dashboard</h1> },
    { path: 'cadastro/usuario', element: <h1>Submenu 1</h1> },
    { path: 'submenu2/submenu2-menu1', element: <h1>SubMenu 2 - Menu 1</h1> },
    { path: 'submenu2/submenu2-menu2', element: <h1>SubMenu 2 - Menu 2</h1> },
    { path: 'submenu2/submenu2-menu2/:id', element: <h1>SubMenu 2 - Menu 2 ID</h1> },
];

export const menus: IDrawerOptionListItem[] = [
    {
        icon: 'dashboard',
        label: 'Dashboard',
        path: '/dashboard',
    },
    {
        icon: 'drafts',
        label: 'Cadastro',
        children: [
            {
                icon: 'star',
                label: 'Usuario',
                path: '/cadastro/usuario',
            },
            {
                icon: 'star',
                label: 'SubMenu 2',
                children: [
                    {
                        icon: 'star',
                        label: 'Cidades 1',
                        path: '/submenu2/submenu2-menu1',
                    },
                    {
                        icon: 'star',
                        label: 'Cidades 2',
                        path: '/submenu2/submenu2-menu2',
                    },
                ],
            },
        ],
    },
];
