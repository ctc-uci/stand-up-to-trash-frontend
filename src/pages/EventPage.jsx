import {
  Box,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  Heading,
  Select,
  Flex,
} from '@chakra-ui/react';
import { useEffect, useState, useContext } from 'react';
import { SearchIcon, CalendarIcon, HamburgerIcon } from '@chakra-ui/icons';

import NavbarContext from '../utils/NavbarContext';

import EventCard from '../components/Events/EventCard';
import AddEventsModal from '../components/EventsModal/AddEventsModal';
import Backend from '../utils/utils';
import Fuse from 'fuse.js';

const Events = () => {
  const { onNavbarDrawerOpen } = useContext(NavbarContext);
  const [events, setEvents] = useState([]);
  const [displayEvents, setDisplayEvents] = useState([]);

  const [selectedEvents, setSelectedEvents] = useState([]);
  const [name, setName] = useState('');
  const [dates, setDates] = useState([]);
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [fuse, setFuse] = useState();

  const getEvents = async () => {
    try {
      const eventsData = await Backend.get('/events');
      setEvents(eventsData.data);
      console.log(eventsData.data);
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
    console.log(location.length);
    return location;
  };

  const getDate = data => {
    let date = [];
    for (let i in data) {
      date.push(data[i].date.substring(0, 10));
    }
    console.log(date.length);
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
    console.log(selectedEvents);
  };

  const eventCards = displayEvents.map(element => (
    <GridItem key={element.id}>
      <EventCard
        {...element}
        isSelected={selectedEvents.includes(element.id)}
        // showSelect={showSelect}
        handleCheckboxChange={handleCheckboxChange}
        getEvents={getEvents}
      />
    </GridItem>
  ));

  useEffect(() => {
    getEvents();
    console.log(locations);
    // getEventId(eventId);
  }, []);

  const handleLocationChange = event => {
    const selectedLocation = event.target.value;
    console.log(selectedLocation);
    setLocation(selectedLocation);
  };

  const handleDateChange = event => {
    const selectedDate = event.target.value;
    console.log(selectedDate);
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
    console.log(name);
    let ands = [];
    if (name) ands.push({ name: name });
    if (location) ands.push({ location: location });
    if (date) ands.push({ date: date });

    let result;
    if (ands.length > 0) {
      const fuseResult = fuse.search({ $and: ands });
      console.log(fuseResult);
      // If we want to filter by score:
      // result = fuseResult.filter(item => item.score <= 0.5).map(item => item.item);
      result = fuseResult.map(item => item.item);
    } else result = events;
    console.log(result);
    setDisplayEvents(result);
  }, [name, location, date, fuse]);

  return (
    <Flex
      flexDir={'column'}
      alignItems={'center'}
      bg="#E6EAEF"
      minH="100vh"
      ml={{ base: '0', xl: '15rem' }}
      py={10}
    >
      <Flex
        bgColor="#F8F8F8"
        width="95%"
        height="237px"
        padding="32px"
        flex-direction="column"
        align-items="center"
        gap="24px"
        flex-shrink="0"
        borderRadius={'xl'}
        flexDir={'column'}
      >
        <Flex align={'center'} gap={3}>
          <HamburgerIcon
            color={'#717171'}
            boxSize={10}
            display={{ base: 'flex', xl: 'none' }}
            onClick={onNavbarDrawerOpen}
          />
          <Heading>All Upcoming Events</Heading>
        </Flex>
        <Box display="flex">
          <Flex w={'100%'}>
            <Flex flexDir={'column'} gap={3} w={'100%'}>
              <InputGroup align-items="left">
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color={'#7B7C7D'} />
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
              <Flex flex-direction="row" justifyContent={'left'} gap={7}>
                <Select bg={'white'} placeholder="Location" onChange={handleLocationChange} w="10%">
                  {getLocationOptions()}
                </Select>
                <Select
                  bg={'white'}
                  icon={<CalendarIcon />}
                  onChange={handleDateChange}
                  placeholder="Select Date"
                  gap={'5px'}
                  w="20%"
                >
                  {getDateOptions()}
                </Select>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Flex>

      <Box display="flex" justifyContent={'center'} px={10} mt={5}>
        <Box display="flex" flex-direction="space-between" justifyContent={'center'}>
          <Box marginTop="3vh">
            <Grid templateColumns="repeat(4, 1fr)" gap={6}>
              <AddEventsModal getEvents={getEvents} />
              {eventCards}
            </Grid>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Events;
