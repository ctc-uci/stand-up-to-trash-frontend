import React, { useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import {
  Button,
  Stack,
  StackDivider,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
} from '@chakra-ui/react';
import Backend from '../../utils/utils';

const DummyEvents = () => {
  const [events, setEvents] = useState([]);
  const [showEvents, setShowEvents] = useState(false);
  const getEvents = async () => {
    const eventsData = await Backend.get('/events');
    // console.log('poop poop');
    // console.log(eventsData.data);
    setEvents(eventsData.data);
  };

  // const getEventCards = () => {
  //   console.log('EVENTS');
  //   console.log(events);
  //   if (showEvents) {
  //     return (
  //       // console.log(element.id);
  //       <Stack divider={<StackDivider />} spacing="4">
  //         {events.map(element => (
  //           <Card key={element.id}>
  //             <CardBody>
  //               <Stack direction={'row'} spacing={100}>
  //                 <Text>ID: {element.id}</Text>
  //                 <Button colorScheme="red">Delete</Button>
  //               </Stack>
  //             </CardBody>
  //           </Card>
  //         ))}
  //       </Stack>
  //       // console.log(element);
  //     );
  //   }
  //   return [];
  // };
  const showEvent = () => {
    setShowEvents(true);
  };

  const eventCards = (
    <Stack divider={<StackDivider />} spacing="4">
      {events.map(element => (
        <Card key={element.id}>
          <CardBody>
            <Stack direction={'row'} spacing={100}>
              <Text>ID: {element.id}</Text>
              <Button colorScheme="red">Delete</Button>
            </Stack>
          </CardBody>
        </Card>
      ))}
    </Stack>
  );

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <ChakraProvider>
      <Stack align="center" marginTop={10} marginBottom={10}>
        <Button size="md" colorScheme="linkedin" onClick={showEvent}>
          Show Events
        </Button>
      </Stack>
      {showEvents ? eventCards : null}
    </ChakraProvider>
  );
};

export default DummyEvents;
