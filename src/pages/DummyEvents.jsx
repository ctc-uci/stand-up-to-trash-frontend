import {
  Box,
  Button,
  Grid,
  GridItem,
  Spacer,
  HStack,
  useDisclosure,
  useToast,
  Input,
  InputGroup,
  InputLeftElement,
  Heading,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { SearchIcon } from '@chakra-ui/icons';

import PropTypes from 'prop-types';
import AllData from '../components/DummyEvents/AllData';
import ArchiveEventsModal from '../components/DummyEvents/ArchiveEventsModal';
import EventCard from '../components/DummyEvents/EventCard';
import RecentEventsCard from '../components/DummyEvents/RecentEventsCard';
import Sidebar from '../components/DummyEvents/Sidebar';
import AddEventsModal from '../components/AddEventsModal/AddEventsModal';
import Backend from '../utils/utils';
import Fuse from 'fuse.js';

const DummyEvents = () => {
  const toast = useToast();
  const [events, setEvents] = useState([]);
  const [displayEvents, setDisplayEvents] = useState([]);
  // const [eventId, setEventId] = useState('');
  // const [showEvents, setShowEvents] = useState(true);
  const [showSelect, setShowSelect] = useState(false);
  const [isSelectButton, setIsSelectButton] = useState(true);
  const [isCreateButton, setIsCreateButton] = useState(true); // toggle between create event button and deselect button
  const [selectedEvents, setSelectedEvents] = useState([]);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [fuse, setFuse] = useState();

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

  const {
    isOpen: isArchiveEventModalOpen,
    onOpen: onArchiveEventModalOpen,
    onClose: onArchiveEventModalClose,
  } = useDisclosure();
  const confirmArchive = async () => {
    for (const id of selectedEvents) {
      try {
        await Backend.put(`/events/archive/${id}`);
        getEvents();
      } catch (error) {
        console.log(`Error archiving event: ${id}`, error.message);
      }
    }
    onArchiveEventModalClose();
    handleGoBackButton();
    toast({
      title: `Successfully archived ${selectedEvents.length} event(s)`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const archiveEvents = () => {
    if (selectedEvents.length === 0) handleGoBackButton();
    else onArchiveEventModalOpen();
  };

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
          style={{ backgroundColor: 'white' }}
          onClick={() => handleSelectButton()}
          fontSize="20px"
          height={'50px'}
        >
          Select
        </Button>
      </>
    );
  };

  const ArchiveButton = ({ id }) => {
    return (
      <>
        <Button
          style={{ backgroundColor: '#FFABAB', borderRadius: '30px' }}
          h="50px"
          onClick={() => archiveEvents(id)}
        >
          <Box padding="13px 13px" fontSize="20px" display="inline-flex" gap="10px">
            Archive Event(s)
          </Box>
        </Button>
      </>
    );
  };

  ArchiveButton.propTypes = {
    id: PropTypes.number,
  };

  const DeselectButton = () => {
    return (
      <>
        <Button
          style={{ backgroundColor: 'white', borderRadius: '0px' }}
          fontSize="20px"
          height={'50px'}
          onClick={() => handleGoBackButton()}
        >
          Deselect All
        </Button>
      </>
    );
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
    <Sidebar>
      <Box py="30px" justifyContent="flex-start" display="flex" flexDirection="column">
        <Box
          mb="60px"
          display="flex"
          flexDirection="row"
          gap="83px"
          justifyContent="center"
          alignItems={'left'}
        >
          <RecentEventsCard events={events} />
          <AllData />
        </Box>
        <Spacer />
        <Box display="flex" justifyContent={'center'} mb="4">
          <Heading width="930px">Upcoming Events</Heading>
        </Box>
        <Box display="flex" justifyContent={'center'}>
          <Box justifyContent="space-between" width="930px">
            <Box display="flex" flex-direction="row" justifyContent="space-between">
              {isCreateButton ? <></> : <DeselectButton />}
              <HStack>
                <InputGroup w="50%">
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon />
                  </InputLeftElement>
                  <Input
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
                </InputGroup>
              </HStack>

              {isSelectButton ? <SelectButton /> : <ArchiveButton id={32} />}
              <ArchiveEventsModal
                isOpen={isArchiveEventModalOpen}
                onClose={onArchiveEventModalClose}
                confirmArchive={confirmArchive}
                events={events.filter(event => selectedEvents.includes(event.id))}
              />
            </Box>
            <Spacer />
            <Box display="flex" flex-direction="space-between" justifyContent={'center'}>
              <Box marginTop="3vh">
                <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                  <AddEventsModal getEvents={getEvents} />
                  {eventCards}
                </Grid>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Sidebar>
  );
};

export default DummyEvents;
