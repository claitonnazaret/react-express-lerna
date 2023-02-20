import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard, LoginPage, NotFoundPage } from './pages';
import Protected from './components/Protected';
import { SnackbarProvider } from 'notistack';
import RegisterPage from './pages/RegisterPage';

function App() {
    const snackConf = {
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        disableWindowBlurListener: true,
    };

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
                        <Protected>
                            <Dashboard />
                        </Protected>
                    }
                ></Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </SnackbarProvider>
    );
}

export default App;
