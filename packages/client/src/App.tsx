import { Routes, Route } from 'react-router-dom';
import { Dashboard, LoginPage, NotFoundPage, RegisterPage } from './pages';
import { SnackbarProvider } from 'notistack';
import { ProtectedLayout } from './shared/layouts';

function App() {
    return (
        <SnackbarProvider
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            disableWindowBlurListener={true}
        >
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedLayout>
                            <Dashboard />
                        </ProtectedLayout>
                    }
                ></Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </SnackbarProvider>
    );
}

export default App;
