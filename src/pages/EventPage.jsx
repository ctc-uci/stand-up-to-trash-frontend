import {
  Box,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  Heading,
  Select,
  useDisclosure,
  HStack,
  Flex,
  useToast,
  Button,
  Spacer,
} from '@chakra-ui/react';
import { useEffect, useState, useContext } from 'react';
import { SearchIcon, CalendarIcon, HamburgerIcon, DeleteIcon } from '@chakra-ui/icons';

import NavbarContext from '../utils/NavbarContext';
import PropTypes from 'prop-types';
import DeleteEventsModal from '../components/Events/DeleteEventsModal';

import EventCard from '../components/Events/EventCard';
import AddEventsModal from '../components/EventsModal/AddEventsModal';
import Backend from '../utils/utils';
import Fuse from 'fuse.js';

const Events = () => {
  const toast = useToast();

  const { onNavbarDrawerOpen } = useContext(NavbarContext);
  const [events, setEvents] = useState([]);
  const [displayEvents, setDisplayEvents] = useState([]);
  const [showSelect, setShowSelect] = useState(false);
  const [isSelectButton, setIsSelectButton] = useState(true);
  const [isCreateButton, setIsCreateButton] = useState(true); // toggle between create event button and deselect button
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
      // setDates();
      setLocations(getLocation(eventsData.data));
      setDates(getDate(eventsData.data));
      const options = { keys: ['name', 'date', 'location'], includeScore: true }; //use date and locaiton selected
      setFuse(new Fuse(eventsData.data, options));
    } catch (err) {
      console.log(`Error getting events: `, err.message);
    }
  };

  const {
    isOpen: isDeleteEventModalOpen,
    onOpen: onDeleteEventModalOpen,
    onClose: onDeleteEventModalClose,
  } = useDisclosure();

  const confirmDelete = async () => {
    for (const id of selectedEvents) {
      try {
        await Backend.delete(`/events/${id}`);
        getEvents();
      } catch (error) {
        console.log(`Error archiving event: ${id}`, error.message);
      }
    }
    onDeleteEventModalClose();
    handleGoBackButton();
    toast({
      title: `Successfully deleted ${selectedEvents.length} event(s)`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
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

  const eventCards = displayEvents.map(element => (
    <GridItem key={element.id}>
      <EventCard
        {...element}
        isSelected={selectedEvents.includes(element.id)}
        showSelect={showSelect}
        handleCheckboxChange={handleCheckboxChange}
        getEvents={getEvents}
      />
    </GridItem>
  ));

  useEffect(() => {
    getEvents();
    // getEventId(eventId);
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

  const deleteEvents = () => {
    if (selectedEvents.length > 0) {
      onDeleteEventModalOpen();
    }
  };

  const handleSelectButton = () => {
    setShowSelect(true);
    setIsSelectButton(false);
    setIsCreateButton(false);
  };

  const handleGoBackButton = () => {
    setShowSelect(false);
    setIsCreateButton(true);
    setIsSelectButton(true);
    setSelectedEvents([]);
  };

  const SelectButton = () => {
    return (
      <>
        <Button
          style={{
            backgroundColor: 'white',
            borderRadius: '5px',
            color: '#0075FF',
            border: '1px solid #0075FF',
          }}
          onClick={() => handleSelectButton()}
          fontSize="20px"
          height={'50px'}
        >
          Select Events
        </Button>
      </>
    );
  };

  const DeleteButton = ({ id }) => {
    return (
      <>
        <Button
          style={{ backgroundColor: '#FFABAB', borderRadius: '30px' }}
          onClick={() => deleteEvents(id)}
        >
          <Box padding={3} fontSize={'lg'} display="inline-flex" gap={10}>
            Delete Event(s)
          </Box>
        </Button>
      </>
    );
  };

  DeleteButton.propTypes = {
    id: PropTypes.number,
  };

  const CancelButton = () => {
    return (
      <>
        <Button
          style={{
            backgroundColor: 'white',
            borderRadius: '5px',
            color: '#0075FF',
            border: '1px solid #0075FF',
          }}
          fontSize="20px"
          height={'50px'}
          onClick={() => handleGoBackButton()}
        >
          Cancel
        </Button>
      </>
    );
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
    setDisplayEvents(result);
  }, [name, location, date, fuse]);

  return (
    <Flex
      flexDir={'column'}
      alignItems={'center'}
      bg="#E6EAEF"
      minH="100vh"
      ml={{ base: '0', xl: '15%' }}
      py={10}
    >
      <Flex
        bgColor="#F8F8F8"
        width="95%"
        height="237px"
        padding="32px"
        flexDirection="column"
        gap="24px"
        borderRadius={'xl'}
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
            <Flex flexDirection={'column'} gap={3} w={'100%'}>
              <InputGroup>
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
              <Flex flexDirection="row" justifyContent={'left'} gap={7}>
                <Select bg={'white'} placeholder="Location" onChange={handleLocationChange} w="10%">
                  {getLocationOptions()}
                </Select>
                <Select
                  bg={'white'}
                  icon={<CalendarIcon />}
                  onChange={handleDateChange}
                  placeholder="Select Date"
                  w="20%"
                >
                  {getDateOptions()}
                </Select>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Flex>

      <Flex justifyContent={'center'} flexDirection={'column'} w={'95%'} mt={5}>
        <Flex flexDirection={'column'} bgColor={'#F8F8F8'} p={8} borderRadius={'lg'} gap={8}>
          <Heading w={'full'}>Upcoming Events</Heading>
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            {isCreateButton}
            <HStack>
              <InputGroup w="50%">
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
              <InputGroup w="25%">
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
              <InputGroup w="25%">
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
        <Spacer>
          <Flex justifyContent="flex-end" width="100%" paddingY="10px">
            {isSelectButton ? <SelectButton /> : <CancelButton />}
          </Flex>
        </Spacer>
        {!isSelectButton && (
          <Box position="fixed" bottom="20px" right="20px">
            <Button
              colorScheme="red"
              onClick={deleteEvents}
              disabled={selectedEvents.length === 0}
              leftIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Box>
        )}
        <DeleteEventsModal
          isOpen={isDeleteEventModalOpen}
          onClose={onDeleteEventModalClose}
          confirmDelete={confirmDelete}
          events={events.filter(event => selectedEvents.includes(event.id))}
        />

        <Box marginTop="3vh">
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            <AddEventsModal getEvents={getEvents} />
            {eventCards}
          </Grid>
        </Box>
      </Flex>
    </Flex>
  );
};

export default Events;
