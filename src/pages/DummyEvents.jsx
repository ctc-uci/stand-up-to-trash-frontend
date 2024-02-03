import { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import {
  Button,
  Box,
  Stack,
  StackDivider,
  Divider,
  Spacer,
  Grid,
  GridItem,
  Card,
  Icon,
  Heading,
  CardBody,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Tabs,
  TabList, 
  TabPanels,
  Tab,
  TabPanel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { TriangleUpIcon, TriangleDownIcon, SmallAddIcon } from '@chakra-ui/icons';
import { BsArrowUpRight, BsArrowDownRight, BsBoxArrowDownRight, BsPcHorizontal } from "react-icons/bs";
import Backend from '../utils/utils';
import PropTypes from 'prop-types';


const DummyEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectEvent, setSelectEvent] = useState(null);
  const [eventId, setEventId] = useState('');
  const [showEvents, setShowEvents] = useState(true);

  const [formData, setFormData] = useState({ name: '', description: '', location: '' });

  const getEvents = async () => {
    try {
      const eventsData = await Backend.get('/events');
      // console.log('poop poop');
      console.log(eventsData.data);
      setEvents(eventsData.data);
    } catch (err) {
      console.log(`Error getting events: `, err.message);
    }
  };

  const getEventId = async () => {
    try {
      const eventIdData = await Backend.get(`/events/${eventId}`);
      console.log(eventIdData);
      setSelectEvent(eventIdData.data);
      console.log(events);
    } catch (err) {
      console.log(`Error getting event ${eventId}: `, err.message);
    }
  };

  const deleteEvents = async id => {
    try {
      await Backend.delete(`/events/${id}`);
      getEvents();
    } catch (err) {
      console.log(`Error deleting event: ${id}`, err.message);
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name == 'eventid') {
      if (value == '') {
        setSelectEvent(null);
      }
      setEventId(value);
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log('FORM DATA: ', formData);
    try {
      await Backend.post('/events', formData);
      console.log('Submitted');
      setFormData({ name: '', description: '', location: '' });
      getEvents();
    } catch (e) {
      console.log('Error posting', e);
    }
  };

  // const showEvent = () => {
  //   setShowEvents(true);
  //   if (eventId) {
  //     getEventId();
  //   }
  // };

  const EventCard = ({id, name, description, location}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (<>
      <Box width="250px" height="250px" boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)" display="flex" alignItems="center" justifyItems="center" as="a" href="#" onClick={onOpen}>
        <Spacer/>
        <Text fontSize={18} fontWeight={"bold"} textAlign={"center"} m="4">{name}</Text>
        <Spacer/>
      </Box>

    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay/>
      <ModalContent maxH="660px" maxW="800px" borderRadius="0">
        <ModalBody p="0">
          <Box display="flex" flexDir="row" h="660px" w="800px">
            <Box flexBasis="60%" display="flex" flexDir="column">
              <Box flexBasis="60%" bg="#D9D9D9" display="flex" alignItems="end" p="2">
                <Stack mx="6">
                  <Heading>{name}</Heading>
                  <Text>{ location }</Text>
                </Stack>
              </Box>
              <Box flexBasis="40%" mx="8" my="4" display="flex" justifyContent="space-between" alignItems="center" flexDir="column">
                <Box alignSelf="start">
                  <Heading fontSize={24}>Event Description</Heading>
                  <Text fontSize={18}>
                    {description}
                  </Text>
                </Box>
                <Box>
                  <Button color="black" backgroundColor="rgba(149, 189, 212, 0.71)" borderRadius="0" colorScheme={"grey"} as="a" href={`/checkin/${id}`} target="_blank">View More</Button>
                </Box>
              </Box>
            </Box>
            <Box flexBasis="40%" bg="rgba(217, 217, 217, 0.40)" display="flex" justifyItems={"end"} alignItems={"start"}> 
              <ModalCloseButton/>
            </Box>
          </Box>
        </ModalBody>
        {/* <ModalCloseButton />
        <ModalBody>
          
        </ModalBody> */}

      </ModalContent>
    </Modal>
      {/* <Card >
        <CardBody>
          <Stack spacing={4}>
            <Text>Event ID: {id}</Text>
            <Text>Name: {name}</Text>
            <Text>Description: {description}</Text>
            <Text>Location: {location}</Text>
            <Button
              marginRight={'auto'}
              colorScheme="red"
              onClick={() => deleteEvents(id)}
            >
              Delete
            </Button>
          </Stack>
        </CardBody>
      </Card> */}
      </>
    )
  }

  const eventCards = (
    <Grid templateColumns='repeat(3, 1fr)' gap={6}>
      {selectEvent ? (
        <Card key={selectEvent.id}>
          <CardBody>
            <Stack spacing={4}>
              <Text>Event ID: {selectEvent.id}</Text>
              <Text>Name: {selectEvent.name}</Text>
              <Text>Description: {selectEvent.description}</Text>
              <Text>Location: {selectEvent.location}</Text>
              <Button
                marginRight={'auto'}
                colorScheme="red"
                onClick={() => deleteEvents(selectEvent.id)}
              >
                Delete
              </Button>
            </Stack>
          </CardBody>
        </Card>
      ) : (
        events.map(element => (
          <GridItem key={element.id} >
            <EventCard {...element}/>
          </GridItem>
        ))
      )}
    </Grid>
  );

  useEffect(() => {
    getEvents();
    // getEventId(eventId);
  }, []);

  const Sidebar = ({ children }) => {
    // const [sidebarHeight, setSidebarHeight] = useState("100vh");

    // const updateHeight = () => {
    //   setSidebarHeight(Math.max(document.body.scrollHeight, window.innerHeight) + "px");
    // }

    // new ResizeObserver(updateHeight);
    // useEffect(updateHeight, []);

    return (
      <>
        <Box position="sticky" top="0" width="74x" float="left" style={{shapeOutside: "inset(50%"}}>
          <Box h="100vh" backgroundColor="#D9D9D9" flex="0 0 73px" display="flex" flexDir="column" justifyContent="space-between" alignItems="center">
            <Box display="flex" flexDir="column" p="10px" as="a" href="/">
              {/* Top sidebar items */}
              <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.9166 45.8333V32.0833H32.0833V45.8333H43.5416V27.5H50.4166L27.5 6.875L4.58331 27.5H11.4583V45.8333H22.9166Z" fill="black"/>
              </svg>
            </Box>
            <Box display="flex" flexDir="column" p="10px" as="a" href="#" onClick={() => {alert("I don't do anything yet")}}>
              {/* Bottom sidebar items */}
              <svg width="55" height="55" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="27.5" cy="27.5" r="27.5" fill="#404040"/>
              </svg>
            </Box>
          </Box>
        </Box> 
        <Box ml="74px">
          {children}
        </Box>
      </>
    )
  }

  Sidebar.propTypes = {
    children: PropTypes.node.isRequired
  };

  const RecentEventsCard = () => {
    return (
      <Box backgroundColor="#F3F3F3" maxWidth="434px" width="100%" maxHeight="260px" height="260px">
        <Box my="13px" mx="25px">
          <Heading>recent event</Heading>
          
          <Box mt="12px" mx="11px" display="flex" flexDir="row" gap="14px">
            <Box backgroundColor="#E7E7E7" w="170px" h="170px">
              <Box mx="13px" display="flex" flexDir="column" alignContent="center" justifyContent="center" gap="25px" h="100%">
                <Text>total participants</Text>
                <span>
                <Icon as={BsArrowUpRight} /> + 23%
                </span>
              </Box>
            </Box>
            <Box backgroundColor="#E7E7E7" w="170px" h="170px">
            <Box mx="13px" display="flex" flexDir="column" alignContent="center" justifyContent="center" gap="25px" h="100%">
                <Text>total trash</Text>
                <span>
                  <Icon as={BsArrowDownRight} /> - 3%
                </span>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }

  const TotalParticipantsCard = ( {totalParticipants, totalTrash} ) => {
    return (
      <>
        <Box mt="12px" mx="11px" display="flex" flexDir="row" gap="38px" alignContent="left">
          <Box backgroundColor="#E7E7E7" w="200px" h="173px">
          <Box mx="13px" display="flex" flexDir="column" alignContent="center" justifyContent="center" gap="25px" h="100%">
                <Text>total participants</Text>
                <span>
                <Icon as={BsArrowUpRight} /> + {totalParticipants}%
                </span>
              </Box>
            </Box>
            <Box backgroundColor="#E7E7E7" w="200px" h="170px">
            <Box mx="13px" display="flex" flexDir="column" alignContent="center" justifyContent="center" gap="25px" h="100%">
                <Text>total trash</Text>
                <span>
                  <Icon as={BsArrowDownRight} /> - {totalTrash}%
                </span>
              </Box>
            </Box>
        </Box>
      </>
    )
  };
  
  TotalParticipantsCard.propTypes = {
    totalParticipants: PropTypes.integer,
    totalTrash: PropTypes.integer,
  };

  const AllData = () => {
    const totalP = 23;
    const totalT = 23;
    return (
      <Box maxWidth="434px" width="100%" maxHeight="260px" height="260px">
        <Box my="13px">
        <Heading>all data</Heading>
          <Tabs variant='soft-rounded' colorScheme='green'>
            <TabList>
              <Tab>weekly</Tab>
              <Tab>monthly</Tab>
              <Tab>yearly</Tab>
            </TabList>
            <TabPanels>
              <TabPanel p="0">
                <TotalParticipantsCard totalParticipants={totalP} totalTrash={totalT} />
              </TabPanel>
              <TabPanel p="0">
                <TotalParticipantsCard totalParticipants={totalP} totalTrash={totalT} />
              </TabPanel>
              <TabPanel p="0">
                <TotalParticipantsCard  totalParticipants={totalP} totalTrash={totalT}/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    )
  };

  return (
    <Sidebar>
    <Box mx="156px" pt="30px" justifyContent="flex-start">
      <Box display="flex" flexDirection="row" gap="83px" justifyContent="center" alignItems={"left"}>
        <RecentEventsCard/>
        <AllData/>
      </Box>
      
      {/* <form onSubmit={handleSubmit}>
        <FormControl isRequired marginTop={10}>
          <FormLabel marginLeft={10} htmlFor="name">
            Name
          </FormLabel>
          <Input
            marginLeft={10}
            id="name"
            name="name"
            onChange={handleInputChange}
            value={formData.name}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel marginLeft={10} htmlFor="description">
            Description
          </FormLabel>
          <Textarea
            id="description"
            name="description"
            onChange={handleInputChange}
            value={formData.description}
            marginLeft={10}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel marginLeft={10} htmlFor="location">
            Location
          </FormLabel>
          <Input
            marginLeft={10}
            id="location"
            name="location"
            onChange={handleInputChange}
            value={formData.location}
          />
        </FormControl>
        <Button marginLeft={10} type="submit" colorScheme="blue" marginTop={4}>
          Submit
        </Button>
      </form> */}
      <Box justifyContent="space-between" display="flex" flex-direction="column">
          <Box justifyContent="space-between" display="flex" flex-direction="row">
            <Box>
              <Button style={{ backgroundColor: "#95D497", borderRadius: '0px' }}>+ Create New Event</Button>
            </Box>
            <Box alignItems="left">
              <Button style={{ backgroundColor: "white" }}>Select</Button>
            </Box>
          </Box>
          <Box display="flex" flex-direction="space-between">
              <Box marginTop="3vh">
                { eventCards }
              </Box>
          </Box>
      </Box>
      {/* <Stack align="center" marginTop={10} marginBottom={10} flexDirection={'row'} spacing={4}>
        <Input
          width={'auto'}
          marginLeft={10}
          id="eventid"
          name="eventid"
          onChange={handleInputChange}
          value={eventId}
        />
        <Button size="md" colorScheme="linkedin" onClick={showEvent}>
          Show Events
        </Button>
        <Button size="md" colorScheme="yellow" onClick={() => setShowEvents(false)}>
          Unshow Events
        </Button>
      </Stack>
      {showEvents ? eventCards : null} */}
      </Box>
    </Sidebar>
  );
};

export default DummyEvents;
