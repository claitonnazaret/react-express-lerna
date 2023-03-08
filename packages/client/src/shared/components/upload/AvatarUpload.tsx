import { FC } from 'react';
import { Avatar, Icon, Badge, Typography, useTheme } from '@mui/material';
import Dropzone from 'react-dropzone';
import { AvatarProps } from '@mui/material/Avatar';
import { SmallButton } from './styles';

export interface IArquivo {
  file: File | null;
  preview: string;
}

interface TAvatarUpload extends AvatarProps {
  preview: string;
  arquivo: IArquivo;
  setArquivo: (arquivo: IArquivo) => void;
}

export const AvatarUpload: FC<TAvatarUpload> = ({ preview, arquivo, setArquivo, ...props }) => {
  const maxFileSize = 2 * 1024 * 1024;
  const theme = useTheme();

  const handleUpload = (files: File[]) => {
    setArquivo({
      file: files?.[0],
      preview: URL.createObjectURL(files?.[0]),
    });
  };

  const handleDelete = () => {
    setArquivo({
      file: null,
      preview: '',
    });
  };

  const validatorDropzone = (file: File) => {
    if (file.type.split('/')[0] !== 'image') {
      return {
        code: 'file-invalid-type',
        message: `Somente arquivos do tipo imagem são permitidos`,
      };
    }
    if (file.size > maxFileSize) {
      return {
        code: 'file-too-large',
        message: `Arquivo é maior que 2Mb`,
      };
    }

    return null;
  };

  return (
    <Dropzone
      // accept={{ 'image/*': [] }}
      onDropAccepted={handleUpload}
      multiple={false}
      validator={validatorDropzone}
    >
      {({ getRootProps, getInputProps, isDragAccept, isDragReject, fileRejections }) => (
        <>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              arquivo.file ? (
                <SmallButton color="error" onClick={handleDelete}>
                  <Icon>delete</Icon>
                </SmallButton>
              ) : (
                <></>
              )
            }
          >
            <Avatar
              sx={{
                border: `5px solid ${
                  isDragAccept
                    ? theme.palette.success.main
                    : fileRejections.length || isDragReject
                    ? theme.palette.error.main
                    : 'transparent'
                }`,
                borderRadius: '50%',
                ...props.sx,
              }}
              src={preview}
              {...getRootProps()}
            />
          </Badge>
          <Typography variant="caption" sx={{ marginTop: 2, color: theme.palette.error.main }}>
            {fileRejections?.[0]?.errors?.[0]?.message}
          </Typography>
        </>
      )}
    </Dropzone>
  );
};
