import {
  Box,
  Grid,
  GridItem,
  Spacer,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Heading,
  Flex,
} from '@chakra-ui/react';
import { useEffect, useState, useContext } from 'react';
import { SearchIcon, HamburgerIcon } from '@chakra-ui/icons';

import EventCard from '../components/Events/EventCard';
import VolunteerImpactSummary from '../components/Events/VolunteerImpactSummary';
import Backend from '../utils/utils';
import Fuse from 'fuse.js';
import NavbarContext from '../utils/NavbarContext';

const VolunteerHomePage = () => {
  const [events, setEvents] = useState([]);
  const [displayEvents, setDisplayEvents] = useState([]);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [fuse, setFuse] = useState();

  const { onNavbarDrawerOpen } = useContext(NavbarContext);

  const getEvents = async () => {
    try {
      const eventsData = await Backend.get('/events');
      setEvents(eventsData.data);
      const options = { keys: ['name', 'date', 'location'], includeScore: true };
      setFuse(new Fuse(eventsData.data, options));
    } catch (err) {
      console.log(`Error getting events: `, err.message);
    }
  };

  const eventCards = displayEvents.map(element => (
    <GridItem key={element.id}>
      <EventCard {...element} getEvents={getEvents} />
    </GridItem>
  ));

  useEffect(() => {
    getEvents();
  }, []);

  useEffect(() => {
    if (!fuse) {
      return;
    }
    let ands = [];
    if (name) ands.push({ name: name });
    if (location) ands.push({ location: location });
    if (date) ands.push({ date: date });

    let result;
    if (ands.length > 0) {
      const fuseResult = fuse.search({ $and: ands });
      // If we want to filter by score:
      // result = fuseResult.filter(item => item.score <= 0.5).map(item => item.item);
      result = fuseResult.map(item => item.item);
    } else result = events;
    setDisplayEvents(result);
  }, [name, location, date, fuse]);

  return (
    <Flex
      flexDir={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      bg="#E6EAEF"
      minH="100vh"
      ml={{ base: '0', xl: '15rem' }}
      py={10}
    >
      <Flex w={'95%'} flexDir={'column'}>
        <Flex alignItems={'center'} mb="8" gap={4}>
          <HamburgerIcon
            color={'#717171'}
            boxSize={16}
            display={{ base: 'flex', xl: 'none' }}
            onClick={onNavbarDrawerOpen}
          />
          <Heading fontFamily={'Avenir'} fontSize={'36px'} fontWeight={800}>
            Impact Summary
          </Heading>
        </Flex>

        <VolunteerImpactSummary />
      </Flex>

      <Flex justifyContent={'center'} flexDir={'column'} w={'95%'}>
        <Box justifyContent="space-between">
          <Flex flexDir={'column'} backgroundColor={'#F8F8F8'} p={8} borderRadius={'lg'} gap={8}>
            <Heading w={'full'} fontFamily={'Avenir'} fontSize={'36px'} fontWeight={800}>
              Upcoming Events
            </Heading>
            <Box display="flex" flex-direction="row" justifyContent="space-between">
              <HStack width={'100%'}>
                <InputGroup w="60%">
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon />
                  </InputLeftElement>
                  <Input
                    bg={'white'}
                    value={name}
                    onChange={event => {
                      setName(event.target.value);
                    }}
                    placeholder='Search Event Name (e.g. "Festival of Whales")'
                  />
                </InputGroup>
                <InputGroup w="20%">
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon />
                  </InputLeftElement>
                  <Input
                    bg={'white'}
                    value={location}
                    onChange={event => {
                      setLocation(event.target.value);
                    }}
                    placeholder="Search Location"
                  />
                </InputGroup>
                <InputGroup w="20%">
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon />
                  </InputLeftElement>
                  <Input
                    bg={'white'}
                    value={date}
                    placeholder="Search Date"
                    onChange={event => {
                      setDate(event.target.value);
                    }}
                  />
                </InputGroup>
              </HStack>
            </Box>
          </Flex>
          <Spacer />
          <Box display="flex" flex-direction="space-between" justifyContent={'center'}>
            <Box marginTop="3vh">
              <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                {/* <AddEventsModal getEvents={getEvents} /> */}
                {eventCards}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default VolunteerHomePage;
