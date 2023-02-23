import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { AppThemeProvider, AuthProvider, DrawerProvider } from './shared/contexts';

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
                            <AppRoutes />
                        </AuthProvider>
                    </BrowserRouter>
                </SnackbarProvider>
            </DrawerProvider>
        </AppThemeProvider>
    );
}

export default App;
