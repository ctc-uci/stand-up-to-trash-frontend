import {
  Box,
  Button,
  Center,
  Divider,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  Heading,
  Stack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  TableContainer,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { FaArrowUp, FaArrowDown, FaMapMarkerAlt, FaRegCalendar, FaUser } from 'react-icons/fa';
import Backend from '../utils/utils';
import { useEffect, useState } from 'react';
import Fuse from 'fuse.js';

const ArchivedEvents = () => {
  const [events, setEvents] = useState([]);
  const [originalEvents, setOriginalEvents] = useState([]);

  const [inputLocation, setInputLocation] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [inputEvent, setInputEvent] = useState('');

  useEffect(() => {
    // If input is empty, display all volunteers, else conduct the search
    if (inputEvent.trim() === '') {
      setEvents(originalEvents);
    } else {
      const options = {
        keys: ['name'],
      };
      const fuse = new Fuse(events, options);
      const searchResult = fuse.search(inputEvent);
      const reduceResult = searchResult.map(result => result.item);
      setEvents(reduceResult);
    }
  }, [inputEvent]);


  useEffect(() => {
    // If input is empty, display all volunteers, else conduct the search
    if (inputLocation.trim() === '') {
      setEvents(originalEvents);
    } else {
      const options = {
        keys: ['location'],
      };
      const fuse = new Fuse(events, options);
      const searchResult = fuse.search(inputLocation);
      const reduceResult = searchResult.map(result => result.item);

      setEvents(reduceResult);
    }
  }, [inputLocation]);

  useEffect(() => {
    // If input is empty, display all volunteers, else conduct the search
    if (inputDate.trim() === '') {
      setEvents(originalEvents);
    } else {
      const options = {
        keys: ['date'],
      };
      const fuse = new Fuse(events, options);
      const searchResult = fuse.search(inputDate);
      const reduceResult = searchResult.map(result => result.item);
      setEvents(reduceResult);
    }
  }, [inputDate]);

  const getEvents = async () => {
    try {
      const eventsData = await Backend.get('/events/archiveEvents');
      setEvents(eventsData.data);
      setOriginalEvents(eventsData.data);
    } catch (err) {
      console.log(`Error getting events: `, err.message);
    }
  };

  const eventRows = events.map(event => (
    <>
      <Tr key={event.id}>
        <Td>
          <Flex>
            <Image borderRadius="full" boxSize="50px" src={event.image_url} alt="image"></Image>{' '}
            <Center marginLeft={3} fontWeight={'500'}>
              <Text fontWeight={'500'} fontSize={'lg'}>
                {event.name}
              </Text>
            </Center>
          </Flex>
        </Td>
        <Td>
          <Text fontWeight={'400'} fontSize={'lg'}>
            {event.location}
          </Text>
        </Td>

        <Td>
          <Text fontWeight={'400'} fontSize={'lg'}>
            {event.date.substring(5, 7)}/{event.date.substring(8, 10)}/{event.date.substring(0, 4)}
          </Text>
        </Td>
        <Td>
          <Button
            borderRadius={20}
            backgroundColor={'#30548c'}
            color={'white'}
            // width={20}
            // height={10}
            px={3}
            fontSize={'sm'}
          >
            View Details
          </Button>
        </Td>
      </Tr>
    </>
  ));

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Box ml="15rem" style={{ display: 'grid', gap: '22px' }} backgroundColor={'#c8e6fe'}>
      {/* Overall Imapct Card */}
      <Heading marginLeft={10} marginTop={5}>
        Overall Impact
      </Heading>
      <Flex
        justifyContent={'space-around'}
        backgroundColor={'white'}
        marginLeft={10}
        marginRight={10}
        borderRadius={10}
        paddingTop={10}
        paddingBottom={10}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          Column 1
        </Box>
        <Divider orientation="vertical" />
        <Box display="flex" justifyContent="center" alignItems="center">
          Column 2
        </Box>
        <Divider orientation="vertical" />
        <Box display="flex" justifyContent="center" alignItems="center">
          Column 3
        </Box>
      </Flex>

      {/* Past Events Search Bar */}
      <Heading marginLeft={10} marginTop={5}>
        Past Events
      </Heading>
      <Stack spacing={4} direction={'row'} mr={10}>
        <InputGroup marginLeft={10} borderRadius={5} width={'37%'}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            size={'lg'}
            type="event"
            backgroundColor={'white'}
            placeholder="Search Event Name (e.g. Festival of Whales)"
            marginBottom={0}
            onChange={e => setInputEvent(e.target.value)}
          />
        </InputGroup>

        <InputGroup borderRadius={5} width={'30%'}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            backgroundColor={'white'}
            size={'lg'}
            type="location"
            placeholder="Search Location"
            onChange={e => setInputLocation(e.target.value)}
          />
        </InputGroup>

        <InputGroup borderRadius={5} width={'20%'}>
          <Input
            backgroundColor={'white'}
            size={'lg'}
            type="day"
            placeholder="Search Date"
            onChange={e => setInputDate(e.target.value)}
          />
        </InputGroup>

        <Box
          backgroundColor={'#30548c'}
          width={'50px'}
          height={'50px'}
          borderRadius={10}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <SearchIcon size="lg" color={'white'}></SearchIcon>
        </Box>
      </Stack>

      {/* Events Display */}
      <TableContainer
        borderRadius={10}
        style={{ alignContent: 'center', display: 'flex', justifyContent: 'center' }}
      >
        <Table
          backgroundColor={'white'}
          border="2px solid #F7FAFC"
          borderRadius={10}
          marginLeft={10}
          marginRight={10}
          marginBottom={10}
        >
          <Thead style={{ backgroundColor: '#F7FAFC' }}>
            {/* headings */}
            <Tr>
              <Th>
                <Flex>
                  <FaUser />
                  <Box marginLeft={2}>Event name</Box>
                </Flex>
              </Th>
              <Th>
                <Flex>
                  <FaMapMarkerAlt />
                  <Box marginLeft={2} marginRight={2}>
                    Location
                  </Box>
                  <FaArrowDown />
                </Flex>
              </Th>
              <Th>
                <Flex>
                  <FaRegCalendar />
                  <Box marginLeft={2} marginRight={2}>
                    Event date
                  </Box>
                  <FaArrowUp />
                </Flex>
              </Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>{eventRows}</Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ArchivedEvents;
