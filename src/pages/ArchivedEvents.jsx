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
  TableContainer,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import {
  FaArrowUp,
  FaArrowDown,
  FaMapMarkerAlt,
  FaRegCalendar,
  FaUser,
  FaLocationArrow,
} from 'react-icons/fa';
import Backend from '../utils/utils';
import { useEffect, useState } from 'react';
const ArchivedEvents = () => {
  const [events, setEvents] = useState([]);
  const getEvents = async () => {
    try {
      const eventsData = await Backend.get('/events/archiveEvents');
      setEvents(eventsData.data);
    } catch (err) {
      console.log(`Error getting events: `, err.message);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Box style={{ display: 'grid', gap: '22px' }} backgroundColor={'#c8e6fe'}>
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
      <Stack spacing={4} direction={'row'}>
        <InputGroup marginLeft={10} borderRadius={5} width={'700px'}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            size={'lg'}
            type="event"
            backgroundColor={'white'}
            placeholder="Search Event Name (e.g. Festival of Whales)"
            marginBottom={0}
          />
        </InputGroup>

        <InputGroup borderRadius={5} width={'350px'}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            backgroundColor={'white'}
            size={'lg'}
            type="location"
            placeholder="Search Location"
          />
        </InputGroup>

        <InputGroup borderRadius={5} width={'250px'}>
          <Input backgroundColor={'white'} size={'lg'} type="day" placeholder="Search Date" />
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
          <Tbody>
            {events.map(element => (
              <>
                {console.log(element)}
                <Tr key={element.id}>
                  <Td>
                    <Flex>
                      <Image
                        borderRadius="full"
                        boxSize="50px"
                        src={element.image_url}
                        alt="image"
                      ></Image>{' '}
                      <Center marginLeft={3}>{element.name}</Center>
                    </Flex>
                  </Td>
                  <Td>{element.location}</Td>

                  <Td>
                    {element.date.substring(5, 7)}/{element.date.substring(8, 10)}/
                    {element.date.substring(0, 4)}{' '}
                  </Td>
                  <Td>
                    <Button
                      borderRadius={20}
                      backgroundColor={'#30548c'}
                      color={'white'}
                      // width={20}
                      // height={10}
                      padding={1}
                      fontSize={13}
                    >
                      View Details
                    </Button>
                  </Td>
                </Tr>
              </>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ArchivedEvents;
