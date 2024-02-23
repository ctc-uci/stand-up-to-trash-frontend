import {
  Box,
  Center,
  Divider,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Stack,
  Table,
  Text,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Backend from '../utils/utils';
import { useEffect, useState } from 'react';
import EventCard from '../components/DummyEvents/EventCard';
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

  const eventCards = (
    <Grid templateColumns="repeat(3, 1fr)" gap={6}>
      {events.map(element => (
        <GridItem key={element.id}>
          <EventCard
            {...element}
            // isSelected={selectedEvents.includes(element.id)}
            // showSelect={showSelect}
            // handleCheckboxChange={handleCheckboxChange}
          />
        </GridItem>
      ))}
    </Grid>
  );

  return (
    <Box style={{ display: 'grid', gap: '22px' }} backgroundColor={'#c8e6fe'}>
      <Heading marginLeft={10} marginTop={5}>
        Overall Impact
      </Heading>
      <Flex justifyContent={'space-around'}>
        <Box>Column 1</Box>
        <Divider orientation="vertical" />
        <Box>Column 2</Box>
        <Divider orientation="vertical" />
        <Box>Column 3</Box>
      </Flex>
      <Heading marginLeft={10} marginTop={5}>
        Past Events
      </Heading>
      <Stack spacing={4} direction={"row"}>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input type="event" placeholder="Search Event Name (e.g. Festival of Whales)" />
        </InputGroup>

        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input type="tel" placeholder="Phone number" />
        </InputGroup>

        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input type="tel" placeholder="Phone number" />
        </InputGroup>
      </Stack>

      {eventCards}

      <TableContainer style={{ alignContent: 'center', display: 'flex', justifyContent: 'center' }}>
        <Table style={{ border: '2px solid #F7FAFC', borderRadius: '12px', maxWidth: '80vw' }}>
          <Thead style={{ backgroundColor: '#F7FAFC' }}>
            {/* headings */}
            <Tr>
              <Th>Event name</Th>
              <Th>Location</Th>
              <Th>Event date</Th>
            </Tr>
          </Thead>

          <Tbody>
            <Tr>
              {events.map(element => (
                <div key={element.id}>
                  <Td
                    {...element}
                    // isSelected={selectedEvents.includes(element.id)}
                    // showSelect={showSelect}
                    // handleCheckboxChange={handleCheckboxChange}
                  />
                </div>
              ))}
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ArchivedEvents;
