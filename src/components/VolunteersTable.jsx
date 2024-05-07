/* eslint-disable react/prop-types */
import {
  Text,
  Flex,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Textarea,
  Grid,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Backend from '../utils/utils';

const RenderVolunteerRow = ({ volunteer }) => {
  const { id, first_name, last_name, image_url, total } = volunteer;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [totalWeight, setTotalWeight] = useState(0);
  const [eventsArr, setEventsArr] = useState([]);
  const [email, setEmail] = useState('');
  const [imageArr, setImageArr] = useState([]);

  useEffect(() => {
    const get_event_data = async () => {
      const response = await Backend.get(`/data/volunteer/${volunteer.id}`);
      let totalPounds = 0;
      const eventResponse = await Backend.get(`/data/volunteer/${volunteer.id}/event`);
      const imageResponse = await Backend.get(`/data/images/${volunteer.id}`);
      const userResponse = await Backend.get(`/profiles/${volunteer.id}`);
      for (const { ounces, pounds } of response.data) {
        totalPounds += ounces / 16 + pounds;
      }
      setTotalWeight(totalPounds);
      setEventsArr(eventResponse.data);
      setImageArr(imageResponse.data);
      setEmail(userResponse.data.email);
    };
    get_event_data();
  }, [volunteer.id]);

  return (
    <>
      <Tr key={id} bg="#FFFFFF" fontWeight={'medium'}>
        <Td>
          <Flex maxWidth={{ base: '200px', md: '300px', lg: '300px', xl: '300px' }}>
            <Image src={image_url} boxSize="4rem" borderRadius="full" objectFit={'cover'} />
            <Flex direction="column" ml={3} mt={4} g={1} maxW="75%">
              <Text color={'#2D3748'} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                {first_name} {last_name}
              </Text>
            </Flex>
          </Flex>
        </Td>
        <Td>
          <Flex>
            <Text fontWeight="550" mt={2}>
              {total}
            </Text>
          </Flex>
        </Td>
        <Td>
          <Flex>
            <Button
              color="#0075FF"
              variant="outline"
              borderWidth="2px"
              borderColor="#0075FF"
              onClick={onOpen}
            >
              View
            </Button>
          </Flex>
        </Td>
      </Tr>

      {/* VolunteerModal */}
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={10}>
            <Flex flexDir="column" alignItems="center">
              <Image
                src={image_url}
                boxSize="4rem"
                borderRadius="full"
                objectFit={'cover'}
                mb={1}
              />
              <Text fontSize="lg" fontWeight="bold">
                {volunteer.first_name} {volunteer.last_name}
              </Text>
              <Text fontSize="sm" fontWeight="light">
                {email}
              </Text>
            </Flex>
            <Flex mt={5} flexDir="column" gap={2}>
              <Text fontWeight="bold" fontSize="sm">
                Total trash: {totalWeight}
              </Text>
              <Text fontWeight="bold" fontSize="sm">
                Events attended:{' '}
                {eventsArr.map((eventName, index) => (
                  <span key={index} style={{ fontWeight: 'normal' }}>
                    <span style={{ textDecoration: 'underline' }}>{eventName}</span>
                    {index === eventsArr.length - 1 ? '' : ', '}
                  </span>
                ))}
              </Text>
              <Text fontWeight="bold" fontSize="sm">
                Other information{' '}
              </Text>
              <Textarea placeholder="Notes..." fontSize="sm" isDisabled />
              <Text fontSize="sm">Unusual Items </Text>
              <Grid templateColumns="repeat(3, 1fr)" gap={3}>
                {imageArr?.map((imageUrl, index) => (
                  <Image key={index} src={imageUrl} alt={`Image ${index}`} borderRadius={5} />
                ))}
              </Grid>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" minW="100%" onClick={onClose}>
              Close Profile
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const VolunteersTable = ({ volunteers }) => {
  return (
    <TableContainer border={'2px solid #E2E8F0'} borderRadius={'15px'}>
      <Table mb={5} colorScheme="gray">
        <Thead bg="#F7FAFC">
          <Tr fontWeight={'medium'}>
            <Th w="30%">
              <Flex gap={2}>
                <Text color="#2D3748" fontWeight="650">
                  Attendee
                </Text>
              </Flex>
            </Th>
            <Th w="50%">
              <Flex gap={2}>
                <Text color="#2D3748" fontWeight="650">
                  Events Attended
                </Text>
              </Flex>
            </Th>
            <Th w="30%"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {volunteers.map(volunteer => (
            <RenderVolunteerRow key={volunteer.id} volunteer={volunteer} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default VolunteersTable;
