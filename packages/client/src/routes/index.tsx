import { FC } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import {
  CadastroUsuarioForm,
  CadastroUsuarioList,
  DashboardPage,
  LoginPage,
  NotFoundPage,
  ProfilePage,
  RegisterPage,
} from '../pages';
import { DrawerProvider, IDrawerOptionListItem } from '../shared/contexts';
import { useAuth } from '../shared/contexts/hooks';
import { MainLayout } from '../shared/layouts';
import jwtDecode from 'jwt-decode';
import { StorageService } from '../shared/services';

// Private Route
interface IPrivateRoute {
  children: JSX.Element;
}

const PrivateRoute: FC<IPrivateRoute> = ({ children }) => {
  const { accessToken, refreshToken } = useAuth();

  if (!accessToken && !refreshToken) {
    return <LoginPage />;
  }

  return children;
};

export const routes = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
    // errorElement: <Navigate to="/login" replace={true} />,
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
