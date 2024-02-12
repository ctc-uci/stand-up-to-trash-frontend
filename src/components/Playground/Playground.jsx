import ExportButton from '../ExportCSVButton/ExportButton';
import AddEventsModal from '../AddEventsModal/AddEventsModal';
import Dropzone from '../Dropzone.tsx';
import { Flex } from '@chakra-ui/react';

const Playground = () => {
  return (
    <Flex
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      backgroundColor={'pink'}
    >
      <p>Use this page to test out the look of any of your components!</p>
      <ExportButton eventId={19} />
      <ExportButton eventId={-1} />

      <AddEventsModal />
      <Dropzone />
    </Flex>
  );
};

export default Playground;
