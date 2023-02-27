import { useEffect, useState } from 'react';
import { useAppBar, useAuth, useLoading } from '../shared/contexts/hooks';
import { ProfileService } from '../shared/services';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import { useAppForm } from '../shared/contexts/hooks/useAppForm';
import { object, string, TypeOf, number } from 'zod';
import { Box } from '@mui/system';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormInput } from '../shared/components';
import { useMediaQuery, useTheme, Grid } from '@mui/material';

const registerSchema = object({
    id: number(),
    nome: string().nonempty('Nome é obrigatório').nullable(),
    sobreNome: string().nonempty('Sobrenome é obrigatório').nullable(),
    avatar: string().nullable(),
    documento: string().nonempty('CPF/CNPJ é obrigatório').nullable(),
});

type RegisterInput = TypeOf<typeof registerSchema>;

export const ProfilePage = () => {
    const [data, setData] = useState<RegisterInput>();
    const { id } = useAuth();
    const { loading } = useLoading();
    const { enqueueSnackbar } = useSnackbar();
    const { setActions } = useAppForm();
    const { setTitulo } = useAppBar();
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const xl = useMediaQuery(theme.breakpoints.down('xl'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));

    const onSubmitHandler: SubmitHandler<RegisterInput> = async (values) => {
        setData(values);
        console.log(JSON.stringify(values));
        // loading(true);
        // await ProfileService.save(values.id, values)
        //     .then((res) => {
        //         enqueueSnackbar('Profile Salvo com sucesso!', { variant: 'success' });
        //     })
        //     .catch((err: AxiosError) => {
        //         enqueueSnackbar(err.message, { variant: 'error' });
        //     })
        //     .finally(() => loading(false));
    };

    useEffect(() => {
        setTitulo('Profile');
        setActions([{ icon: 'save', label: 'Salvar', handle: handleSubmit(onSubmitHandler) }]);

        loading(true);
        ProfileService.findOne(id ?? 0)
            .then((res) => {
                setData(res.data);
            })
            .catch((err: AxiosError) => {
                enqueueSnackbar(err.message, { variant: 'error' });
            })
            .finally(() => loading(false));
    }, []);

    const methods = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        values: data,
    });

    const {
        reset,
        handleSubmit,
        register,
        formState: { isSubmitSuccessful, errors },
    } = methods;

    return (
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <FormProvider {...methods}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <FormInput
                            margin="normal"
                            required
                            fullWidth
                            id="documento"
                            label="Documento"
                            name="documento"
                            autoComplete="off"
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormInput
                            margin="normal"
                            required
                            fullWidth
                            id="nome"
                            label="Nome"
                            name="nome"
                            autoComplete="off"
                            autoFocus
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <FormInput
                            margin="normal"
                            required
                            fullWidth
                            id="sobreNome"
                            label="Sobrenome"
                            name="sobreNome"
                            autoComplete="off"
                        />
                    </Grid>
                </Grid>
            </FormProvider>
            <h3>sm: {JSON.stringify(data, null, 2)}</h3>
        </Box>
    );
};
