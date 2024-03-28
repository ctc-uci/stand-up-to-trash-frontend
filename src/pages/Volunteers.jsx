import {
  Box,
  Stack,
  Button,
  Input,
  Text,
  Flex,
  VStack,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { IoDocumentText } from 'react-icons/io5';
import VolunteersTable from '../components/VolunteersTable';
import { useState, useEffect } from 'react';
import Backend from '../utils/utils';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { GreyCustomSearchIcon } from '../components/Icons/CustomSearchIcon';
import Fuse from 'fuse.js';
import { TrophyIcon } from '../components/Icons/TrophyIcon';

const Volunteers = () => {
  const [registered, setRegistered] = useState('');
  const [checkin, setcheckin] = useState('');
  const [topThree, setTopThree] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [displayedVolunteers, setDisplayedVolunteers] = useState([]);
  const [input, setInput] = useState('');

  const setData = async () => {
    try {
      const res = await Backend.get('/stats/registered');
      setRegistered(res.data);
      const checkin_res = await Backend.get('/stats/checkedIn');
      setcheckin(checkin_res.data);
      const topThreeData = await Backend.get('/stats/leaderboard');
      setTopThree(topThreeData.data);
      const allVolunteers = await Backend.get('/data/allVolunteers/counts');
      setVolunteers(allVolunteers.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const truncate = (num, decimalPlaces) => {
    const factor = Math.pow(10, decimalPlaces);
    return Math.floor(num * factor) / factor;
  };

  useEffect(() => {
    setData();
  }, []);

  useEffect(() => {
    console.log('>', volunteers);
  }, [volunteers]);

  useEffect(() => {
    // If input is empty, display all volunteers, else conduct the search
    if (input.trim() === '') {
      setDisplayedVolunteers(volunteers);
    } else {
      const options = {
        keys: ['first_name', 'last_name'],
      };
      const fuse = new Fuse(volunteers, options);
      const searchResult = fuse.search(input);
      console.log('search result', searchResult);
      const reduceResult = searchResult.map(result => result.item);
      setDisplayedVolunteers(reduceResult);
    }
  }, [input, volunteers]);

  return (
    <>
      {/* Registered + Checked-In */}
      <Flex direction="column" ml="15rem" bg="#E8EDF3" p="10" gap="10">
        <Box bg="#F8F8F8" p="1rem" borderRadius="md">
          <Flex minW="95%" bg={'#F8F8F8'} borderRadius="lg">
            <Flex
              direction={{ base: 'column', md: 'row' }}
              bg="F8F8F8"
              w="100%"
              gap={5}
              justifyContent="center"
              mt={5}
            >
              {/* Total Registered */}
              <VStack bg="white" p={30} align="center" w="70%">
                <Flex background={'#96DB53'} p={2.5} borderRadius={'lg'}>
                  <IoDocumentText size={30} color="white" />
                </Flex>
                <Text fontWeight={'medium'} fontSize={20} textAlign={'center'}>
                  Total Registered Volunteers
                </Text>
                <Text fontSize={50} fontWeight={'bold'} color={'rgba(0, 0, 0, 0.75)'}>
                  {Math.floor(registered)}
                </Text>
              </VStack>

              {/* Total Checked-In Card */}
              <VStack bg="white" p={30} align="center" w="70%">
                <Flex background={'#96DB53'} p={2.5} borderRadius={'lg'}>
                  <IoDocumentText size={30} color="white" />
                </Flex>
                <Text fontWeight={'medium'} fontSize={20} textAlign={'center'}>
                  Total Checked-In Volunteers
                </Text>
                <Text fontSize={50} fontWeight={'bold'} color={'rgba(0, 0, 0, 0.75)'}>
                  {Math.floor(checkin)}
                </Text>
              </VStack>

              {/* Leaderboard Card */}
              <VStack bg="white" p={30} align="center" w="80vw" spacing={5}>
                <Text fontWeight={'medium'} fontSize={24}>
                  Leaderboard
                </Text>
                <Text
                  textColor="#0075FF"
                  as="b"
                  bg="#D4E4F9"
                  padding="3"
                  fontSize="lg"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  w="20vw"
                >
                  <Flex alignItems="center">
                    <TrophyIcon marginRight="5" />
                    <Box
                      overflow="hidden"
                      whiteSpace="nowrap"
                      textOverflow="ellipsis"
                      maxWidth="10vw" // Adjust the width based on your design
                    >
                      {topThree[0] && topThree[0].volunteer_first_name}{' '}
                      {topThree[0] && topThree[0].volunteer_last_name}{' '}
                    </Box>
                  </Flex>
                  {/* <Spacer /> */}
                  <Flex>{topThree[0] && truncate(topThree[0].total_weight, 2)} lbs</Flex>
                </Text>
                <Text display="flex" justifyContent="space-between" w="15vw">
                  <Text color="#0075FF" fontWeight="bold">
                    2{' '}
                  </Text>{' '}
                  <Flex>
                    {topThree[1] && topThree[1].volunteer_first_name}{' '}
                    {topThree[1] && topThree[1].volunteer_last_name}{' '}
                  </Flex>
                  <Flex>{topThree[1] && truncate(topThree[1].total_weight, 2)} lbs</Flex>
                </Text>
                <Text display="flex" justifyContent="space-between" w="15vw">
                  <Text color="#0075FF" fontWeight="bold">
                    3{' '}
                  </Text>{' '}
                  <Flex>
                    {topThree[2] && topThree[2].volunteer_first_name}{' '}
                    {topThree[2] && topThree[2].volunteer_last_name}{' '}
                  </Flex>
                  <Flex>{topThree[2] && truncate(topThree[2].total_weight, 2)} lbs</Flex>
                </Text>
              </VStack>
              <Box mt="18%" width="60%">
                <Button colorScheme={'blue'} fontSize="lg">
                  <ExternalLinkIcon marginRight="2" boxSize="6" /> Export All Volunteer Data
                </Button>
              </Box>
            </Flex>
          </Flex>
        </Box>

        <Box padding="10" bg="#F8F8F8" borderRadius="md">
          <Stack spacing={4}>
            <Text fontSize="4xl" as="b">
              All Volunteers
            </Text>
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
          </Stack>
        </Box>
        <Box padding="10" bg="#F8F8F8" borderRadius="md">
          <VolunteersTable volunteers={displayedVolunteers} />
        </Box>
      </Flex>
    </>
  );
};

export default Volunteers;
