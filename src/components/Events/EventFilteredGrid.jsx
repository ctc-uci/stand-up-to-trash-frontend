import {
  Box,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Flex,
  Heading,
  HStack,
} from '@chakra-ui/react';
import { useEffect, useState, useContext } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

import EventCard from '../../components/Events/EventCard';
import Backend from '../../utils/utils';
import Fuse from 'fuse.js';

import UserContext from '../../utils/UserContext';

const EventFilteredGrid = ({ setCurrentEventId, setIsOpen, setShowOpenDrawerButton, isOpen, onlyRegistered=false }) => {
  const [events, setEvents] = useState([]);
  const [displayEvents, setDisplayEvents] = useState([]);

  const [selectedEvents, setSelectedEvents] = useState([]);
  const [name, setName] = useState('');
  const [dates, setDates] = useState([]);
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [fuse, setFuse] = useState();

  const { user } = useContext(UserContext);

  const getEvents = async () => {
    try {
      let eventsData;
      if (onlyRegistered) {
        // Will show only registered events
        eventsData = await Backend.get('/events/currentEvents');
      } else {
        // Will show all events, default / previous behavior
        eventsData = await Backend.get(`data/unregistered/${user.id}`);
      }
      setEvents(eventsData.data);
      // setDates();
      setLocations(getLocation(eventsData.data));
      setDates(getDate(eventsData.data));
      const options = { keys: ['name', 'date', 'location'], includeScore: true }; //use date and locaiton selected
      setFuse(new Fuse(eventsData.data, options));
    } catch (err) {
      console.log(`Error getting events: `, err.message);
    }
  };

  const getLocation = data => {
    let location = [];
    for (let i in data) {
      location.push(data[i].location);
    }
    return location;
  };

  const getDate = data => {
    let date = [];
    for (let i in data) {
      date.push(data[i].date.substring(0, 10));
    }
    return date;
  };

  const handleCheckboxChange = id => {
    const newCheckedItems = [...selectedEvents];
    const index = newCheckedItems.indexOf(id);

    if (index === -1) {
      newCheckedItems.push(id);
    } else {
      newCheckedItems.splice(index, 1);
    }

    setSelectedEvents(newCheckedItems);
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleLocationChange = event => {
    const selectedLocation = event.target.value;
    setLocation(selectedLocation);
  };

  const handleDateChange = event => {
    const selectedDate = event.target.value;
    setDate(selectedDate);
  };

  const getLocationOptions = () => {
    return locations.map((location, index) => (
      <option key={location + index.toString()} value={location}>
        {location}
      </option>
    ));
  };

  const getDateOptions = () => {
    return dates.map((date, index) => (
      <option key={date + index.toString()} value={date}>
        {date}
      </option>
    ));
  };

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
    // result.map((e) -> e.)
    setDisplayEvents(result);
  }, [name, location, date, fuse]);

  return (
    <>
    {/* Flag: Navbar responsive (Use 15%) */}
      <Flex
        flexDir={'column'}
        alignItems={'center'}
        bg="#E6EAEF"
        ml={{ base: '2vw', xl: '15rem' }}
        mr={{ base: '2vw' }}
        pt={4}
        mb="32px"
      >
        <Flex
          width={{ base: '100%', xl: '95%' }}
          p={{ base: '20px' }}
          pb={4}
          bgColor={{ xl: '#FFF' }}
          align-items="center"
          justifyContent={'space-between'}
          gap="8px"
          flex-shrink="0"
          borderRadius={'xl'}
          flexDir={'column'}
        >
          <Flex w="80%">
            <Heading
              fontWeight={{ base: 600, xl: 900 }}
              lineHeight="normal"
              fontStyle="normal"
              fontSize={{ base: '18px', xl: '32px' }}
              color={'rgba(0, 0, 0, 0.75)'}
            >
              All Upcoming Events
            </Heading>
          </Flex>
          {/* Search/Input Boxes */}
          <Box display="flex">
            <Flex w={'100%'}>
              <Flex flexDir={'column'} gap={3} w={'100%'}>
                <Flex flexDir={{ base: 'column', xl: 'row' }} gap={3}>
                  <InputGroup align-items="left" justifyContent={'center'}>
                    <InputLeftElement pointerEvents="none" py="24px" pl="15px">
                      <SearchIcon color={'#7B7C7D'} />
                    </InputLeftElement>
                    <Input
                      bg={'white'}
                      value={name}
                      onChange={event => {
                        setName(event.target.value);
                      }}
                      border={'2px solid var(--Secondary-Button-Color, #EFEFEF)'}
                      borderRadius={12}
                      size="lg"
                      fontSize={18}
                      placeholder="Search Name"
                    />
                  </InputGroup>
                  <HStack flexDir="row">
                    <Select
                      bg={'white'}
                      placeholder="Select Location"
                      onChange={handleLocationChange}
                      border={'2px solid var(--Secondary-Button-Color, #EFEFEF)'}
                      borderRadius={12}
                      size="lg"
                      maxW="20%"
                      minW={{ base: '49%', xl: '200px' }}
                      //   py="22px"
                      //   pl="45px"
                    >
                      {getLocationOptions()}
                    </Select>
                    <Select
                      bg={'white'}
                      //   icon={<Icon as={CalendarIcon}/>}
                      onChange={handleDateChange}
                      placeholder="Select Date"
                      border={'2px solid var(--Secondary-Button-Color, #EFEFEF)'}
                      borderRadius={12}
                      size="lg"
                      maxW="20%"
                      minW={{ base: '48%', xl: '10em' }}
                    >
                      {getDateOptions()}
                    </Select>
                  </HStack>
                </Flex>
                <Flex flex-direction="row" justifyContent={'left'} gap={7}></Flex>
              </Flex>
            </Flex>
          </Box>
          <Box>
            <Grid
              templateColumns={{
                base: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(2, 1fr)',
                xl: isOpen ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
              }}
              gap={6}
            >
              {displayEvents.map(element => (
                <GridItem
                  key={element.id}
                  onClick={() => {
                    setCurrentEventId(element.id);
                    setIsOpen(true);
                    setShowOpenDrawerButton(false);
                  }}
                >
                  <EventCard
                    {...element}
                    isSelected={selectedEvents.includes(element.id)}
                    // showSelect={showSelect}
                    handleCheckboxChange={handleCheckboxChange}
                    getEvents={getEvents}
                    hasBorder={true}
                  />
                </GridItem>
              ))}
            </Grid>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

EventFilteredGrid.propTypes = {
  setCurrentEventId: PropTypes.func.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  setShowOpenDrawerButton: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onlyRegistered: PropTypes.bool
};

export default EventFilteredGrid;
