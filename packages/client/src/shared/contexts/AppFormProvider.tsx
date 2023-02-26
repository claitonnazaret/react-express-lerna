import { createContext, FC, ReactNode, useEffect, useState } from 'react';
import { Box, Icon, SpeedDialAction, SpeedDial, useTheme } from '@mui/material';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';

interface IAction {
    icon: string;
    label: string;
    handle: () => Promise<void>;
}

interface IAppFormContext {
    setActions: (actions: IAction[]) => void;
}

interface IAppFormProvider {
    children: ReactNode;
}
export const AppFormContext = createContext<IAppFormContext>({} as IAppFormContext);

export const AppFormProvider: FC<IAppFormProvider> = ({ children }) => {
    const theme = useTheme();
    const [actions, setActions] = useState<IAction[]>([]);

    return (
        <AppFormContext.Provider value={{ setActions }}>
            <Box flex={1}>
                {children}
                <SpeedDial
                    ariaLabel="SpeedDial playground example"
                    icon={<SpeedDialIcon />}
                    direction="left"
                    sx={{ position: 'absolute', bottom: 90, right: 40 }}
                >
                    {actions?.map((action) => (
                        <SpeedDialAction
                            key={action.label}
                            icon={<Icon>{action.icon}</Icon>}
                            tooltipTitle={action.label}
                            onClick={action.handle}
                        />
                    ))}
                </SpeedDial>
            </Box>
        </AppFormContext.Provider>
    );
};
