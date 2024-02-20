import {
  Button,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UnorderedList,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const ArchiveEventsModal = ({ isOpen, onClose, events, confirmArchive }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm event archive</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            Are you sure you want to archive these events? This action cannot be undone.
            <UnorderedList mt="2">
              {events.map(event => {
                return <ListItem key={event.id}>{event.name}</ListItem>;
              })}
            </UnorderedList>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
            <Button colorScheme="red" ml={3} onClick={confirmArchive}>
              Archive
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

ArchiveEventsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  confirmArchive: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
};

export default ArchiveEventsModal;
