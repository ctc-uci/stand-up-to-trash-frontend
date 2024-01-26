import PropTypes from 'prop-types';
// import React from 'react';
//import { useForm } from 'react-hook-form';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Input,
  Checkbox,
  Stack,
  FormLabel,
  Center,
  Textarea,
} from '@chakra-ui/react';

const DataEntryModal = ({ isOpen, onClose }) => {
  //const [trash_weight, setTrashWeight] = React.useState(0);
  //const [volunteerData, setVolunteerData] = React.useState({"volunteer_id" : 0, "number_in_party": 0, "pounds": 0, "ounces": 0, "unusual_items": [], "event_id": 0})
0
//   const postVolunteerData = async (
//     volunteer_id,
//     number_in_party,
//     pounds,
//     ounces,
//     unusual_items,
//     event_id,
//   ) => {
//     try {
//       const postData = {
//         volunteer_id: volunteer_id,
//         number_in_party: number_in_party,
//         pounds: pounds,
//         ounces: ounces,
//         unusual_items: unusual_items,
//         event_id: event_id,
//         is_checked_in: false,
//       };

//       const { postStatus } = await Backend.post('/data', postData);
//       getVolunteerData();
//     } catch (error) {
//       console.error('Error with posting:', error.message);
//     }
//   };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader alignSelf={'center'}>name</ModalHeader>
        {/* postVolunteerData(10, 5, 5, 5, 10, 10) */}
        <form onSubmit={() => console.log("poop")}>
          <FormControl>
            <ModalCloseButton />
            <ModalBody>
              <Center>
                <Button>Go to Profile</Button>
              </Center>
              <FormControl>
                <Input marginTop={5} placeholder="Enter trash weight (lbs)" alignItems={'center'} />
                <Input marginTop={5} placeholder="Enter trash weight (oz)" alignItems={'center'} />
                <Center>
                  <FormLabel paddingTop={'20px'}>Enter Unusual Items</FormLabel>{' '}
                </Center>
                <Stack padding={'10px'}>
                  <Checkbox>Unusual Item A </Checkbox>
                  <Checkbox>Unusual Item B </Checkbox>
                  <Checkbox></Checkbox>
                  <Checkbox></Checkbox>
                  <Stack flexDirection={''}>
                    <Checkbox>Other: </Checkbox>
                    <Input />
                  </Stack>
                  <Textarea height={200} resize="vertical" />
                </Stack>
              </FormControl>
            </ModalBody>

            <ModalFooter alignSelf={'center'}>
              <Button colorScheme="green" mr={3} type="submit" onClick={onClose}>
                Save
              </Button>
            </ModalFooter>
          </FormControl>
        </form>
      </ModalContent>
    </Modal>
  );
};

DataEntryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DataEntryModal;
