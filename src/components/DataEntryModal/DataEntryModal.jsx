import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import './DataEntryModal.css';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  HStack,
  InputGroup,
  InputRightElement,
  Flex,
  Text,
  useToast,
  useDisclosure,
  Image,
  Tag,
  TagLabel,
} from '@chakra-ui/react';
import { FaCamera } from 'react-icons/fa6';
import Backend from '../../utils/utils';
import CameraModal from '../CameraModal';
import ImageTag from '../ImageTag';
import { IoMdPerson } from 'react-icons/io';
import TrashCard from './TrashCard';
import { MdAdd } from 'react-icons/md';

import {
  postImage,
  getImageID,
  putListImageByID,
  getImagesByEventID,
  deleteImageByID,
  deleteListImageByID,
} from '../../utils/imageUtils';

const DataEntryModal = ({
  isOpen,
  onClose,
  id,
  firstName,
  lastName,
  volunteerId,
  numberInParty,
  eventId,
  ounces,
  pounds,
  image_url,
  notes,
  trashBags,
}) => {
  const volunteerData = {
    id: id,
    volunteer_id: volunteerId,
    number_in_party: numberInParty,
    pounds: pounds,
    ounces: ounces,
    event_id: eventId,
    notes: notes,
    is_checked_in: true,
  };

  const toast = useToast();

  const { getValues } = useForm(volunteerData);

  const { isOpen: cameraIsOpen, onOpen: cameraOnOpen, onClose: cameraOnClose } = useDisclosure();
  const [tags, setTags] = useState([]);
  const deletedImageIds = useRef([]);
  const uploadImages = useRef([]);
  const [currentTrash, setCurrentTrash] = useState(trashBags);
  const [trashWeight, setTrashWeight] = useState(0);
  const [inputIsOn, setInputIsOn] = useState(false);
  const [currentNotes, setCurrentNotes] = useState(notes);

  const putDataEntry = async () => {
    try {
      const dataToSend = {
        ...volunteerData,
        pounds:
          currentTrash.length > 0 ? currentTrash.reduce((total, pounds) => total + pounds, 0) : 0,
        notes: currentNotes === '' ? null : currentNotes,
      };

      const trashBagsToSend = {
        trashBags: currentTrash,
      };
      console.log(trashBagsToSend);

      await Backend.put(`/trashbags/${id}`, trashBagsToSend);
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
      window.location.reload();
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

  const uploadImage = async imageItem => {
    await postImage(imageItem.name, imageItem.s3_url);
    const image = await getImageID(imageItem.s3_url);
    await putListImageByID(id, image.id);
  };

  const deleteImage = async imageID => {
    await deleteImageByID(imageID);
    await deleteListImageByID(id, imageID);
  };

  const noReload = event => {
    // console.log(`deletedImageIds`, deletedImageIds);
    // console.log(`uploadImages`, uploadImages);
    event.preventDefault();
    putDataEntry();
    // tags.forEach((image) => uploadImage(image));
    if (deletedImageIds.current.length != 0) {
      deletedImageIds.current.forEach(imageId => deleteImage(imageId));
      deletedImageIds.current = [];
    }
    if (uploadImages.current.length != 0) {
      // Problem is that this is currently always set to whatever is there so it will always get added
      uploadImages.current.forEach(image => uploadImage(image));
      uploadImages.current = [];
    }
  };

  const updateTags = async id => await getImagesByEventID(id);
  useEffect(() => {
    updateTags(id).then(data => setTags(data));
  }, [id]);

  const TrashWeightInputs = ({ parentControl }) => {
    const [totalWeight, setTotalWeight] = useState(pounds + ounces / 16);

    const updateTotalWeightPounds = () => {
      setTotalWeight(prev => prev + parseInt(getValues().pounds));
    };

    const updateTotalWeightOunces = () => {
      setTotalWeight(prev => prev + parseInt(getValues().ounces) / 16);
    };

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

  const handleTrashInput = () => {
    setCurrentTrash(prev => [...prev, trashWeight]);
    setInputIsOn(false);

    // no reload contains all the methods to put the data into the database
    if (currentTrash.length === 1000000000) {
      noReload();
    }
  };

  const currentTrashCards = currentTrash.map((pounds, index) => {
    return (
      <>
        <TrashCard
          pounds={pounds}
          setCurrentTrash={setCurrentTrash}
          currentTrash={currentTrash}
          id={index}
        />
      </>
    );
  });

  const addVolunteerBox = (
    <Flex
      border="3.5px dashed #BABABA"
      backgroundColor={'#EFEFEF'}
      h={'5em'}
      justify={'center'}
      align={'center'}
      mt="1em"
      cursor={'pointer'}
      onClick={() => setInputIsOn(true)}
    >
      <MdAdd size={'1.3em'} color={'#717171'} />
      <Text as="b" color={'#717171'}>
        Add a volunteer
      </Text>
    </Flex>
  );

  const trashInput = (
    <Flex gap={'1em'} mt={'1em'}>
      <InputGroup>
        <Input
          placeholder="ex: 18"
          w={'16em'}
          border={'3px solid'}
          borderColor={'#EFEFEF'}
          borderRadius={'lg'}
          paddingRight={'7em'}
          boxSizing={'border-box'}
          onChange={e => {
            setTrashWeight(parseInt(e.target.value));
          }}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleTrashInput();
            }
          }}
          type="number"
        />
        <InputRightElement w={'6em'} marginRight={'0.5em'} as={'b'}>
          Pounds (lb)
        </InputRightElement>
      </InputGroup>
      <Button backgroundColor={'#0075FF'} color={'white'} w={'6em'} onClick={handleTrashInput}>
        Enter
      </Button>
    </Flex>
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          borderRadius="30px"
          // h={'80vh'}
          maxH={'80vh'}
          // overflow={'hidden'}
          overflowY={'scroll'}
        >
          <ModalCloseButton borderRadius={100} backgroundColor={'#EFEFEF'} />
          <ModalBody paddingLeft={'2em'} paddingRight={'2em'}>
            <ModalHeader padding={0}>
              <ModalHeader
                fontSize={'16px'}
                justify={'center'}
                align={'center'}
                fontWeight={'700'}
                lineHeight={'29.05px'}
                marginBottom={'-2em'}
                color={'gray'}
              >
                Trash weights
              </ModalHeader>
              <ModalHeader
                fontSize={'24px'}
                justify={'center'}
                align={'center'}
                fontWeight={'700'}
                lineHeight={'29.05px'}
              >
                Add trash weights
              </ModalHeader>
            </ModalHeader>
            {/* postVolunteerData(10, 5, 5, 5, 10, 10) */}
            <Flex
              backgroundColor={'#EFEFEF'}
              w={'100%'}
              h={'5em'}
              align={'center'}
              paddingLeft={'1em'}
              borderRadius={'10px'}
              marginBottom={'1em'}
            >
              <Image src={image_url} w={'3em'} h={'3em'} />
              <Flex flexDir={'column'} marginLeft={'1em'}>
                <Text fontSize={'18px'} fontWeight={'600'} color={'#2D3748'} marginBottom={'0.1em'}>
                  {firstName} {lastName}
                </Text>
                <Tag backgroundColor="white" size={'sm'} w={'8em'}>
                  <IoMdPerson color="green" />
                  <TagLabel marginLeft={'0.5em'} fontSize={'12px'}>
                    Individual
                  </TagLabel>
                </Tag>
              </Flex>
            </Flex>

            <Flex
              border="3px solid"
              borderColor="#EFEFEF"
              padding={'1em'}
              borderRadius="lg"
              flexDir={'column'}
              marginBottom={'1em'}
            >
              <FormLabel fontSize="17px" fontWeight="bold">
                Trash Weight
              </FormLabel>

              {currentTrash.length < 1 ? trashInput : currentTrashCards}
              {currentTrash.length > 0 ? (inputIsOn ? trashInput : addVolunteerBox) : null}
            </Flex>

            <Flex flexDir={'column'} marginBottom={'1em'}>
              <Text as={'b'}>Add Notes</Text>
              <Textarea
                placeholder="We found a cactus under the sea!"
                border="3px solid"
                borderColor="#EFEFEF"
                minH={'8em'}
                color={'#717171'}
                value={currentNotes}
                onChange={e => setCurrentNotes(e.target.value)}
              />
            </Flex>

            <Flex flexDir={'column'} gap={'0.5em'}>
              <Text as="b" fontSize={19}>
                Add images
              </Text>
              <Flex gap={'1em'}>
                <Flex
                  border="3.5px dashed #BABABA"
                  w={'7.3em'}
                  h={'7.3em'}
                  backgroundColor={'#EFEFEF'}
                  borderRadius={'lg'}
                  justify={'center'}
                  align={'center'}
                  cursor={'pointer'}
                  onClick={cameraOnOpen}
                >
                  <FaCamera size={'1.5em'} color="#717171" />
                </Flex>
                {tags &&
                  tags.map(item => (
                    <ImageTag
                      key={item.id}
                      image={item}
                      eventID={eventId}
                      setTags={setTags}
                      deletedImages={deletedImageIds}
                      uploadImages={uploadImages}
                    />
                  ))}
              </Flex>
            </Flex>
          </ModalBody>
          <ModalFooter
            borderTop={'2px solid #EFEFEF'}
            alignItems={'center'}
            justifyContent={'center'}
            position={'sticky'}
            bottom={'0'}
            backgroundColor={'white'}
            zIndex={2}
          >
            <Button
              w={'20em'}
              backgroundColor={'#0075FF'}
              color={'white'}
              isDisabled={currentTrash.length < 1}
              onClick={noReload}
            >
              Save Data
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <CameraModal
        isOpen={cameraIsOpen}
        onClose={cameraOnClose}
        setTags={setTags}
        uploadedImages={uploadImages}
      />
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
  image_url: PropTypes.string.isRequired,
  notes: PropTypes.string.isRequired,
  trashBags: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default DataEntryModal;
