import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
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
  useToast,
  useDisclosure,
} from '@chakra-ui/react';
import { FiPaperclip } from 'react-icons/fi';
import { FaCamera } from 'react-icons/fa';
import Backend from '../../utils/utils';
import CameraModal from '../CameraModal';
import ImageTag from '../ImageTag';
import { postImage, getImageID, putListImageByID, getImagesByEventID, deleteImageByID, deleteListImageByID } from "../../utils/imageUtils"


const DataEntryModal = ({
  isOpen,
  onClose,
  id,
  firstName,
  lastName,
  volunteerId,
  numberInParty,
  eventId,
  unusualItems,
  ounces,
  pounds,
}) => {
  const volunteerData = {
    id: id,
    volunteer_id: volunteerId,
    number_in_party: numberInParty,
    pounds: pounds,
    ounces: ounces,
    unusual_items: unusualItems,
    event_id: eventId,
    is_checked_in: true,
  };
  // const [other, setOther] = useState('');
  // let [unusualItemsArray, setUnusualItemsArray] = useState([]);

  // COMMENTED OUT BECAUSE DESIGN FLAW

  // parses unusual items input - single entries come as strings, multiple entries come as strings of the form {item1, item2... itemn}
  // useEffect(() => {
  //   formatUnusualItems();
  // }, []);
  // useEffect(() => {}), [unusualItems];
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
  const toast = useToast();

  const { handleSubmit, control, getValues } = useForm(volunteerData);

  const { isOpen: cameraIsOpen, onOpen: cameraOnOpen, onClose: cameraOnClose } = useDisclosure();
  const [tags, setTags] = useState([]);
  const deletedImageIds = useRef([]);
  const uploadImages = useRef([]);


  const putDataEntry = async () => {
    try {
      const { pounds, ounces, unusual_items } = getValues();

      const dataToSend = {
        ...volunteerData,
        pounds: pounds === "" ? 0 : parseInt(pounds),
        ounces: ounces === "" ? 0 : parseInt(ounces),
        unusual_items: unusual_items === "" ? null : unusual_items,
      };
      console.log(dataToSend);

      await Backend.put(`/data/${id}`, dataToSend);
      toast({
        title: 'Data saved.',
        description: 'Data saved.',
        position: 'bottom-right',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });

      onClose();
    } catch (error) {
      console.error(error.message);
      toast({
        title: 'Error saving data.',
        description: 'There was an error saving data. Please try again.',
        status: 'error',
        position: 'bottom-right',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const uploadImage = async(imageItem) => {
    await postImage(imageItem.imageUrl);
    const image = await getImageID(imageItem.imageUrl);
    console.log('eventid', id)
    await putListImageByID(id, image.id);
  }

  const deleteImage = async (imageID) => {
      await deleteImageByID(imageID);
      await deleteListImageByID(id, imageID);
  }

  console.log('detled images', deletedImageIds)
  const noReload = (data, event) => {
    event.preventDefault();
    putDataEntry(data);
    // tags.forEach((image) => uploadImage(image));
    if (deletedImageIds.current.length != 0){
      deletedImageIds.current.forEach((imageId) => deleteImage(imageId))
      deletedImageIds.current = [];
    }
    if (uploadImages.current.length != 0) {
      uploadImages.current.forEach((image) => uploadImage(image));
    }
  };

  // COMMENTED OUT BECAUSE DESIGN FLAW

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
  // control.getFieldState('pounds').setValue(pounds);

  const updateTags = async id => await getImagesByEventID(id);
  useEffect(() => {
    updateTags(id).then((data) => setTags(data));
  }, []);

  useEffect(() => console.log(tags), [tags]);


  console.log("tags", tags.length)
  const TrashWeightInputs = ({ parentControl }) => {
    // const [inputPounds, setInputPounds] = useState('');
    // const [inputOunces, setInputOunces] = useState('');
    const [totalWeight, setTotalWeight] = useState(pounds + ounces / 16);

    const updateTotalWeightPounds = () => {
      setTotalWeight(prev => prev + parseInt(getValues().pounds));
    };

    const updateTotalWeightOunces = () => {
      setTotalWeight(prev => prev + parseInt(getValues().ounces) / 16);
    };

    // const [lastPounds, setLastPounds] = useState(0);
    // const [lastOunces, setLastOunces] = useState(0);

    // const addPoundsToTotal = () => {
    //   setTotalWeight(prevWeight => prevWeight + lastPounds);
    // };

    // const addOuncesToTotal = () => {
    //   setTotalWeight(prevWeight => prevWeight + lastOunces / 16);
    // };

    // const updateLastPounds = e => {
    //   const newPounds = parseFloat(e.target.value) || 0;
    //   setInputPounds(e.target.value); // Keep the input as string
    //   setLastPounds(newPounds); // Convert to number for calculations
    // };

    // const updateLastOunces = e => {
    //   const newOunces = parseFloat(e.target.value) || 0;
    //   setInputOunces(e.target.value); // Keep the input as string
    //   setLastOunces(newOunces); // Convert to number for calculations
    // };

    // console.log('volunteerData', volunteerData);

    return (
      <>
        <form>
          <HStack spacing={4}>
            <FormControl>
              <FormLabel htmlFor="pounds" fontSize="16px">
                Enter Pounds
              </FormLabel>
              <Controller
                name="pounds"
                control={parentControl}
                defaultValue={''}
                render={({ field }) => (
                  <InputGroup>
                    <Input
                      placeholder="e.g. 20"
                      onChange={e => field.onChange(e.target.value)}
                      value={field.value}
                      type="number"
                    />
                    <InputRightElement width="2.7rem">
                      <Button size={'md'} onClick={updateTotalWeightPounds}>
                        +
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                )}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="ounces" fontSize="16px">
                Enter Ounces
              </FormLabel>
              <Controller
                name="ounces"
                control={parentControl}
                defaultValue={''}
                render={({ field }) => (
                  <InputGroup>
                    <Input
                      placeholder="e.g. 5"
                      onChange={e => field.onChange(e.target.value)}
                      value={field.value}
                      type="number"
                    />
                    <InputRightElement width="2.7rem">
                      <Button onClick={updateTotalWeightOunces} size={'md'}>
                        +
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                )}
              />
            </FormControl>
          </HStack>
          <Flex mt={4} justifyContent="space-between" alignItems="center">
            <Text fontSize="16px">Total Trash Weight:</Text>
            <Text fontWeight="bold" fontSize="16px">
              {totalWeight.toFixed(2)} lbs
            </Text>
          </Flex>
        </form>
      </>
    );
  };

  TrashWeightInputs.propTypes = {
    parentControl: PropTypes.object.isRequired,
  };

  return (
    <>
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
              <FormLabel fontSize="18px" fontWeight="bold">
                Trash Weight
              </FormLabel>
              <TrashWeightInputs parentControl={control} />
              <FormControl>
                <FormLabel fontSize="16px" fontWeight="bold" paddingTop={'20px'}>
                  Other Information
                </FormLabel>
                <Controller
                  name="unusual_items"
                  control={control}
                  defaultValue={''}
                  render={({ field }) => (
                    <Textarea fontSize="14px" placeholder="Unusual items, etc..." {...field} />
                  )}
                />
              </FormControl>

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

              <FormLabel paddingTop="10px" fontSize="12px" fontWeight={'bold'}>
                Add Images
              </FormLabel>
              <Stack spacing={4} direction="row" align="center">
                <Button
                  borderRadius="15px"
                  leftIcon={<FiPaperclip />}
                  fontWeight="400"
                  color="#D9D9D9"
                  textColor="black"
                  fontSize="12px"
                  width="82px"
                  height="28px"
                >
                  Upload
                </Button>
                <Button
                  borderRadius="15px"
                  leftIcon={<FaCamera />}
                  fontWeight="400"
                  color="#D9D9D9"
                  textColor="black"
                  fontSize="12px"
                  width="112px"
                  height="28px"
                  onClick={cameraOnOpen}
                >
                  Take a picture
                </Button>
              </Stack>
              <Flex g={3} wrap="wrap" mt={2}>
              {
                tags && tags.map(item => <ImageTag key={item.id} image={item} eventID={eventId} setTags={setTags} deletedImages={deletedImageIds}/>)
              }
              </Flex>
            </ModalBody>
            <Center paddingBottom={7} paddingTop={5}>
              <Button
                type="submit"
                color="black"
                bg="#95D497"
                width="110px"
                height="37px"
                borderRadius="15px"
                fontSize="13px"
              >
                Save Data
              </Button>
            </Center>
          </FormControl>
        </form>
      </ModalContent>
    </Modal>
    <CameraModal isOpen={cameraIsOpen} onClose={cameraOnClose} eventID={eventId} setTags={setTags} uploadedImages={uploadImages}/>
    </>
  );
};

DataEntryModal.propTypes = {
  id: PropTypes.number.isRequired,
  volunteerId: PropTypes.string.isRequired,
  numberInParty: PropTypes.number.isRequired,
  eventId: PropTypes.number.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  profileImage: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  unusualItems: PropTypes.string.isRequired,
  ounces: PropTypes.number.isRequired,
  pounds: PropTypes.number.isRequired,
};

export default DataEntryModal;
