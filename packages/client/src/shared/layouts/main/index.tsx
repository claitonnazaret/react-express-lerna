import { useEffect } from 'react';
import { useAuth, useDrawer } from '../../../shared/contexts/hooks';
import { SideBar } from './SideBar';
import { Outlet } from 'react-router-dom';
import { AppFormProvider } from '../../contexts';
import { menus } from '../../../routes';
import Logo from '../../assets/react.svg';

export const MainLayout = () => {
  const { avatar } = useAuth();
  const { setAppInfo, setDrawerOptions } = useDrawer();

  useEffect(() => {
    setAppInfo({ titulo: 'Novo Titulo', iconProfile: avatar ?? Logo });
    setDrawerOptions(menus);
  }, []);

  useEffect(() => {}, []);
  return (
    <SideBar>
      <AppFormProvider>
        <Outlet />
      </AppFormProvider>
    </SideBar>
  );
};
