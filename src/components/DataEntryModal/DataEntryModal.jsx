import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
  FormLabel,
  Input,
  Center,
  Textarea,
  HStack,
  InputGroup,
  InputRightElement,
  Flex,
  Text,
  Stack,
} from '@chakra-ui/react';
import Backend from '../../utils/utils';
import { FiPaperclip } from "react-icons/fi";
import { FaCamera } from "react-icons/fa";


const DataEntryModal = ({
  isOpen,
  onClose,
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

  //   const { register, handleSubmit } = useForm(volunteerData);

  const { handleSubmit } = useForm(volunteerData);

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

  const TrashWeightInputs = () => {
    const [inputPounds, setInputPounds] = useState('');
    const [inputOunces, setInputOunces] = useState('');
    const [totalWeight, setTotalWeight] = useState(0);
  
    const [lastPounds, setLastPounds] = useState(0);
    const [lastOunces, setLastOunces] = useState(0);
  
    const addPoundsToTotal = () => {
      setTotalWeight((prevWeight) => prevWeight + lastPounds);
    };
  
    const addOuncesToTotal = () => {
      setTotalWeight((prevWeight) => prevWeight + lastOunces / 16);
    };
  
    const updateLastPounds = (e) => {
      const newPounds = parseFloat(e.target.value) || 0;
      setInputPounds(e.target.value); // Keep the input as string
      setLastPounds(newPounds); // Convert to number for calculations
    };
  
    const updateLastOunces = (e) => {
      const newOunces = parseFloat(e.target.value) || 0;
      setInputOunces(e.target.value); // Keep the input as string
      setLastOunces(newOunces); // Convert to number for calculations
    }
  
    return (
      <>
        <HStack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="pounds" fontSize="16px">Enter Pounds</FormLabel>
            <InputGroup>
              <Input
                placeholder="e.g. 20"
                onChange={updateLastPounds}
                value={inputPounds}
                name="pounds"
                type="number"
              />
              <InputRightElement width="2.7rem">
                <Button onClick={addPoundsToTotal} size={'md'}>
                  +
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="ounces" fontSize="16px">Enter Ounces</FormLabel>
            <InputGroup>
              <Input
                placeholder="e.g. 5"
                onChange={updateLastOunces}
                value={inputOunces}
                name="ounces"
                type="number"
              />
              <InputRightElement width="2.7rem">
                <Button onClick={addOuncesToTotal}>
                  +
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </HStack>
        <Flex mt={4} justifyContent="space-between" alignItems="center">
          <Text fontSize="16px">Total Trash Weight:</Text>
          <Text fontWeight="bold" fontSize="16px">{totalWeight.toFixed(2)} lbs</Text>
        </Flex>
      </>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius="30px">
        <ModalCloseButton />
        <ModalHeader fontSize="24px" alignSelf={'center'}>
          {firstName} {lastName}
        </ModalHeader>
        {/* postVolunteerData(10, 5, 5, 5, 10, 10) */}
        <form onSubmit={handleSubmit(noReload)}>
          <FormControl>
            <ModalBody>
              <FormLabel fontSize="18px" fontWeight="bold">Trash Weight</FormLabel>{' '}
              <TrashWeightInputs />

              <FormControl>
                  <FormLabel fontSize="16px" fontWeight="bold" paddingTop={'20px'}>Other Information</FormLabel>{' '}

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

                <Center>
                <Textarea fontSize="14px" placeholder='Unusual items, etc...' />
                </Center>
              </FormControl>
              <FormLabel paddingTop="10px" fontSize="12px" fontWeight={'bold'}>Add Images</FormLabel>
              <Stack  spacing={4} direction='row' align='center'>
              <Button borderRadius="15px" leftIcon={<FiPaperclip />} fontWeight="400" color='#D9D9D9' textColor="black" fontSize="12px" width="82px" height="28px">
                Upload
              </Button>
              <Button borderRadius="15px" leftIcon={<FaCamera />}fontWeight="400" color='#D9D9D9' textColor="black" fontSize="12px" width="112px" height="28px">
                Take a picture
              </Button>
              </Stack>
            </ModalBody>

            <Center paddingBottom={7} paddingTop={5}>
              <Button type="submit" color="black" bg="#95D497" width="110px" height="37px" borderRadius="15px" fontSize="13px">
                Save Data
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
