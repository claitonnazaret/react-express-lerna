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
import { AvatarUpload, IArquivo, TextFieldCpfCnpj } from '../shared/components';
import { Grid, Stack } from '@mui/material';
import { REQUIRED_FIELD } from '../shared/utils';
import { TextFieldElement } from 'react-hook-form-mui';
import InputMask from 'react-input-mask';
import { cpf, cnpj } from 'cpf-cnpj-validator';

const registerSchema = object({
  nome: string({
    required_error: REQUIRED_FIELD,
  }),
  sobreNome: string({
    required_error: REQUIRED_FIELD,
  }),
  documento: string({
    required_error: REQUIRED_FIELD,
  }).refine((val) => cpf.isValid(val), 'Digite um documento válido'),
  id: number(),
  file: any().optional(),
});

type RegisterInput = TypeOf<typeof registerSchema>;

export const ProfilePage = () => {
  const { id: userId } = useAuth();
  const { loading } = useLoading();
  const { enqueueSnackbar } = useSnackbar();
  const { setActions } = useAppForm();
  const { setTitulo } = useAppBar();
  const { appInfo, setAppInfo } = useDrawer();
  const [arquivo, setArquivo] = useState<IArquivo>({ file: null, preview: '' });

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const { reset, handleSubmit, getValues } = methods;

  const onSubmitHandler: SubmitHandler<RegisterInput> = async (values) => {
    const { id } = values;
    loading(true);
    await ProfileService.save(id, values)
      .then((res) => {
        reset(res.data);
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
    ProfileService.findOne(userId ?? 0)
      .then((res) => {
        reset(res.data);
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

  useEffect(() => {
    reset((prevState) => ({
      ...prevState,
      file: arquivo?.file,
    }));
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
        <Grid container spacing={1} columns={{ xs: 4, sm: 8, md: 12 }}>
          <Grid item xs={12} sm={12} md={4}>
            <TextFieldCpfCnpj
              label="Documento"
              name="documento"
              margin="normal"
              size="small"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TextFieldElement
              label="Nome"
              name="nome"
              margin="normal"
              autoComplete="off"
              size="small"
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <TextFieldElement
              label="Sobrenome"
              name="sobreNome"
              margin="normal"
              autoComplete="off"
              size="small"
              fullWidth
              required
            />
          </Grid>
        </Grid>
      </FormProvider>
    </Box>
  );
};
