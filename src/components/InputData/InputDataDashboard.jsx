/* eslint-disable react/prop-types */

import { Text, Flex, Button, Box } from '@chakra-ui/react';

import { FaLocationDot, FaNewspaper, FaScaleBalanced } from 'react-icons/fa6';
import { IoMdPeople } from 'react-icons/io';
import { CalendarIcon, TimeIcon } from '@chakra-ui/icons';
import HappeningInChip from '../HappeningInChip/HappeningInChip';
import Leaderboard from '../Leaderboard/Leaderboard.jsx';

const InputDataDashboard = ({ event, checkin, trashCollected }) => {
  // formats dbms date into Month Day, Year
  const getDateString = () => {
    const dateObject = new Date(Date.parse(event['date']));
    const dateString = `${[
      dateObject.getMonth(),
    ]}/${dateObject.getDate()}/${dateObject.getFullYear()}`;
    if (isNaN(dateObject)) {
      // on page load, prevents displaying "Undefined" as date
      return '';
    }
    return dateString;
  };
  console.log(event);

  const getTimeString = () => {
    if (!event || !event.time) {
      return '';
    }
    const time = event.time.substring(0, 5);
    const value = parseInt(time.substring(0, 2));
    if (value > 12) {
      return (value - 12).toString() + time.substring(2);
    }
    return time;
  };

  return (
    <Flex
      minW="95%"
      bg={'#F8F8F8'}
      borderRadius="lg"
      p={10}
      w={{ base: '0em', xl: '15em' }}
      h={{ base: '30em' }}
    >
      <Flex direction={{ base: 'column', xl: 'row' }} w={'full'}>
        <Flex flexDir={'column'} w={{ base: '100%', xl: '35%' }}>
          <Box>{event && <HappeningInChip date={new Date(Date.parse(event['date']))} />}</Box>
          <Text
            fontSize={{ base: '36px', xl: '40' }}
            fontWeight="bold"
            color={'rgba(0, 0, 0, 0.75)'}
            w={{ base: '50%' }}
          >
            {event?.name}
          </Text>

          <Flex mt={3} w="70%" justify={'space-between'}>
            <Flex flexDir={{ base: 'row', xl: 'column' }} gap={3}>
              <Flex alignItems={'center'} gap={2}>
                <Button
                  variant="outline"
                  fontSize={'lg'}
                  fontWeight={'medium'}
                  size="sm"
                  bg={'rgba(170, 170, 170, 0.25)'}
                  color={'#7B7C7D'}
                  gap={2}
                  w={{ base: '5em', xl: '10em' }}
                >
                  <FaNewspaper />
                  Event flyer
                </Button>
              </Flex>

              <Flex alignItems={'center'} gap={2}>
                <Flex bg={'#7B7C7D'} p={2} borderRadius={'lg'}>
                  <CalendarIcon color={'white'} />
                </Flex>
                <Text fontSize={'lg'} fontWeight={'medium'}>
                  {getDateString()}
                </Text>
              </Flex>

              <Flex alignItems={'center'} gap={2}>
                <Flex bg={'#7B7C7D'} p={2} borderRadius={'lg'}>
                  <FaLocationDot color="white" />
                </Flex>
                <Text fontSize={'lg'} fontWeight={'medium'}>
                  {event.location}
                </Text>
              </Flex>

              <Flex alignItems={'center'} gap={2}>
                <Flex bg={'#7B7C7D'} p={2} borderRadius={'lg'}>
                  <TimeIcon color={'white'} />
                </Flex>
                <Text fontSize={'lg'} fontWeight={'medium'}>
                  {getTimeString()} PST
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <Flex
          gap={{ base: '3', xl: '10' }}
          w={{ base: '100%', xl: '75%' }}
          h={{ base: '10vh', xl: '80vh' }}
          justifyContent={'center'}
        >
          <Flex
            bg="white"
            p={30}
            borderRadius="md"
            align="center"
            w={{ base: '238px', xl: '25%' }}
            h={{ base: '211px', xl: '23%' }}
            flexDir={'column'}
            gap={3}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Flex background={'#915EFF'} p={2.5} borderRadius={'lg'}>
              <IoMdPeople w={{ base: '42.782px', xl: '42.782px' }} color="white" />
            </Flex>
            <Text fontWeight={'medium'} fontSize={{ base: '18px', xl: '20' }}>
              Checked-In
            </Text>
            <Text
              fontSize={{ base: '40px', xl: '50' }}
              fontWeight={'bold'}
              color={'rgba(0, 0, 0, 0.75)'}
            >
              {checkin}
            </Text>
          </Flex>
          <Flex
            bg="white"
            p={30}
            borderRadius="md"
            align="center"
            w={{ base: '238px', xl: '25%' }}
            h={{ base: '211px', xl: '23%' }}
            flexDir={'column'}
            gap={3}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Flex background={'#FF84B0'} p={2.5} borderRadius={'lg'}>
              <FaScaleBalanced w={{ base: '42.782px', xl: '42.782px' }} color="white" />
            </Flex>
            <Text fontWeight={'medium'} fontSize={{ base: '18px', xl: '20' }}>
              Trash Collected
            </Text>
            <Text
              fontSize={{ base: '40px', xl: '50' }}
              fontWeight={'bold'}
              color={'rgba(0, 0, 0, 0.75)'}
            >
              {trashCollected} lb
            </Text>
          </Flex>

          <Leaderboard event_id={event.id} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default InputDataDashboard;
