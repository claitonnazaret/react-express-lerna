import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage, RegisterPage } from './pages';
import { AppThemeProvider, AuthProvider, DrawerProvider } from './shared/contexts';
import { AuthLayout, MainLayout } from './shared/layouts';

function App() {
    return (
        <AppThemeProvider>
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
                                    <AuthLayout>
                                        <DrawerProvider>
                                            <MainLayout />
                                        </DrawerProvider>
                                    </AuthLayout>
                                }
                            />
                            <Route path="*" element={<Navigate to="login" />} />
                        </Routes>
                    </AuthProvider>
                </BrowserRouter>
            </SnackbarProvider>
        </AppThemeProvider>
    );
}

export default App;
