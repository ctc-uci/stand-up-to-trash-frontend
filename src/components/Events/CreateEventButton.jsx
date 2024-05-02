import {
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import Backend from '../../utils/utils';

const CreateEventButton = ({ getEvents }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // These values are placeholders to just test the form
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    imageUrl: '',
    date: '2024-01-01',
    time: '07:00',
    waiver: '',
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await Backend.post('/events', formData);
      setFormData({ name: '', description: '', location: '' });
      getEvents();
    } catch (e) {
      console.log('Error posting', e);
    }
  };

  return (
    <>
      <Button
        style={{ backgroundColor: '#95D497', borderRadius: '30px' }}
        height="50px"
        onClick={onOpen}
      >
        <Box padding="13px 13px" fontSize="20px" display="inline-flex" gap="10px">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.1429 12.8571H3V10.1429H11.1429V2H13.8571V10.1429H22V12.8571H13.8571V21H11.1429V12.8571Z"
              fill="black"
            />
          </svg>
          Create Event
        </Box>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new event</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired marginTop={10}>
                <FormLabel marginLeft={10} htmlFor="name">
                  Name
                </FormLabel>
                <Input
                  marginLeft={10}
                  id="name"
                  name="name"
                  onChange={handleInputChange}
                  value={formData.name}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel marginLeft={10} htmlFor="description">
                  Description
                </FormLabel>
                <Textarea
                  id="description"
                  name="description"
                  onChange={handleInputChange}
                  value={formData.description}
                  marginLeft={10}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel marginLeft={10} htmlFor="location">
                  Location
                </FormLabel>
                <Input
                  marginLeft={10}
                  id="location"
                  name="location"
                  onChange={handleInputChange}
                  value={formData.location}
                />
              </FormControl>
              <Button marginLeft={10} type="submit" colorScheme="blue" marginTop={4}>
                Submit
              </Button>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

CreateEventButton.propTypes = {
  getEvents: PropTypes.func.isRequired,
};

export default CreateEventButton;
