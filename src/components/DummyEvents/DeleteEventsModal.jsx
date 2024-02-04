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

const DeleteEventsModal = ({ isOpen, onClose, events, confirmDelete }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm event deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            Are you sure you want to delete these events? This action cannot be undone.
            <UnorderedList mt="2">
              {events.map(event => {
                return <ListItem key={event.id}>{event.name}</ListItem>;
              })}
            </UnorderedList>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={confirmDelete}>
              Permanently Delete
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

DeleteEventsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
};

export default DeleteEventsModal;
