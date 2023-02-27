import { FC } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import {
    LoginPage,
    RegisterPage,
    DashboardPage,
    NotFoundPage,
    ProfilePage,
    CadastroUsuarioList,
    CadastroUsuarioForm,
} from '../pages';
import { DrawerProvider, IDrawerOptionListItem } from '../shared/contexts';
import { useAuth } from '../shared/contexts/hooks';
import { MainLayout } from '../shared/layouts';

// Private Route
interface IPrivateRoute {
    children: JSX.Element;
}

const PrivateRoute: FC<IPrivateRoute> = ({ children }) => {
    const { accessToken } = useAuth();

    if (!accessToken) {
        return <LoginPage />;
    }

    return children;
};

export const routes = createBrowserRouter([
    {
        path: '/login',
        element: <LoginPage />,
        errorElement: <Navigate to="/login" replace={true} />,
    },
    { path: '/register', element: <RegisterPage /> },
    {
        path: '/',
        element: (
            <PrivateRoute>
                <DrawerProvider>
                    <MainLayout />
                </DrawerProvider>
            </PrivateRoute>
        ),
        errorElement: <NotFoundPage />,
        children: [
            { path: 'dashboard', element: <DashboardPage /> },
            { path: 'profile', element: <ProfilePage /> },
            {
                path: 'cadastro',
                children: [
                    { path: 'usuario', element: <CadastroUsuarioList /> },
                    { path: 'usuario/:id', element: <CadastroUsuarioForm /> },
                ],
            },
        ],
    },
]);

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
        ],
    },
];
