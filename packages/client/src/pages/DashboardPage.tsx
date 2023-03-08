import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../shared/contexts/hooks';
import { useAppBar } from '../shared/contexts/hooks/useAppBar';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { name, email, role } = useAuth();
  const { setTitulo } = useAppBar();

  useEffect(() => setTitulo('Dashboard'), []);

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
