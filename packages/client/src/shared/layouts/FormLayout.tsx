import { FC, ReactNode, useEffect } from 'react';
import { Box, Icon, SpeedDialAction } from '@mui/material';
import SpeedDial, { SpeedDialProps } from '@mui/material/SpeedDial';
import { useAppBar } from '../contexts/hooks/useAppBar';

interface IFormLayout {
    salvar: (data: any) => void;
    children: ReactNode;
}

export const FormLayout: FC<IFormLayout> = ({ salvar, children }) => {
    const actions = [{ icon: <Icon>save</Icon>, name: 'Salvar' }];

    return (
        <>
            {children}
            <Box sx={{ position: 'relative', mt: 3, height: 320 }}>
                <SpeedDial
                    ariaLabel="SpeedDial playground example"
                    icon={<Icon>speed_dial</Icon>}
                    direction="left"
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                        />
                    ))}
                </SpeedDial>
            </Box>
        </>
    );
};
