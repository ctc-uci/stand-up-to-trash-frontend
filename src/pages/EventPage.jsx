import {
  Box,
  // Button,
  // Card,
  Grid,
  GridItem,
  Spacer,
  // useDisclosure,
  // useToast,
  Input,
  InputGroup,
  InputLeftElement,
  Heading,
  VStack,
  Select,
  Flex,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { SearchIcon, CalendarIcon } from '@chakra-ui/icons';

// import PropTypes from 'prop-types';
// import AllData from '../components/Events/AllData';
// import ArchiveEventsModal from '../components/Events/ArchiveEventsModal';
import EventCard from '../components/Events/EventCard';
// import DataCard from '../components/Events/DataCard';
import AddEventsModal from '../components/AddEventsModal/AddEventsModal';
// import ImpactSummary from '../components/Events/ImpactSummary';
import Backend from '../utils/utils';
import Fuse from 'fuse.js';

const Events = () => {
  // const toast = useToast();
  const [events, setEvents] = useState([]);
  const [displayEvents, setDisplayEvents] = useState([]);
  // const [eventId, setEventId] = useState('');
  // const [showEvents, setShowEvents] = useState(true);
  // const [showSelect, setShowSelect] = useState(false);
  // const [isSelectButton, setIsSelectButton] = useState(true);
  // const [isCreateButton, setIsCreateButton] = useState(true); // toggle between create event button and deselect button
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

  // const getEventId = async () => {
  //   try {
  //     const eventIdData = await Backend.get(`/events/${eventId}`);
  //     console.log(eventIdData);
  //     setSelectEvent(eventIdData.data);
  //     console.log(events);
  //   } catch (err) {
  //     console.log(`Error getting event ${eventId}: `, err.message);
  //   }
  // };

  // const {
  //   isOpen: isArchiveEventModalOpen,
  //   onOpen: onArchiveEventModalOpen,
  //   onClose: onArchiveEventModalClose,
  // } = useDisclosure();
  // const confirmArchive = async () => {
  //   for (const id of selectedEvents) {
  //     try {
  //       await Backend.put(`/events/archive/${id}`);
  //       getEvents();
  //     } catch (error) {
  //       console.log(`Error archiving event: ${id}`, error.message);
  //     }
  //   }
  //   onArchiveEventModalClose();
  //   handleGoBackButton();
  //   toast({
  //     title: `Successfully archived ${selectedEvents.length} event(s)`,
  //     status: 'success',
  //     duration: 3000,
  //     isClosable: true,
  //   });
  // };

  // const archiveEvents = () => {
  //   if (selectedEvents.length === 0) handleGoBackButton();
  //   else onArchiveEventModalOpen();
  // };

  // const showEvent = () => {
  //   setShowEvents(true);
  //   if (eventId) {
  //     getEventId();
  //   }
  // };

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

  // const handleSelectButton = () => {
  //   setShowSelect(true);
  //   setIsSelectButton(false);
  //   setIsCreateButton(false);
  // };

  // const handleGoBackButton = () => {
  //   setShowSelect(false);
  //   // setIsCreateButton(true);
  //   // setIsSelectButton(true);
  //   setSelectedEvents([]);
  // };

  // const SelectButton = () => {
  //   return (
  //     <>
  //       <Button
  //         style={{ backgroundColor: 'white' }}
  //         onClick={() => handleSelectButton()}
  //         fontSize="20px"
  //         height={'50px'}
  //       >
  //         Select
  //       </Button>
  //     </>
  //   );
  // };

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

  // const ArchiveButton = ({ id }) => {
  //   return (
  //     <>
  //       <Button
  //         style={{ backgroundColor: '#FFABAB', borderRadius: '30px' }}
  //         onClick={() => archiveEvents(id)}
  //       >
  //         <Box padding={3} fontSize={'lg'} display="inline-flex" gap={10}>
  //           Archive Event(s)
  //         </Box>
  //       </Button>
  //     </>
  //   );
  // };

  // ArchiveButton.propTypes = {
  //   id: PropTypes.number,
  // };

  // const DeselectButton = () => {
  //   return (
  //     <>
  //       <Button
  //         style={{ backgroundColor: 'white', borderRadius: '0px' }}
  //         fontSize="20px"
  //         height={'50px'}
  //         onClick={() => handleGoBackButton()}
  //       >
  //         Deselect All
  //       </Button>
  //     </>
  //   );
  // };

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
      justifyContent={'center'}
      alignItems={'center'}
      bg="#E6EAEF"
      minH="100vh"
      ml="15rem"
      py={10}
    >
      <VStack
        bgColor="#F8F8F8"
        display="flex"
        width="80vw"
        height="237px"
        padding="32px"
        flex-direction="column"
        align-items="center"
        gap="24px"
        flex-shrink="0"
        borderRadius={'xl'}
      >
        <Box display="flex" mx="13px" w="90%">
          <Heading width="930px">All Upcoming Events</Heading>
        </Box>
        <Box display="flex" mx="13px" w="90%" mb="4" align-ite>
          <Box width="930px" w="100%" display="flex">
            <VStack display="flex" spacing={3} w="80vw">
              <Box display="flex" w="100%" justifyContent={'left'} flex-direction="column">
                {/* {isCreateButton ? <></> : <DeselectButton />} */}
                {/* <VStack> */}
                <InputGroup w="100%" align-items="left">
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
                    w="70%"
                  />
                </InputGroup>
                {/* <InputGroup w="25%">
                    <InputLeftElement pointerEvents="none">
                      <SearchIcon />
                    </InputLeftElement>
                    <Input
                      value={location}
                      onChange={event => {
                        setLocation(event.target.value);
                      }}
                      placeholder="Search Location"
                    />
                  </InputGroup>
                  <InputGroup w="25%">
                    <InputLeftElement pointerEvents="none">
                      <SearchIcon />
                    </InputLeftElement>
                    <Input
                      value={date}
                      placeholder="Search Date"
                      onChange={event => {
                        setDate(event.target.value);
                      }}
                    />
                  </InputGroup> */}
                {/* </VStack> */}
                {/* {isSelectButton ? <SelectButton /> : <ArchiveButton id={32} />} */}
                {/* <ArchiveEventsModal
                isOpen={isArchiveEventModalOpen}
                onClose={onArchiveEventModalClose}
                confirmArchive={confirmArchive}
                events={events.filter(event => selectedEvents.includes(event.id))}
              /> */}
              </Box>
              <Box display="flex" w="100%" flex-direction="row" justifyContent={'left'}>
                <Select
                  bg={'white'}
                  placeholder="Select Location"
                  onChange={handleLocationChange}
                  w="42%"
                >
                  {getLocationOptions()}
                </Select>
                <Select
                  bg={'white'}
                  icon={<CalendarIcon />}
                  onChange={handleDateChange}
                  placeholder="Select Date"
                  gap={'5px'}
                  w="42%"
                >
                  {getDateOptions()}
                </Select>
              </Box>
            </VStack>
          </Box>
        </Box>
      </VStack>
      <Spacer />

      <Box display="flex" justifyContent={'center'} px={5}>
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
