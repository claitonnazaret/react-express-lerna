import { useLocation } from 'react-router-dom';
import { LoginPage } from '../../pages';
import { useAuth } from '../context/AuthProvider/useAuth';

function Protected({ children }: { children: JSX.Element }) {
    const user = useAuth();
    const location = useLocation();

    if (!user.accessToken) {
        return <LoginPage />;
    }
    return children;
}
export default Protected;
