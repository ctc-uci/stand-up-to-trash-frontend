import Backend from '../../utils/utils';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Input,
  FormLabel,
  Center,
  Image,
} from '@chakra-ui/react';

const DataEntryModal = ({
  isOpen,
  onClose,
  profileImage,
  firstName,
  lastName,
  volunteerId,
  eventId,
  unusualItems,
}) => {
  const [volunteerData, setVolunteerData] = useState({
    volunteer_id: volunteerId,
    number_in_party: 0,
    pounds: 0,
    ounces: 0,
    unusual_items: [],
    event_id: eventId,
    is_checked_in: false,
  });
  // const [other, setOther] = useState('');
  const other = '';
  // let [unusualItemsArray, setUnusualItemsArray] = useState([]);

  // COMMENTED OUT BECAUSE DESIGN FLAW

  // parses unusual items input - single entries come as strings, multiple entries come as strings of the form {item1, item2... itemn}
  // useEffect(() => {
  //   formatUnusualItems();
  // }, []);
  useEffect(() => {}), [unusualItems];

  // const formatUnusualItems = () => {
  //   if (unusualItems.length != 0 && unusualItems[0] === '{') {
  //     let trimmed = unusualItems.replace(/{|}/g, '').trim();
  //     let unusualItemsList = trimmed.split(',');
  //     unusualItemsList = unusualItemsList.map(item => item.replace(/"/g, ''));
  //     setUnusualItemsArray(unusualItemsList);
  //   } else {
  //     setUnusualItemsArray([unusualItems]);
  //   }
  // };

  const { register, handleSubmit } = useForm(volunteerData);

  const postVolunteerData = async formData => {
    try {
      const dataToSend = {
        ...volunteerData,
        pounds: formData.pounds,
        ounces: formData.ounces,
        unusual_items: formData.other,
      };
      await Backend.post('/data', dataToSend);
      onClose();
    } catch (error) {
      console.error('Error creating new volunteer:', error.message);
    }
  };

  const noReload = (data, event) => {
    event.preventDefault();
    addUnusualItem(true, other);
    postVolunteerData(data);
  };

  const addUnusualItem = (isChecked, newItem) => {
    if (isChecked && newItem.trim() !== '') {
      setVolunteerData(prevData => ({
        ...prevData,
        unusual_items: [...new Set([...prevData.unusual_items, newItem, other])].filter(Boolean), //FILTERS EMPTY STRING
      }));
    } else {
      setVolunteerData(prevData => ({
        ...prevData,
        unusual_items: [...new Set(prevData.unusual_items.filter(item => item !== newItem))].filter(
          Boolean,
        ), //FILTERS EMPTY STRING
      }));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <Center mt={2}>
          <Image src={profileImage} w="8rem" h="8rem" borderRadius="100%"></Image>
        </Center>
        <ModalHeader alignSelf={'center'}>
          {firstName} {lastName}
        </ModalHeader>
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
                {/* <Center>
                  {unusualItemsArray.length === 0 ? (
                    <div>No Unusual Items</div>
                  ) : (
                    <Flex gap={3}>
                      {unusualItemsArray.map((item, index) => {
                        return (
                          <Button
                            {...register(item)}
                            onChange={e => addUnusualItem(e.target.checked, e.target.name)}
                            key={index}
                            colorScheme="gray"
                            size="md"
                          >
                            {item}
                          </Button>
                        );
                      })}
                    </Flex>
                  )}
                </Center> */}

                <Center paddingTop={'20px'}>
                  <Input
                    marginTop={5}
                    placeholder="Other"
                    alignItems={'center'}
                    {...register('other')}
                    type="text"
                  />
                </Center>
              </FormControl>
            </ModalBody>

            <Center p={8}>
              <Button type="submit" color="black" bg="#95D497" w="70%">
                Save
              </Button>
            </Center>
          </FormControl>
        </form>
      </ModalContent>
    </Modal>
  );
};

DataEntryModal.propTypes = {
  volunteerId: PropTypes.string.isRequired,
  eventId: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  profileImage: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  unusualItems: PropTypes.string.isRequired,
};

export default DataEntryModal;
