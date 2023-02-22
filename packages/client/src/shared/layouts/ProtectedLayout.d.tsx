import { LoginPage } from '../../pages';
import { useAuth } from '../hooks/useAuth';

const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
    const user = useAuth();

    return !user.accessToken ? <LoginPage /> : children;
};

export default ProtectedLayout;
