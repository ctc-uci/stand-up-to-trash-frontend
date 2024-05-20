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
  IconButton,
  useBreakpoint,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect, useState, useContext, useCallback } from 'react';
import { SearchIcon, HamburgerIcon } from '@chakra-ui/icons';

import EventCard from '../components/Events/EventCard';
import VolunteerImpactSummary from '../components/Events/VolunteerImpactSummary';
import UserContext from '../utils/UserContext';
import Backend from '../utils/utils';
import Fuse from 'fuse.js';
import NavbarContext from '../utils/NavbarContext';
import { RxCaretLeft } from 'react-icons/rx';
import VolunteerSideView from '../components/VolunteerSideView.jsx';
import VolunteerSideViewDrawer from '../components/VolunteerSideViewDrawer.jsx';

const VolunteerHomePage = () => {
  const [events, setEvents] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const { isOpen: isDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  const [displayEvents, setDisplayEvents] = useState([]);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [fuse, setFuse] = useState();

  const breakpoint = useBreakpoint();

  const { onNavbarDrawerOpen } = useContext(NavbarContext);

  const { user } = useContext(UserContext);

  const getEvents = useCallback(async () => {
    try {
      const eventsData = await Backend.get(`data/registered/${user.id}`);
      setEvents(eventsData.data);
      const options = { keys: ['name', 'date', 'location'], includeScore: true };
      setFuse(new Fuse(eventsData.data, options));
    } catch (err) {
      console.log(`Error getting events: `, err.message);
    }
  }, [user]);

  const eventCards = displayEvents.map(element => (
    <GridItem
      key={element.id}
      onClick={() => {
        setCurrentEventId(element.id);
        setIsOpen(true);
        setShowOpenDrawerButton(false);
      }}
    >
      <EventCard {...element} getEvents={getEvents} />
    </GridItem>
  ));

  useEffect(() => {
    if (user) {
      getEvents();
    }
  }, [getEvents, user]);

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
    console.log(result);
  }, [name, events, location, date, fuse]);

  const [currentEventId, setCurrentEventId] = useState(-1);

  const [showOpenDrawerButton, setShowOpenDrawerButton] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(!isOpen);
    setShowOpenDrawerButton(false);
  };
  const onClose = () => setIsOpen(!isOpen);

  return (
    <Flex dir="column">
      <Flex
        flexDir={'column'}
        justifyContent={'start'}
        alignItems={'center'}
        bg="#E6EAEF"
        minH="100vh"
        width={'100%'}
        ml={{ base: '0', xl: '15%' }}
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
            <IconButton
              borderRadius="md"
              borderColor="#EFEFEF"
              bg="white"
              variant={'outline'}
              borderWidth={'0.2em'}
              h="64px"
              w="64px"
              icon={<RxCaretLeft size={40} />}
              onClick={onOpen}
              display={showOpenDrawerButton ? 'flex' : 'none'}
            ></IconButton>
          </Flex>

          <VolunteerImpactSummary showLargestItemCollected={!isOpen} />
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
            <Flex w={'full'} flex-direction="space-between" justifyContent={'start'}>
              <Flex w={'full'} marginTop="3vh">
                <Grid
                  w={'full'}
                  templateColumns={{
                    base: 'repeat(1, 85vw)',
                    md: isOpen ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                  }}
                  gap={6}
                >
                  {eventCards}
                </Grid>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Flex>
      {breakpoint != 'xl' ? (
        <VolunteerSideViewDrawer
          eventId={currentEventId}
          isOpen={isOpen}
          onClose={onClose}
          setShowOpenDrawerButton={setShowOpenDrawerButton}
        />
      ) : (
        <Box
          w={{
            base: isOpen ? '100%' : '0',
            md: isOpen ? '480px' : '0',
            lg: isOpen ? '480px' : '0',
            xl: isOpen ? '28%' : '0',
          }}
          flexShrink={0}
        >
          <Box pos={'fixed'} right={'0'} top={'0'} h={'100%'} overflowY={'auto'} paddingBottom={10}>
            {isOpen && (
              <VolunteerSideView
                eventId={currentEventId}
                onClose={onClose}
                setShowOpenDrawerButton={setShowOpenDrawerButton}
              />
            )}
          </Box>
        </Box>
      )}
    </Flex>
  );
};

export default VolunteerHomePage;
