/* eslint-disable react/prop-types */

import { Text, Flex, Button, Box, VStack } from '@chakra-ui/react';

import { FaLocationDot, FaNewspaper } from 'react-icons/fa6';
import { IoDocumentText } from 'react-icons/io5';
import { IoMdPeople } from 'react-icons/io';
import { CalendarIcon, TimeIcon } from '@chakra-ui/icons';
import HappeningInChip from '../HappeningInChip/HappeningInChip';

const CheckinStatsDashboard = ({ event, registered, checkin }) => {
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
    <Flex minW="95%" bg={'#F8F8F8'} borderRadius="lg" p={10}>
      <Flex direction={{ base: 'column', md: 'row' }} w={'full'}>
        <Flex flexDir={'column'} w={'50%'}>
          <Box>{event && <HappeningInChip date={new Date(Date.parse(event['date']))} />}</Box>
          <Text fontSize={40} fontWeight="bold" color={'rgba(0, 0, 0, 0.75)'}>
            {event?.name}
          </Text>
          <Flex mt={3} w="70%" justify={'space-between'}>
            <Flex flexDir={'column'} gap={3}>
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
            <Button
              variant="outline"
              fontSize={'lg'}
              fontWeight={'medium'}
              size="sm"
              bg={'rgba(170, 170, 170, 0.25)'}
              color={'#7B7C7D'}
              gap={2}
            >
              <FaNewspaper />
              Event flyer
            </Button>
          </Flex>
        </Flex>

        <Flex gap={10} w={'50%'}>
          <VStack bg="white" p={30} borderRadius="md" align="center" w={'45%'}>
            <Flex background={'#96DB53'} p={2.5} borderRadius={'lg'}>
              <IoDocumentText size={30} color="white" />
            </Flex>
            <Text fontWeight={'medium'} fontSize={20}>
              Registered
            </Text>
            <Text fontSize={50} fontWeight={'bold'} color={'rgba(0, 0, 0, 0.75)'}>
              {registered}
            </Text>
          </VStack>
          <VStack bg="white" p={30} borderRadius="md" align="center" w={'45%'}>
            <Flex background={'#915EFF'} p={2.5} borderRadius={'lg'}>
              <IoMdPeople size={30} color="white" />
            </Flex>
            <Text fontWeight={'medium'} fontSize={20}>
              Checked-In
            </Text>
            <Text fontSize={50} fontWeight={'bold'} color={'rgba(0, 0, 0, 0.75)'}>
              {checkin}
            </Text>
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CheckinStatsDashboard;
