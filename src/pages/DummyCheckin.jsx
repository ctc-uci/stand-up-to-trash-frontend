/* eslint-disable react/prop-types */
// import { useState, useEffect, useCallback } from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Input } from '@chakra-ui/react';
import { fetchJoinedEvents } from '../utils/fuseUtils';
import {
  Container,
  Flex,
  Button,
  Box,
} from '@chakra-ui/react';
import Fuse from 'fuse.js';
import JoinedDataContainer from '../components/DummySearchVolunteerEvents/JoinedDataContainer';
import VolunteerEventsTable from '../components/DummyCheckin/VolunteerEventsTable';
// import Backend from '../utils/utils';
// import { useDisclosure } from '@chakra-ui/react';

const DummyCheckin = () => {
  // const { isOpen, onOpen, onClose } = useDisclosure();
  const [joinedData, setJoinedData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [volunteerResults, setVolunteerResults] = useState([]);
  // const [checkedInVolunteers, setCheckedInVolunteers] = useState([]);
  // const [notCheckedInVolunteers, setNotCheckedInVolunteers] = useState([]);
  const [input, setInput] = useState('');
  const { eventId } = useParams();
  const [showCheckedIn, setShowCheckedIn] = useState(false);

  /*
    Filters on change to joinedData which it relies on, only really necessary once but needs to happen aftr joinedData complete
  */
  useEffect(() => {
    const filterHandler = () => {
      const filterdData = joinedData.filter(item => {
        if (item.props.data.event_id == eventId || eventId == -1) {
          return true;
        }
      });
      setSearchResults(filterdData);
    };
    filterHandler();
  }, [joinedData, eventId]);

  /*
    Dynamically re-renders volunteer entries when a user checks them in
  */

  /*
    This asynchronous function updates the checkin status of an eventData entry, if its true it becomes false, if its false it becomes true
  */
  // const changeIsCheckedIn = async eventData => {
  //   const { event_data_id } = eventData;
  //   try {
  //     const response = await Backend.put(`/data/checkin/${event_data_id}`);
  //     sortEventCardsByCheckIn(); // rerender event cards so checked in volunteers show up in the correct category
  //     return response;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  /*
  Card components that display the volunteer information for the current event
  // */
  // const CheckedInEventCard = ({ eventData }) => {
  //   return (
  //     <Card key={`${eventData.event_data_id}-${eventData.is_checked_in}`} marginTop="5vh">
  //       <CardBody bg="gray" style={{ boxShadow: '.1 .1 .1 .1' }}>
  //         <Flex justifyContent="left">
  //           <Flex direction="column" justifyContent="left" ml="2rem">
  //             <Text justifyContent="center" fontSize="2xl" fontWeight="bold">
  //               {eventData.first_name}
  //             </Text>
  //             <Text>Check-In</Text>
  //           </Flex>
  //           <Spacer />
  //           <Button
  //             onClick={onOpen}
  //             style={{ color: 'black', backgroundColor: 'white' }}
  //             borderRadius="0px"
  //             size="lg"
  //             mt={1}
  //           >
  //             Input Data
  //           </Button>
  //           <DataEntryModal
  //             isOpen={isOpen}
  //             onClose={onClose}
  //             profileImage={eventData.image_url}
  //             firstName={eventData.first_name}
  //             lastName={eventData.last_name}
  //             unusualItems={eventData.unusual_items}
  //             eventId={eventData.event_id}
  //             volunteerId={eventData.volunteer_id}
  //           />
  //         </Flex>
  //       </CardBody>
  //     </Card>
  //   );
  // };

  // const NotCheckedInEventCard = ({ eventData }) => {
  //   return (
  //     <Card key={`${eventData.event_data_id}-${eventData.is_checked_in}`} marginTop="5vh">
  //       <CardBody bg="white" style={{ boxShadow: '.1 .1 .1 .1' }}>
  //         <Flex justifyContent="center">
  //           <Center w="100%">
  //             <Text
  //               mt={1}
  //               fontSize="2xl"
  //               fontWeight="bold"
  //               style={{ boxShadow: '0 0 0 1px var(--chakra-colors-dark-background)' }}
  //             >
  //               {eventData.first_name}
  //             </Text>
  //           </Center>
  //           <Spacer />
  //           <Button
  //             onClick={() => changeIsCheckedIn(eventData)}
  //             style={{ color: 'black', backgroundColor: '#95D497' }}
  //             borderRadius="0px"
  //             size="lg"
  //           >
  //             Check-in
  //           </Button>
  //         </Flex>
  //       </CardBody>
  //     </Card>
  //   );
  // };

  /*
    This is the filtered data based on the event chosen in event-card-page
  */

  /*
    This useEffect is for fetching all the events and JOINED events/volunteers/events_data data
  */
  useEffect(() => {
    const setData = async () => {
      // await fetchEvents().then(data => setEventsData(data));
      await fetchJoinedEvents().then(data => {
        const joinedContainers = data.map(event => {
          return <JoinedDataContainer data={event} key={event.volunteer_id} />;
        });
        setJoinedData(joinedContainers);
      });
    };
    setData();
  }, []);

  /*
    This useffect is used for updating the display volunteer data based on user input utilizing fuzzy search
  */
  useEffect(() => {
    const options = {
      keys: ['props.data.first_name', 'props.data.last_name', 'props.data.email'],
    };
    const fuse = new Fuse(searchResults, options);
    const searchResult = fuse.search(input);
    const reduceResult = searchResult.map(result => result.item);
    setVolunteerResults(reduceResult);
  }, [input, searchResults]);

  const handleButtonClick = () => {
    setShowCheckedIn(!showCheckedIn);
  };

  // const sortEventCardsByCheckIn = useCallback(() => {
  //   // if (volunteerResults.length !== 0) {
  //   //   setCheckedInVolunteers(
  //   //     volunteerResults.filter(volunteer => volunteer.props.data.is_checked_in === true),
  //   //   );
  //   //   setNotCheckedInVolunteers(
  //   //     volunteerResults.filter(volunteer => volunteer.props.data.is_checked_in === false),
  //   //   );
  //   // } else {
  //   //   setCheckedInVolunteers([]); // for refreshing when the user deletes the searched entry
  //   //   setNotCheckedInVolunteers([]);
  //   // }
  // }, [volunteerResults]);

  // useEffect(() => {
  //   sortEventCardsByCheckIn();
  // }, [volunteerResults, sortEventCardsByCheckIn]);

  return (
    <>
      <Flex justifyContent="center">
        <Box
          w="88%"
          h="15rem"
          bg="white"
          style={{ boxShadow: ' 0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
          mt={1}
        ></Box>
      </Flex>
      <Container maxW="90%">
        <Input
          value={input}
          onChange={event => setInput(event.target.value)}
          borderRadius="0px"
          marginTop="5vh"
          placeholder="Search"
        />

        <Button
          style={{
            borderRadius: '60px',
            backgroundColor: `${showCheckedIn ? '#EFEFEF' : '#696969'}`,
          }}
          marginLeft="1vw"
          marginTop="3vh"
          onClick={() => handleButtonClick()}
        >
          not checked-in
        </Button>
        <Button
          style={{
            borderRadius: '60px',
            backgroundColor: `${showCheckedIn ? '#696969' : '#EFEFEF'}`,
          }}
          marginLeft="1vw"
          marginTop="3vh"
          onClick={() => handleButtonClick()}
        >
          checked-in
        </Button>

        {/* {showCheckedIn &&
          (checkedInVolunteers.length != 0
            ? checkedInVolunteers.map(volunteer => (
                <CheckedInEventCard
                  eventData={volunteer.props.data}
                  key={volunteer.props.data.volunteer_id}
                />
              ))
            : '')}
        {!showCheckedIn &&
          (notCheckedInVolunteers.length != 0
            ? notCheckedInVolunteers.map(volunteer => (
                <NotCheckedInEventCard
                  eventData={volunteer.props.data}
                  key={volunteer.props.data.volunteer_id}
                />
              ))
            : '')} */}
            <VolunteerEventsTable volunteers={volunteerResults}/>
      </Container>
    </>
  );
};

export default DummyCheckin;
