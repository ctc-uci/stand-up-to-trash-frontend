import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Textarea,
  ChakraProvider,
  extendTheme,
  useToast,
  Spinner,
  Box,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Dropzone from '../Dropzone.tsx';
import { theme } from '../Icons/EventsModalIcons.jsx';
import { putEvent } from '../../utils/eventsUtils.js';
import PropTypes from 'prop-types';
import { format, parseISO } from 'date-fns';
import React from 'react';

const EditEventsModal = ({ event, isOpen, onClose }) => {
  const [eventData, setEventData] = useState(event);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const toastIdRef = React.useRef();

  useEffect(() => {
    if (isOpen) {
      setEventData(event);
    }
  }, [isOpen, event]);

  const handleSubmit = async () => {
    try {
      toastIdRef.current = toast({
        title: 'Editing Event.',
        description: 'Loading...',
        status: 'loading',
        position: 'bottom-right',
        isClosable: true,
      });

      const response = await putEvent(eventData);
      console.log(response);
      toast.close(toastIdRef.current);
      toast({
        title: 'Event Edited.',
        description: 'Beach Cleanup Edited.',
        status: 'success',
        position: 'bottom-right',
        duration: 9000,
        isClosable: true,
      });
      onClose();
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast({
        title: 'Something Went Wrong.',
        description: 'No Event Edited.',
        status: 'error',
        position: 'bottom-right',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const handleCancel = () => {
    onClose();
    setEventData(event);
  };

  const handleInputChange = (field, value) => {
    setEventData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const formatTime = time => {
    return time ? time.substring(0, 5) : '';
  };

  const formatDate = date => {
    if (!date) return '';
    return format(parseISO(date), 'yyyy-MM-dd');
  };

  return (
    <ChakraProvider theme={extendTheme(theme)}>
      <Modal isOpen={isOpen} onClose={handleCancel}>
        <ModalOverlay />
        <ModalContent
          minW={'40%'}
          borderRadius={'30px'}
          boxShadow={'0px 6.9760003089904785px 6.9760003089904785px 0px #00000080'}
        >
          <ModalHeader>
            <ModalHeader
              fontSize={'16px'}
              justify={'center'}
              align={'center'}
              fontWeight={'700'}
              lineHeight={'29.05px'}
              marginBottom={'-25px'}
              color={'gray'}
            >
              Edit event
            </ModalHeader>
            <ModalHeader
              fontSize={'24px'}
              justify={'center'}
              align={'center'}
              fontWeight={'700'}
              lineHeight={'29.05px'}
              marginBottom={'-25px'}
            >
              Edit an event
            </ModalHeader>
          </ModalHeader>

          <ModalBody>
            <FormControl>
              <Flex flexDir={'column'} align={'center'} justify={'center'}>
                {isLoading ? (
                  <Spinner />
                ) : (
                  <Box
                    border="5px dashed gray"
                    borderRadius="33"
                    alignItems="center"
                    justifyContent="center"
                    _hover={{
                      bg: 'gray.100',
                      cursor: 'pointer',
                    }}
                  >
                    <Dropzone setData={setEventData} data={eventData} setIsLoading={setIsLoading} />
                  </Box>
                )}
              </Flex>

              <FormLabel
                paddingTop={'10px'}
                fontWeight={'700'}
                fontSize={'12px'}
                mt={4}
                color={'gray'}
              >
                Event Name
              </FormLabel>
              <Input
                type="text"
                placeholder="Beach Cleanup"
                value={eventData?.name || ''}
                onChange={e => handleInputChange('name', e.target.value)}
              />
              <FormLabel
                paddingTop={'10px'}
                fontWeight={'700'}
                fontSize={'12px'}
                mt={1}
                color={'gray'}
              >
                Location
              </FormLabel>
              <Input
                type="text"
                placeholder="34199 Selva Rd. Irvine, CA 92629"
                value={eventData?.location || ''}
                onChange={e => handleInputChange('location', e.target.value)}
              />
              <FormControl mt={4}>
                <Box border="1px solid" borderColor="gray.200" p={4} borderRadius="lg">
                  <FormLabel fontWeight={'700'} fontSize={'18px'} mb={2}>
                    Date and time
                  </FormLabel>
                  <Flex flexDirection="column" gap={4}>
                    <Box>
                      <FormLabel fontSize={'14px'} mb={1}>
                        Date
                      </FormLabel>
                      <Input
                        id="date"
                        type="date"
                        size="lg"
                        borderRadius="8px"
                        value={formatDate(eventData?.date)}
                        onChange={e => handleInputChange('date', e.target.value)}
                      />
                    </Box>

                    {/* Time inputs row */}
                    <Flex justifyContent="space-between" gap={4}>
                      <Box flex="1">
                        <FormLabel fontSize={'14px'} mb={1}>
                          From
                        </FormLabel>
                        <Input
                          id="time-from"
                          type="time"
                          size="lg"
                          borderRadius="8px"
                          value={formatTime(eventData?.start_time)}
                          onChange={e => handleInputChange('start_time', e.target.value)}
                        />
                      </Box>
                      <Box flex="1">
                        <FormLabel fontSize={'14px'} mb={1}>
                          To
                        </FormLabel>
                        <Input
                          id="time-to"
                          type="time"
                          size="lg"
                          borderRadius="8px"
                          value={formatTime(eventData?.end_time)}
                          onChange={e => handleInputChange('end_time', e.target.value)}
                        />
                      </Box>
                    </Flex>
                  </Flex>
                </Box>
              </FormControl>

              <FormLabel paddingTop={'10px'} fontWeight={'700'} fontSize={'12px'} color={'gray'}>
                Event Description
              </FormLabel>
              <Textarea
                type="text"
                placeholder="Enter details of the event here..."
                height={'109px'}
                value={eventData?.description || ''}
                onChange={e => handleInputChange('description', e.target.value)}
              />
              <FormLabel paddingTop={'10px'} fontWeight={'700'} fontSize={'12px'}>
                Waiver
              </FormLabel>
              <Textarea
                type="text"
                placeholder="Enter waiver here..."
                height={'109px'}
                value={eventData?.waiver || ''}
                onChange={e => handleInputChange('waiver', e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter justifyContent={'flex-end'}>
            <Button onClick={handleCancel} borderRadius={'5px'} marginRight={'10px'} paddingX={10}>
              Cancel
            </Button>
            <Button
              backgroundColor={'#587df7'}
              borderRadius={'5px'}
              marginLeft={'10px'}
              paddingX={5}
              color={'white'}
              onClick={handleSubmit}
            >
              Edit Event
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

EditEventsModal.propTypes = {
  event: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditEventsModal;
