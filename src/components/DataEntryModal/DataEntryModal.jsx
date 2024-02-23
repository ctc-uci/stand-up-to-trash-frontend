import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import { useForm } from 'react-hook-form';
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
  useNumberInput,
  HStack,
  InputGroup,
  InputRightElement,
  Flex,
  Text,
} from '@chakra-ui/react';
// import Backend from '../../utils/utils'; // Ensure this path is correct

const DataEntryModal = ({
  isOpen,
  onClose,
  unusualItems,
}) => {
  // const [volunteerData, setVolunteerData] = useState({
  //   volunteer_id: volunteerId,
  //   number_in_party: 0,
  //   pounds: 0,
  //   ounces: 0,
  //   unusual_items: [],
  //   event_id: eventId,
  //   is_checked_in: false,
  // });
  // const [other, setOther] = useState('');
  // const other = '';
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

  // const { register, handleSubmit } = useForm(volunteerData);

  // const postVolunteerData = async formData => {
  //   try {
  //     const dataToSend = {
  //       ...volunteerData,
  //       pounds: formData.pounds,
  //       ounces: formData.ounces,
  //       unusual_items: formData.other,
  //     };
  //     await Backend.post('/data', dataToSend);
  //     onClose();
  //   } catch (error) {
  //     console.error('Error creating new volunteer:', error.message);
  //   }
  // };

  // const noReload = (data, event) => {
  //   event.preventDefault();
  //   addUnusualItem(true, other);
  //   postVolunteerData(data);
  // };

  // const addUnusualItem = (isChecked, newItem) => {
  //   if (isChecked && newItem.trim() !== '') {
  //     setVolunteerData(prevData => ({
  //       ...prevData,
  //       unusual_items: [...new Set([...prevData.unusual_items, newItem, other])].filter(Boolean), //FILTERS EMPTY STRING
  //     }));
  //   } else {
  //     setVolunteerData(prevData => ({
  //       ...prevData,
  //       unusual_items: [...new Set(prevData.unusual_items.filter(item => item !== newItem))].filter(
  //         Boolean,
  //       ), //FILTERS EMPTY STRING
  //     }));
  //   }
  // };

  const TrashWeightInputs = () => {
    const [pounds, setPounds] = useState(0);
    const [ounces, setOunces] = useState(0);

    const poundsProps = useNumberInput({
      step: 0.01,
      precision: 2,
      min: 0,
      onChange: (valueAsString, valueAsNumber) => setPounds(valueAsNumber),
    });

    const ouncesProps = useNumberInput({
      step: 0.01,
      precision: 2,
      min: 0,
      onChange: (valueAsString, valueAsNumber) => setOunces(valueAsNumber),
    });

    const poundsInc = poundsProps.getIncrementButtonProps();
    const poundsInput = poundsProps.getInputProps({ name: 'pounds' });

    const ouncesInc = ouncesProps.getIncrementButtonProps();
    const ouncesInput = ouncesProps.getInputProps({ name: 'ounces' });

    return (
      <Flex flexDir={'column'}>
        <Flex>
          <Text as={'b'} fontSize={'1.1rem'} mb={'0.5rem'}>
            Trash Weight
          </Text>
        </Flex>
        <HStack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="pounds" fontWeight={400}>
              Enter Pounds
            </FormLabel>
            <InputGroup>
              <Input {...poundsInput} placeholder="e.g. 20" />
              <InputRightElement width="2.7rem">
                <Button {...poundsInc} size={'md'} backgroundColor={'#C8E6FF'}>
                  +
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="ounces" fontWeight={400}>
              Enter Ounces
            </FormLabel>
            <InputGroup>
              <Input {...ouncesInput} placeholder="e.g. 5" />
              <InputRightElement width="2.7rem">
                <Button {...ouncesInc} backgroundColor={'#C8E6FF'}>
                  +
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </HStack>
        <Flex mt={4} justifyContent="space-between" alignItems="center">
          <Text>Total Trash Weight:</Text>
          <Text as={'b'}>{(pounds + ounces / 16).toFixed(2)} lbs</Text>
        </Flex>
      </Flex>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent borderRadius={25}>
        <ModalCloseButton />

        {/* <Center mt={2}>
          <Image src={profileImage} w="8rem" h="8rem" borderRadius="100%"></Image>
        </Center> */}
        <ModalHeader alignSelf={'center'} fontSize={'1.5rem'} fontWeight={700}>
          Jeremy Hopkins{/* {firstName} {lastName} */}
        </ModalHeader>
        {/* postVolunteerData(10, 5, 5, 5, 10, 10) */}
        <ModalBody paddingLeft={'2.5rem'} paddingRight={'2.5rem'} paddingTop={0}>
          {/* <Center>
                <Button>Go to Profile</Button>
              </Center> */}
          <TrashWeightInputs />

          <FormControl>
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
