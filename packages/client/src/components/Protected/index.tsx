import React from 'react';
import { Login } from '@mui/icons-material';
import { useAuth } from '../context/AuthProvider/useAuth';
import { Navigate } from 'react-router-dom';

function Protected({ children }: { children: JSX.Element }) {
    let auth = useAuth();

    return !auth.token ? <Navigate to="/" /> : children;
}
export default Protected;
