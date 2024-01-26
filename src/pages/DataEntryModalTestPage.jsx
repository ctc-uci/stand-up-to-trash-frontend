import DataEntryModal from '../components/DataEntryModal/DataEntryModal';
import { useDisclosure, Button } from '@chakra-ui/react';

const DataEntryModalTestPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <DataEntryModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default DataEntryModalTestPage;
