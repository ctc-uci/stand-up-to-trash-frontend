import{ useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Button,
  Text,
  Image,
  Box,
  Center,
  FormControl,
  FormLabel,
  Input,
  Icon,
} from '@chakra-ui/react';
import { FaUserAlt } from 'react-icons/fa'; // Icon for when there is no picture

function CheckinModal({ isOpen, onClose, volunteer, onCheckInConfirm }) {
  const [numberOfParticipants, setNumberOfParticipants] = useState('');

  const handleCheckIn = async () => {
    console.log('handleCheckIn called');
    if (volunteer && typeof volunteer === 'object' && volunteer.id) {
      console.log('Volunteer:', volunteer);
      await onCheckInConfirm(volunteer, numberOfParticipants);  // Pass the entire volunteer object
      onClose();
    } else {
      console.error('Invalid volunteer object:', volunteer);
    }
  };
  
  
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay backgroundColor={'rgba(0, 0, 0, .5)'} />
        <ModalContent borderRadius={'22px'} padding={5}>
          <ModalCloseButton backgroundColor={'#EFEFEF'} borderRadius={'100px'} />
          <ModalHeader alignSelf={'center'}>
          <Text fontFamily={'Avenir'}fontWeight={'800'} fontSize={'24px'} textAlign="center">
            Check-in Volunteer
          </Text>
          {volunteer && (
            <Box textAlign="center">
              
              {volunteer.picture ? (
                <Image src={volunteer.picture} alt="Volunteer" borderRadius="full" boxSize="100px" margin="auto" my={4} />
              ) : (
                <Icon as={FaUserAlt} boxSize="100px" margin="auto" my={4} />
              )}
              <Text fontFamily={'Avenir'}fontWeight={'350'}fontSize={'20px'}>
                {`${volunteer.first_name} ${volunteer.last_name}`}
              </Text>
              <Text color={'#718096'}fontFamily={'Avenir'} fontWeight={'300'}fontSize={'14px'}>{volunteer.email}</Text>
            </Box>
          )}
        </ModalHeader>
          <FormControl p={8}>
            <FormLabel fontFamily={'Avenir'} fontSize={'14px'}fontWeight={'400'}>Enter Number of Participants Presents</FormLabel>
            <Input
              placeholder="Enter number"
              value={numberOfParticipants}
              onChange={(e) => setNumberOfParticipants(e.target.value)}
              type="number"
            />
          </FormControl>
          <Center p={2}>
          <Button
            onClick={handleCheckIn}
            background="#0075FF"
            w="90%"
            h="50px"
            borderRadius="12px"
            fontFamily={'Avenir'}
            color={'white'}
          >
            Check-in
          </Button>
          </Center>
        </ModalContent>
      </Modal>
    </div>
  );
}

CheckinModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCheckInConfirm: PropTypes.func.isRequired,
  volunteer: PropTypes.shape({
    id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    picture: PropTypes.string,
  }),
};

export default CheckinModal;
