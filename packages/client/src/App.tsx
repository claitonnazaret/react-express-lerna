import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage, MainPage, RegisterPage } from './pages';
import AppRoutes from './routes';
import { AppThemeProvider, AuthProvider, DrawerProvider } from './shared/contexts';
import { ProtectedLayout } from './shared/layouts';

function App() {
    return (
        <AppThemeProvider>
            <DrawerProvider>
                <SnackbarProvider
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    disableWindowBlurListener={true}
                >
                    <BrowserRouter>
                        <AuthProvider>
                            <Routes>
                                <Route path="/login" element={<LoginPage />} />
                                <Route path="/register" element={<RegisterPage />} />
                                <Route
                                    path="/*"
                                    element={
                                        <ProtectedLayout>
                                            <MainPage />
                                        </ProtectedLayout>
                                    }
                                />
                                <Route path="*" element={<Navigate to="login" />} />
                            </Routes>
                        </AuthProvider>
                    </BrowserRouter>
                </SnackbarProvider>
            </DrawerProvider>
        </AppThemeProvider>
    );
}

export default App;
