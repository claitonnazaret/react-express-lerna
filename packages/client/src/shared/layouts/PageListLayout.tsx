import { FC } from 'react';
import { DataGrid, GridColDef, GridValueGetterParams, DataGridProps } from '@mui/x-data-grid';
import { Box, useTheme } from '@mui/material';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';

export interface IPageListLayout extends DataGridProps {
    columns: GridColDef[];
    rows: any[];
}

const PageListLayout: FC<IPageListLayout> = ({ columns, rows, ...otherProps }) => {
    const theme = useTheme();
    const data = { columns, rows, ...otherProps };

    return (
        <Box flex={1}>
            <Toolbar></Toolbar>
            <DataGrid {...data} />
        </Box>
    );
};

export default PageListLayout;
