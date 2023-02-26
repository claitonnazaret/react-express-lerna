import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../shared/contexts/hooks';

const DashboardPage = () => {
    const navigate = useNavigate();
    const { name, email, role } = useAuth();

    return (
        <>
            <h1>Dashboard Page</h1>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
            <pre>{JSON.stringify({ name, email, role }, null, 2)}</pre>
        </>
    );
};

export default DashboardPage;
