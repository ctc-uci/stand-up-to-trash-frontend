import Backend from '../../utils/utils';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
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
  const [volunteerData, setVolunteerData] = React.useState({
    volunteer_id: 0,
    number_in_party: 0,
    pounds: 0,
    ounces: 0,
    unusual_items: [],
    event_id: 0,
    is_checked_in: false,
  });
  const [other, setOther] = React.useState('');

  const {
    register,
    handleSubmit,
  } = useForm(volunteerData);

  const postVolunteerData = async formData => {
    try {
      setVolunteerData((prevData) => ({
        ...prevData,
        pounds: formData.pounds,
        ounces: formData.ounces,
      }));
      await Backend.post('/data', volunteerData);
    } catch (error) {
      console.error('Error creating new volunteer:', error.message);
    }
  };

  const noReload = (data, event) => {
    event.preventDefault();
    postVolunteerData(data);
  };

  const addUnusualItem = (isChecked, newItem) => {
    if (isChecked && newItem.trim() !== '') {
      setVolunteerData((prevData) => ({
        ...prevData,
        unusual_items: [...new Set([...prevData.unusual_items, newItem, other])].filter(Boolean), //FILTERS EMPTY STRING
      }));
    } else {
      setVolunteerData((prevData) => ({
        ...prevData,
        unusual_items: [...new Set(prevData.unusual_items.filter((item) => item !== newItem))].filter(Boolean) //FILTERS EMPTY STRING
      }));
    }

  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader alignSelf={'center'}>name</ModalHeader>
        {/* postVolunteerData(10, 5, 5, 5, 10, 10) */}
        <form onSubmit={handleSubmit(noReload)}>
          <FormControl>
            <ModalCloseButton />
            <ModalBody>
              <Center>
                <Button>Go to Profile</Button>
              </Center>
              <FormControl>
                <Input
                  marginTop={5}
                  placeholder="Enter trash weight (lbs)"
                  alignItems={'center'}
                  {...register('pounds')}
                  type="number"
                />
                <Input
                  marginTop={5}
                  placeholder="Enter trash weight (oz)"
                  alignItems={'center'}
                  {...register('ounces')}
                  type="number"
                />
                <Center>
                  <FormLabel paddingTop={'20px'}>Enter Unusual Items</FormLabel>{' '}
                </Center>
                <Stack padding={'10px'}>
                <Checkbox {...register('unusual_item_A')} onChange={(e) => addUnusualItem(e.target.checked, e.target.name)}>
                    Unusual Item A{' '}
                  </Checkbox>
                  <Checkbox {...register('unusal_item_B')} onChange={(e) => addUnusualItem(e.target.checked, e.target.name)}>
                    Unusual Item B{' '}
                  </Checkbox>
                  <Checkbox {...register('unusal_item_C')} onChange={(e) => addUnusualItem(e.target.checked, e.target.name)}>
                    Unusual Item C
                  </Checkbox>
                  <Checkbox {...register('unusal_item_D')} onChange={(e) => addUnusualItem(e.target.checked, e.target.name)}>
                    Unusual Item D
                  </Checkbox>
                  <Stack flexDirection={''}>
                    <Checkbox isRequired>Other: </Checkbox>
                    <Input
                      onChange={e => setOther(e.target.value)}
                      value={other}
                    />
                  </Stack>
                  <Textarea height={200} resize="vertical" />
                </Stack>
              </FormControl>
            </ModalBody>

            <ModalFooter alignSelf={'center'}>
              <Button colorScheme="green" mr={3} type="submit" onClick={() => {
                onClose;
                addUnusualItem(true, other);
              }}>
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