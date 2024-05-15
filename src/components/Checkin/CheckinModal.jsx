import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FaUserAlt } from 'react-icons/fa'; // Icon for when there is no picture
import GroupIcon from '../../Assets/groupIcon.svg';

const CheckinModal = ({ isOpen, onClose, volunteer, onCheckInConfirm }) => {
  const [numberOfParticipants, setNumberOfParticipants] = useState(1);
  const [submittable, setSubmittable] = useState(true);

  const handleInput = e => {
    setNumberOfParticipants(e.target.value);
    const numericRegex = /^[0-9]*$/;
    const isNumeric = numericRegex.test(e.target.value);
    setSubmittable(isNumeric && e.target.value.trim() !== '');
  };

  const handleCheckIn = async () => {
    if (volunteer && typeof volunteer === 'object' && volunteer.id && volunteer.event_data_id) {
      await onCheckInConfirm(volunteer, numberOfParticipants); // Pass the entire volunteer object
      onClose();
    } else {
      console.error('Invalid volunteer object:', volunteer);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay backgroundColor={'rgba(0, 0, 0, .5)'} />
        <ModalContent borderRadius={'22px'} padding={5}>
          <ModalCloseButton backgroundColor={'#EFEFEF'} borderRadius={'100px'} />
          <ModalHeader alignSelf={'center'}>
            <Text fontWeight="bold" textAlign="center" fontSize="xl">
              Check-in volunteer
            </Text>
          </ModalHeader>
          {volunteer && (
            <Box textAlign="center" bgColor="#EEEFEF" borderRadius={5} display="flex" padding={4}>
              <Image src={volunteer.image_url} borderRadius={5} maxW="20%" maxH="20%" />
              <Flex ml={3} direction="column" maxW="80%">
                <Text
                  textAlign="left"
                  mb={1}
                  fontSize="md"
                  fontWeight="bold"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  noOfLines={1}
                >
                  {volunteer.first_name} {volunteer.last_name}
                </Text>
                <Flex
                  bgColor="white"
                  borderRadius={5}
                  alignItems="center"
                  padding={2}
                  maxW="fit-content"
                >
                  <FaUserAlt color="#49B164" />
                  <Text fontSize="xs" ml={1} fontWeight="bold">
                    {!volunteer.number_in_party || volunteer.number_in_party == 1
                      ? 'Individual'
                      : 'Group'}
                  </Text>
                </Flex>
              </Flex>
            </Box>
          )}
          <FormControl p={4}>
            <FormLabel fontSize={'14px'} fontWeight="bold">
              Party Size
            </FormLabel>
            <InputGroup>
              <InputLeftElement>
                <Image src={GroupIcon} />
              </InputLeftElement>
              <Input
                placeholder="Enter number"
                value={numberOfParticipants}
                onChange={e => handleInput(e)}
                type="number"
              />
            </InputGroup>
          </FormControl>
          <Center p={2}>
            <Button
              onClick={handleCheckIn}
              background="#0075FF"
              w="90%"
              h="50px"
              borderRadius="12px"
              color={'white'}
              isDisabled={!submittable}
            >
              Check-in
            </Button>
          </Center>
        </ModalContent>
      </Modal>
    </div>
  );
};

CheckinModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCheckInConfirm: PropTypes.func.isRequired,
  volunteer: PropTypes.shape({
    id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    image_url: PropTypes.string,
    number_in_party: PropTypes.number,
    event_data_id: PropTypes.number,
  }),
};

export default CheckinModal;
