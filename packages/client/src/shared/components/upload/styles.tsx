import { IconButton, styled } from '@mui/material';

export const SmallButton = styled(IconButton)(({ theme }) => ({
  width: 30,
  height: 30,
  backgroundColor: theme.palette.background.paper,

  '&:hover': {
    backgroundColor: theme.palette.background.paper,
  },
  '&:active': {
    backgroundColor: theme.palette.background.paper,
  },
  '&:focus': {
    backgroundColor: theme.palette.background.paper,
  },
}));
