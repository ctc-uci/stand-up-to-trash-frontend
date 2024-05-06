import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const DeleteEventsModal = ({ isOpen, onClose, events, confirmDelete }) => {
  // Function to format event names separated by commas, except the last one
  const formattedEventNames = events.map(event => event.name).join(', ');

  // Determine the correct event label based on the number of events
  const eventLabel = events.length > 1 ? 'Events' : 'Event';

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent style={{ padding: '30px', borderRadius: '20px' }}>
        <ModalCloseButton />
        <ModalBody
          padding={6}
          textAlign="center"
          fontWeight="800"
          fontSize="32px"
          lineHeight="33.71px"
          style={{ display: 'block' }} // Ensure text alignment applies correctly
        >
          Are you sure you want to delete: {formattedEventNames} {eventLabel}?
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button
            onClick={onClose}
            mr={3}
            style={{
              backgroundColor: 'white',
              fondSize: '20px',
              borderRadius: '5px',
              color: '#0075FF',
              border: '1px solid #0075FF',
              width: '130px',
            }}
          >
            Cancel
          </Button>

          <Button
            colorScheme="red"
            style={{ width: '130px', fondSize: '20px' }}
            onClick={confirmDelete}
          >
            Delete {eventLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

DeleteEventsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
};

export default DeleteEventsModal;
