import {
  Box,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Flex,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

import EventCard from '../../components/Events/EventCard';
import Backend from '../../utils/utils';
import Fuse from 'fuse.js';

const EventFilteredGrid = ({ setCurrentEventId, setIsOpen, setShowOpenDrawerButton }) => {
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
      const eventsData = await Backend.get('/events/currentEvents');
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
    // result.map((e) -> e.)
    setDisplayEvents(result);
  }, [name, location, date, fuse]);

  return (
    <Flex
      flexDir={'column'}
      alignItems={'center'}
      bg="#E6EAEF"
      minH="100vh"
      ml={{ base: '0', xl: '15rem' }}
      pt={8}
      pb={10}
    >
      <Flex
        bgColor="#FFF"
        width="95%"
        p="32px"
        flex-direction="column"
        align-items="center"
        gap="8px"
        flex-shrink="0"
        borderRadius={'xl'}
        flexDir={'column'}
      >
        <Box display="flex">
          <Flex w={'100%'}>
            <Flex flexDir={'column'} gap={3} w={'100%'}>
              <Flex flexDir={'row'} gap={3}>
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
                    placeholder='Search Event Name (e.g. "Festival of Whales")'
                  />
                </InputGroup>
                <Select
                  bg={'white'}
                  placeholder="Select Location"
                  onChange={handleLocationChange}
                  border={'2px solid var(--Secondary-Button-Color, #EFEFEF)'}
                  borderRadius={12}
                  size="lg"
                  maxW="20%"
                  minW="200px"
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
                  minW="200px"
                >
                  {getDateOptions()}
                </Select>
              </Flex>
              <Flex flex-direction="row" justifyContent={'left'} gap={7}></Flex>
            </Flex>
          </Flex>
        </Box>
        <Box>
          <Grid templateColumns={{base:"repeat(1, 1fr)", xl:"repeat(4, 1fr)"}} gap={6}>
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
  );
};

EventFilteredGrid.propTypes = {
  setCurrentEventId: PropTypes.func.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  setShowOpenDrawerButton: PropTypes.func.isRequired,
};

export default EventFilteredGrid;
