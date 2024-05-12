import {
  Button,
  Text,
  Stack,
  Modal,
  ModalContent,
  ModalBody,
  ModalOverlay,
  ModalCloseButton,
} from '@chakra-ui/react';
import Backend from '../utils/utils';


const CancelFlowController = ({id, isOpen, onClose}) => {
  const unregisterFromEvent = async (id) => {
    console.log(id)
    // Register for event
    try {
      const route = '/data/' + id
      await Backend.delete(route);
      onClose();
    } catch (e) {
      console.log('Error deleting event data entry', e);
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalCloseButton />
      <ModalBody>
        <Stack align="center" padding="1rem" gap="2rem">
          <Text fontSize="2xl" align="center">Are you sure you want to cancel your registration?</Text>
          <Button onClick={() => unregisterFromEvent(id)}>Confirm Cancellation</Button>
        </Stack>
      </ModalBody>
    </ModalContent>
    </Modal>
  );
}

export default CancelFlowController;
