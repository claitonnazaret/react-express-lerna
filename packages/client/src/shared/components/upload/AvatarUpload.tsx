import { FC } from 'react';
import { Avatar, Icon, Badge } from '@mui/material';
import Dropzone, { Accept } from 'react-dropzone';
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
  const accepts: Accept = {
    'image/jpeg': [],
    'image/png': [],
    'image/jpg': [],
    'image/gif': [],
  };

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

  return (
    <Dropzone accept={accepts} onDropAccepted={handleUpload} multiple={false}>
      {({ getRootProps, getInputProps, isDragAccept, isDragReject }) => (
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          badgeContent={
            <SmallButton color="error" onClick={handleDelete}>
              <Icon>delete</Icon>
            </SmallButton>
          }
        >
          <Avatar
            sx={{
              border: `5px outset ${isDragAccept ? '#78e5d5' : isDragReject ? '#e57878' : '#999'}`,
              borderRadius: '50%',
              boxShadow: '0px 0px 0px 10px #fff;',
            }}
            src={preview}
            {...props}
            {...getRootProps()}
          />
        </Badge>
      )}
    </Dropzone>
  );
};
