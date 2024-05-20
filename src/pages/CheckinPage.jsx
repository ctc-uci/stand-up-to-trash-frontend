/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from 'react';
import { fetchJoinedEventsById } from '../utils/fuseUtils';
import { getEventById } from '../utils/eventsUtils';
import Backend from '../utils/utils';
import Fuse from 'fuse.js';
import VolunteerEventsTable from '../components/Checkin/VolunteerEventsTable';
import CheckinStatsDashboard from '../components/Checkin/CheckinStatsDashboard';
import VolunteerTabNavigation from '../components/Checkin/VolunteerTabNavigation';
import CheckinInputPageToggle from '../components/Checkin/CheckinInputPageToggle';
import { ArrowBackIcon, HamburgerIcon } from '@chakra-ui/icons';
import CheckinModal from '../components/Checkin/CheckinModal';
import NavbarContext from '../utils/NavbarContext';
import Scanner from '../components/Scanner';

import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Flex,
  Button,
  Box,
  Input,
  useDisclosure,
  Spacer,
  InputGroup,
  InputLeftElement,
  Alert,
} from '@chakra-ui/react';

import { GreyCustomSearchIcon } from '../components/Icons/CustomSearchIcon';
import RegisterGuestModal from '../components/RegisterGuestModal/RegisterGuestModal';
import { FaCamera } from 'react-icons/fa';

const CheckinPage = () => {
  const [joinedData, setJoinedData] = useState([]);
  const [volunteerResults, setVolunteerResults] = useState([]);
  const [input, setInput] = useState('');
  const [event, setEvent] = useState('');
  const [registered, setRegistered] = useState('');
  const [checkin, setCheckin] = useState('');
  const { eventId } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [displayedVolunteers, setDisplayedVolunteers] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const { onNavbarDrawerOpen } = useContext(NavbarContext);

  const navigate = useNavigate();
  const [isCheckinModalOpen, setIsCheckinModalOpen] = useState(false);
  const [isScannerModalOpen, setIsScannerModalOpen] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [usingScanner, setUsingScanner] = useState(false);

  useEffect(() => {
    // 0 is all, 1 is checked-in, 2 is not checked-in, 3 are guests
    if (tabIndex === 0) setDisplayedVolunteers(volunteerResults);
    else if (tabIndex === 1)
      setDisplayedVolunteers(
        volunteerResults.filter(volunteer => volunteer.is_checked_in === true),
      );
    else if (tabIndex === 2)
      setDisplayedVolunteers(
        volunteerResults.filter(volunteer => volunteer.is_checked_in === false),
      );
    else if (tabIndex === 3)
      setDisplayedVolunteers(volunteerResults.filter(v => v.role === 'guest'));
  }, [tabIndex, volunteerResults]);

  const setData = async () => {
    try {
      const data = await fetchJoinedEventsById(eventId); // joined data for table rendering
      const event = await getEventById(eventId); // event data for page rendering eg. image src
      setJoinedData(data);
      setEvent(event);
      getRegistered(event.id);
      getCheckin(event.id);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  /*
    useEffect for getting joined data on first render
  */
  useEffect(() => {
    setData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /*
    This useffect is used for updating the display volunteer data based on user input utilizing fuzzy search
  */
  useEffect(() => {
    // If input is empty, display all volunteers, else conduct the search
    if (input.trim() === '') {
      setVolunteerResults(joinedData);
    } else {
      const options = {
        keys: ['first_name', 'last_name', 'email'],
      };
      const fuse = new Fuse(
        joinedData.filter(item => item.event_id == eventId || eventId == -1),
        options,
      );
      const searchResult = fuse.search(input);
      const reduceResult = searchResult.map(result => result.item);
      setVolunteerResults(reduceResult);
    }
  }, [input, joinedData, eventId]);

  const handleScannerSuccess = async (volunteer) => {
    setSelectedVolunteer(volunteer);
    setIsCheckinModalOpen(true);
    setUsingScanner(true);
    // await Backend.patch(`/data/checkin/${eventId}/${volunteer.id}`); // update backend with user
  };

  /*
    updates check in status for a volunteer on the backend, dynamically rerenders it on the frontend
  */
  const changeIsCheckedIn = async (volunteer, numberOfParticipants) => {
    try {
      const event_data_id = volunteer.event_data_id;
      console.log(event_data_id, numberOfParticipants);
      console.log(volunteer);

      let response;

      if (!usingScanner) {
        response = await Backend.put(`/data/checkin/${volunteer.event_data_id}`, {
          number_in_party: numberOfParticipants,
        });
      } else {
        response = await Backend.patch(`/data/checkin/${volunteer.event_data_id}/${volunteer.id}`, {
          number_in_party: numberOfParticipants,
        });
      }

      console.log('Response from server:', response);

      setUsingScanner(false);
      await setData(); // Refresh data
    } catch (err) {
      console.error('Error in changeIsCheckedIn:', err);
    }
  };

  const handleCheckinButtonClick = volunteer => {
    setSelectedVolunteer(volunteer); // `volunteer` is the volunteer object from the list
    setIsCheckinModalOpen(true);
  };

  const closeCheckinModal = () => {
    setIsCheckinModalOpen(false);
  };

  //gets the number of ppl that registered and checked in
  const getRegistered = async event_id => {
    try {
      // send new checkin status to backend, set new data by retrieving the new backend data
      const response = await Backend.get(`/stats/register/${event_id}`).then(data => {
        setRegistered(parseInt(data.data));
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  const getCheckin = async event_id => {
    try {
      // send new checkin status to backend, set new data by retrieving the new backend data
      const response = await Backend.get(`/stats/checkin/${event_id}`).then(data => {
        setCheckin(parseInt(data.data));
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Flex
      flexDir={'column'}
      alignItems={'center'}
      bg="#E6EAEF"
      minH="100vh"
      ml={{ base: '0', xl: '15%' }}
    >
      <Flex minW="95%" justifyContent={'space-between'} mt={10} mb={5}>
        <Flex alignItems={'center'} gap={3}>
          <HamburgerIcon
            color={'#717171'}
            boxSize={16}
            display={{ base: 'flex', xl: 'none' }}
            onClick={onNavbarDrawerOpen}
          />
          <Button
            gap={2}
            alignItems={'center'}
            onClick={() => {
              navigate('/');
            }}
          >
            <ArrowBackIcon />
            Back to events
          </Button>
        </Flex>

        <CheckinInputPageToggle eventId={eventId} isCheckinPage={true} />
      </Flex>
      <CheckinStatsDashboard event={event} registered={registered} checkin={checkin} />
      <Container borderRadius={'xl'} mt={10} bg={'#F8F8F8'} minW="95%">
        {/* SEARCH BAR---- */}
        <Flex gap={3} mt={5}>
          <InputGroup mt={10}>
            <InputLeftElement pointerEvents="none" top={'6px'} left={'5px'}>
              <GreyCustomSearchIcon w={'24px'} h={'18px'} />
            </InputLeftElement>
            <Input
              value={input}
              onChange={event => setInput(event.target.value)}
              borderRadius="15px"
              backgroundColor="#FFFFFF"
              height="53px"
              width="100%"
              padding={'13px, 16px, 12px, 16px'}
              paddingLeft={'50px'}
              border="1px solid #E2E8F0"
              placeholder='Search Volunteer Name (e.g. "John Doe")'
            />
          </InputGroup>
        </Flex>
        {/* ----SEARCH BAR*/}

        <Flex mb={5} marginTop="4vh">
          <VolunteerTabNavigation volunteerResults={volunteerResults} setTabIndex={setTabIndex} />

          <Spacer />
          <Button
            marginLeft="1vw"
            onClick={onOpen}
            cursor={'pointer'}
            borderRadius={'lg'}
            py={6}
            color={'#0075FF'}
            bg={'white'}
            border={'2px solid #0075FF'}
            fontSize={'xl'}
          >
            Add guest
          </Button>
        </Flex>
        <RegisterGuestModal isOpen={isOpen} onClose={onClose} eventId={eventId} />

        {displayedVolunteers.length != 0 ? (
          <VolunteerEventsTable
            volunteers={displayedVolunteers}
            changeIsCheckedIn={handleCheckinButtonClick}
            isCheckinPage={true}
            isViewEventPage={false}
          />
        ) : (
          <Alert status="warning" borderRadius={'8'} w="50%" mx="auto">
            <Box textAlign={'center'} w="100%">
              No volunteers found for current search
            </Box>
          </Alert>
        )}

        <Button
          position={'fixed'}
          bottom={'3%'}
          right={'3%'}
          bg={'#0075FF'}
          color={'white'}
          display={'flex'}
          gap={'.5rem'}
          fontSize={'xl'}
          _hover={{ bgColor: '#0075FFCC' }}
          onClick={() => setIsScannerModalOpen(true)}
          py={6}
        >
          <FaCamera /> Scan
        </Button>
      </Container>

      <Scanner
        event_id={eventId}
        isOpen={isScannerModalOpen}
        onClose={setIsScannerModalOpen}
        handleSuccess={handleScannerSuccess}
      />

      <CheckinModal
        isOpen={isCheckinModalOpen}
        onClose={closeCheckinModal}
        volunteer={selectedVolunteer}
        onCheckInConfirm={changeIsCheckedIn}
      />
    </Flex>
  );
};

export default CheckinPage;
