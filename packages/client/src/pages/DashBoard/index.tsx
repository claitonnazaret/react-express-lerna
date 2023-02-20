import { Button, CssBaseline, ThemeProvider, Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/context/AuthProvider/useAuth';
import { RoleService } from '../../services/roles';
import { ColorModeContext, useMode } from '../../theme';

const Dashboard = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [theme, colorMode] = useMode();

    const [rows, setRows] = useState<
        | {
              roleName: string;
              id: number;
              active: boolean;
              createdAt: Date;
              updatedAt: Date;
          }[]
        | null
    >();

    const handleLogout = async () => {
        await auth
            .logout()
            .then((res: any) => {
                navigate('/', { replace: true });
            })
            .catch((err: any) => {
                console.log(err);
            });
    };

    const handleRoles = async () => {
        await RoleService.getAll()
            .then((res: any) => {
                setRows(res.data.data);
            })
            .catch((err: any) => {
                console.log(err);
            });
    };

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <h1>Dashboard Page</h1>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        maxWidth: '380px',
                        minHeight: '200px',
                        backgroundColor: '#fff',
                    }}
                >
                    <Button variant="contained" onClick={handleLogout}>
                        Logout{' '}
                    </Button>
                </Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Código</TableCell>
                                <TableCell>Nome</TableCell>
                                <TableCell align="center">Ativo</TableCell>
                                <TableCell align="center">Criado em</TableCell>
                                <TableCell align="center">Atualizado em </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows &&
                                rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center" component="th" scope="row">
                                            {row.id}
                                        </TableCell>
                                        <TableCell>{row.roleName}</TableCell>
                                        <TableCell align="center">{row.active}</TableCell>
                                        <TableCell align="center">
                                            {row.createdAt.getDate()}
                                        </TableCell>
                                        <TableCell align="center">
                                            {row.updatedAt.getDate()}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Button variant="contained" onClick={handleRoles}>
                    Atualiza Tabela
                </Button>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default Dashboard;
