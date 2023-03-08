import { useEffect, useState } from 'react';
import { useAppBar, useAuth, useDrawer, useLoading } from '../shared/contexts/hooks';
import { ProfileService } from '../shared/services';
import { useSnackbar } from 'notistack';
import { AxiosError } from 'axios';
import { useAppForm } from '../shared/contexts/hooks/useAppForm';
import { object, string, TypeOf, number, any } from 'zod';
import { Box } from '@mui/system';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AvatarUpload, FormInput, FormMaskInput, IArquivo } from '../shared/components';
import { Grid, Stack } from '@mui/material';

const registerSchema = object({
  id: number(),
  nome: string().nonempty('Nome é obrigatório').nullable(),
  sobreNome: string().nonempty('Sobrenome é obrigatório').nullable(),
  documento: string().nonempty('CPF/CNPJ é obrigatório').nullable(),
  file: any().nullable(),
});

type RegisterInput = TypeOf<typeof registerSchema>;

export const ProfilePage = () => {
  const { id } = useAuth();
  const { loading } = useLoading();
  const { enqueueSnackbar } = useSnackbar();
  const { setActions } = useAppForm();
  const { setTitulo } = useAppBar();
  const { appInfo, setAppInfo } = useDrawer();

  const [data, setData] = useState<RegisterInput>({} as RegisterInput);
  const [arquivo, setArquivo] = useState<IArquivo>({ file: null, preview: '' });

  const onSubmitHandler: SubmitHandler<RegisterInput> = async (values) => {
    const { id } = values;
    console.log(values);

    loading(true);
    await ProfileService.save(id, values)
      .then((res) => {
        setData(res.data);
        setArquivo({
          ...arquivo,
          preview: res.data?.avatar,
        });
        setAppInfo({ ...appInfo, iconProfile: res.data?.avatar });
        enqueueSnackbar('Profile Salvo com sucesso!', { variant: 'success' });
      })
      .catch((err: AxiosError) => {
        enqueueSnackbar(err.message, { variant: 'error' });
      })
      .finally(() => loading(false));
  };

  useEffect(() => {
    setTitulo('Profile');
    setActions([{ icon: 'save', label: 'Salvar', handle: handleSubmit(onSubmitHandler) }]);

    loading(true);
    ProfileService.findOne(id ?? 0)
      .then((res) => {
        setData(res.data);
        setArquivo({
          ...arquivo,
          preview: res.data?.avatar,
        });
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

  useEffect(() => {
    setData({ ...data, file: arquivo?.file });
  }, [arquivo]);

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <FormProvider {...methods}>
        <Stack
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AvatarUpload
            sx={{ width: 150, height: 150 }}
            preview={arquivo.preview}
            arquivo={arquivo}
            setArquivo={setArquivo}
          />
        </Stack>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <FormMaskInput
              margin="normal"
              required
              fullWidth
              id="documento"
              label="Documento"
              name="documento"
              autoComplete="off"
              mask="###.###.###-##"
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
    </Box>
  );
};
