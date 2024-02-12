import { extendTheme } from '@chakra-ui/react';
import { FileUploadIcon, CreateEventIcon, CancelIcon } from '../components/Icons/EventsModalIcons';

const theme = extendTheme({
  icons: {
    FileUploadIcon,
    CreateEventIcon,
    CancelIcon,
  },
});

export default theme;
