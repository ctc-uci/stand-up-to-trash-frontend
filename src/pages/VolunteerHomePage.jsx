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
import UserContext from '../utils/UserContext';
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

  const { user, updateUser } = useContext(UserContext);

  const getEvents = async () => {
    try {
      let userId = user?.id;

      const eventsData = await Backend.get(`data/registered/${userId}`);
      console.log(eventsData);
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
    updateUser();
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
  }, [name, events, location, date, fuse]);

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
      <Flex w={{ base: '85%', md: '95%' }} flexDir={'column'}>
        <Flex
          alignItems={{ base: 'left', md: 'center' }}
          mb="8"
          gap={{ base: 22, md: 4 }}
          flexDir={{ base: 'column', md: 'row' }}
        >
          <HamburgerIcon
            color={'#717171'}
            boxSize={31}
            display={{ base: 'flex', xl: 'none' }}
            onClick={onNavbarDrawerOpen}
          />
          <Heading
            fontSize={{ base: '20px', md: '36px' }}
            fontWeight={{ base: 500, md: 800 }}
            w={'full'}
          >
            Impact Summary
          </Heading>
        </Flex>

        <VolunteerImpactSummary />
      </Flex>

      <Flex justifyContent={'center'} flexDir={'column'} w={{ base: '85%', md: '95%' }}>
        <Box justifyContent="space-between">
          <Flex
            flexDir={'column'}
            backgroundColor={{ base: 'none', md: '#F8F8F8' }}
            p={{ base: 0, md: 8 }}
            borderRadius={'lg'}
            gap={{ base: 6, md: 8 }}
          >
            <Heading
              fontSize={{ base: '20px', md: '36px' }}
              fontWeight={{ base: 500, md: 800 }}
              w={'full'}
            >
              Upcoming Events
            </Heading>
            <Box display="flex" flex-direction="row" justifyContent="space-between">
              <HStack width={'100%'}>
                <InputGroup w={{ base: '100%', md: '60%' }}>
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon />
                  </InputLeftElement>
                  <Input
                    bg={'white'}
                    value={name}
                    onChange={event => {
                      setName(event.target.value);
                    }}
                    placeholder="Search name"
                  />
                </InputGroup>
                <InputGroup w="20%" display={{ base: 'none', md: 'initial' }}>
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
                <InputGroup w="20%" display={{ base: 'none', md: 'initial' }}>
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
          <Box marginTop="3vh">
            <Grid
              templateColumns={{
                base: 'repeat(1, 85vw)',
                md: 'repeat(3, 1fr)',
              }}
              gap={6}
            >
              {eventCards}
            </Grid>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default VolunteerHomePage;
