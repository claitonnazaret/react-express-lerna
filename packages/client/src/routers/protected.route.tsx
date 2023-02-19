import { useAuth } from '../components/context/AuthProvider/useAuth';
import LoginPage from '../pages/LoginPage';

const ProtectedRoute = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    const auth = useAuth();

    return !auth.email ? <LoginPage /> : children;
};

export default ProtectedRoute;
