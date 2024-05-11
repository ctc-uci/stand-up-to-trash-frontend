/* eslint-disable react/prop-types */

import { Text, Flex, Button, Box, Center, HStack, useDisclosure } from '@chakra-ui/react';

import { FaLocationDot, FaScaleBalanced } from 'react-icons/fa6';
import { FaPen } from 'react-icons/fa';
import { IoMdPeople } from 'react-icons/io';
import { CalendarIcon, TimeIcon } from '@chakra-ui/icons';
import HappeningInChip from '../HappeningInChip/HappeningInChip';
import Leaderboard from '../Leaderboard/Leaderboard.jsx';
import EditEventModal from '../EventsModal/EditEventModal';

const InputDataDashboard = ({ event, checkin, trashCollected }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      bg={'#F8F8F8'}
      borderRadius="lg"
      alignItems="center"
      p={18}
      w={'100%'}
      justifyContent={'space-between'}
    >
      <Flex
        direction={{ base: 'column', xl: 'row' }}
        w={'full'}
        h={'full'}
        justifyContent={'space-between'}
        alignItems="center"
        gap={7}
      >
        <Flex flexDir={'column'} w={{ base: '100%', xl: '45%' }}>
          <Box>{event && <HappeningInChip date={new Date(Date.parse(event['date']))} />}</Box>

          <HStack justify={'space-between'} gap={4}>
            <Text
              fontSize={{ base: '36px', xl: '30px' }}
              fontWeight="bold"
              color={'rgba(0, 0, 0, 0.75)'}
              style={{
                display: '-webkit-box',
                lineClamp: 1,
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
              }}
              overflow={'hidden'}
              wordBreak={true}
            >
              Christmas Beach Cleanup
              {/* {event?.name} */}
            </Text>

            <Button
              leftIcon={<FaPen />}
              onClick={onOpen}
              size="sm"
              variant="outline"
              colorScheme="blue"
              minW={70}
            >
              Edit
            </Button>

            <EditEventModal event={event} isOpen={isOpen} onClose={onClose} />
          </HStack>

          <Flex mt={3} w="70%" justify={'space-between'}>
            <Flex flexDir={{ base: 'row', xl: 'column' }} gap={2}>
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
          gap={{ base: '3', xl: '5' }}
          h={{ xl: '100%' }}
          justifyContent={'center'}
          alignItems={'center'}
          maxH={200}
        >
          <Flex
            bg="white"
            p={30}
            borderRadius="md"
            align="center"
            flexDir={'column'}
            gap={3}
            justifyContent={'center'}
            alignItems={'center'}
            width={200}
          >
            <Flex background={'#915EFF'} p={2.5} borderRadius={'lg'}>
              <IoMdPeople w={{ base: '42.782px', xl: '42.782px' }} color="white" />
            </Flex>
            <Flex>
              <Center>
                <Text fontWeight={'medium'} fontSize={18}>
                  Checked-In
                </Text>
              </Center>
            </Flex>

            <Center>
              <Text fontSize={32} fontWeight={'bold'} color={'rgba(0, 0, 0, 0.75)'}>
                {checkin}
              </Text>
            </Center>
          </Flex>

          <Flex
            bg="white"
            p={30}
            borderRadius="md"
            align="center"
            flexDir={'column'}
            gap={3}
            justifyContent={'center'}
            alignItems={'center'}
            width={200}
          >
            <Flex background={'#FF84B0'} p={2.5} borderRadius={'lg'}>
              <FaScaleBalanced w={{ base: '42.782px', xl: '42.782px' }} color="white" />
            </Flex>
            <Flex>
              <Center>
                <Text fontWeight={'medium'} fontSize={18}>
                  Trash Collected
                </Text>
              </Center>
            </Flex>

            <Center>
              <Text fontSize={32} fontWeight={'bold'} color={'rgba(0, 0, 0, 0.75)'}>
                {trashCollected} lb
              </Text>
            </Center>
          </Flex>

          <Flex bg="white">
            <Leaderboard event_id={event.id} />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default InputDataDashboard;
