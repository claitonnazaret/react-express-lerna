import { SnackbarProvider } from 'notistack';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { AppThemeProvider, AuthProvider, LoadingProvider } from './shared/contexts';

function App() {
    return (
        <AppThemeProvider>
            <SnackbarProvider
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                disableWindowBlurListener={true}
            >
                <LoadingProvider>
                    <AuthProvider>
                        <RouterProvider router={routes} />
                    </AuthProvider>
                </LoadingProvider>
            </SnackbarProvider>
        </AppThemeProvider>
    );
}

export default App;
