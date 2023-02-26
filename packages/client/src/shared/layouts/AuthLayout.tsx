import { FC } from 'react';
import { LoginPage } from '../../pages';
import { useAuth } from '../contexts/hooks';

interface IAuthLayout {
    children: JSX.Element;
}

export const AuthLayout: FC<IAuthLayout> = ({ children }) => {
    const user = useAuth();

    if (!user.accessToken) {
        return <LoginPage />;
    }

    return children;
};
