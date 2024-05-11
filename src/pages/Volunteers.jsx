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
import { useState, useEffect, useContext } from 'react';
import Backend from '../utils/utils';
import { ExternalLinkIcon, HamburgerIcon } from '@chakra-ui/icons';
import { GreyCustomSearchIcon } from '../components/Icons/CustomSearchIcon';
import Fuse from 'fuse.js';
import { TrophyIcon } from '../components/Icons/TrophyIcon';
import NavbarContext from '../utils/NavbarContext';
import { MdPeopleAlt } from 'react-icons/md';
import { CSVLink } from 'react-csv';

const Volunteers = () => {
  const [registered, setRegistered] = useState('');
  const [checkin, setcheckin] = useState('');
  const [topThree, setTopThree] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [displayedVolunteers, setDisplayedVolunteers] = useState([]);
  const [input, setInput] = useState('');
  const [volunteerData, setVolunteerData] = useState([]);
  const { onNavbarDrawerOpen } = useContext(NavbarContext);

  const header = [
    { key: 'name', label: 'NAME' },
    { key: 'email', label: 'EMAIL' },
    { key: 'phone_number', label: 'PHONE_NUMBER' },
    { key: 'organization', label: 'ORGANIZATION' },
    { key: 'about_me', label: 'ABOUT_ME' },
    { key: 'total_trash', label: 'TOTAL_TRASH' },
    { key: 'events_attended', label: 'EVENTS_ATTENDED' },
  ];

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

  useEffect(() => {
    const getVolunteerData = async () => {
      try {
        const volunteerData = await Backend.get(`/stats/export/volunteers`);
        setVolunteerData(volunteerData.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    getVolunteerData();
  }, []);

  return (
    <>
      {/* Registered + Checked-In */}
      <Flex direction="column" ml={{ base: '0', xl: '15rem' }} bg="#E8EDF3" p="10" gap="10">
        <Box bg="#F8F8F8" p="1rem" borderRadius="md">
          <Flex minW="95%" bg={'#F8F8F8'} borderRadius="lg" flexDir={'column'}>
            <HamburgerIcon
              color={'#717171'}
              boxSize={16}
              display={{ base: 'flex', xl: 'none' }}
              onClick={onNavbarDrawerOpen}
            />
            <Flex
              direction={{ base: 'column', lg: 'row' }}
              bg="F8F8F8"
              w="100%"
              gap={5}
              // pl={"15em"}
              // pr={"15em"}
              justifyContent={'center'}
              mt={5}
            >
              {/* Total Registered */}
              <Flex
                bg="white"
                p={'2em'}
                align="center"
                h={'14em'}
                maxW={{ base: '100%', lg: '20rem' }}
                w={'100%'}
                flexGrow={1}
                flexDir={'column'}
                justify={'center'}
                borderRadius={'12px'}
              >
                <Flex background={'#96DB53'} p={2.5} borderRadius={'lg'}>
                  <IoDocumentText size={30} color="white" />
                </Flex>
                <Text fontWeight={'medium'} fontSize={20} textAlign={'center'}>
                  Total Registered Volunteers
                </Text>
                <Text fontSize={50} fontWeight={'bold'} color={'rgba(0, 0, 0, 0.75)'}>
                  {Math.floor(registered)}
                </Text>
              </Flex>

              {/* Total Checked-In Card */}
              <VStack
                bg="white"
                p={'2em'}
                align="center"
                h={'14em'}
                flexDir={'column'}
                justify={'center'}
                borderRadius={'12px'}
                maxW={{ base: '100%', lg: '20rem' }}
                w={'100%'}
                flexGrow={1}
              >
                <Flex background={'#915EFF'} p={2.5} borderRadius={'lg'}>
                  <MdPeopleAlt size={30} color="white" />
                </Flex>
                <Text fontWeight={'medium'} fontSize={20} textAlign={'center'}>
                  Total Checked-In Volunteers
                </Text>
                <Text fontSize={50} fontWeight={'bold'} color={'rgba(0, 0, 0, 0.75)'}>
                  {Math.floor(checkin)}
                </Text>
              </VStack>

              {/* Leaderboard Card */}
              <VStack
                bg="white"
                p={'1em'}
                align="center"
                h={'14em'}
                flexDir={'column'}
                justify={'center'}
                borderRadius={'12px'}
                minW={'18rem'}
                maxW={{ base: '100%', lg: '18rem' }}
                flexGrow={1}
                flexBasis={0}
              >
                <Text fontWeight={'medium'} fontSize={24}>
                  Leaderboard
                </Text>
                <Flex
                  textColor="#0075FF"
                  as="b"
                  bg="#D4E4F9"
                  padding="3"
                  fontSize="lg"
                  justify="space-between"
                  alignItems="center"
                  w="100%"
                  borderRadius={'4.541px'}
                  maxWidth={{ base: '300px', md: '300px', lg: '300px', xl: '300px' }}
                >
                  <TrophyIcon boxSize={'1.25em'} />
                  <Flex maxWidth={{ base: '600px', md: '100px', xl: '100px' }}>
                    <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
                      {topThree[0] && topThree[0].volunteer_first_name}{' '}
                      {topThree[0] && topThree[0].volunteer_last_name}{' '}
                    </Text>
                  </Flex>

                  {/* <Spacer /> */}
                  <Flex>{topThree[0] && truncate(topThree[0].total_weight, 2)} lbs</Flex>
                </Flex>
                <Flex
                  display="flex"
                  pl="2em"
                  pr="2em"
                  gap={'1em'}
                  w="100%"
                  maxWidth={{ base: '300px', md: '300px', lg: '300px', xl: '300px' }}
                  justify={'space-between'}
                >
                  <Text color="#0075FF" fontWeight="bold" fontSize={'1.1em'}>
                    2
                  </Text>
                  <Flex maxWidth={{ base: '600px', md: '100px', xl: '100px' }}>
                    <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
                      {topThree[1] && topThree[1].volunteer_first_name}{' '}
                      {topThree[1] && topThree[1].volunteer_last_name}{' '}
                    </Text>
                  </Flex>
                  <Flex>{topThree[1] && truncate(topThree[1].total_weight, 2)} lbs</Flex>
                </Flex>
                <Flex
                  display="flex"
                  pl="2em"
                  pr="2em"
                  gap={'1em'}
                  w="100%"
                  maxWidth={{ base: '300px', md: '300px', lg: '300px', xl: '300px' }}
                  justify={'space-between'}
                >
                  <Text color="#0075FF" fontWeight="bold" fontSize={'1.1em'}>
                    3{' '}
                  </Text>{' '}
                  <Flex
                    overflow="hidden"
                    whiteSpace="nowrap"
                    textOverflow="ellipsis"
                    maxWidth={{ base: '100px', md: '600px', xl: '100px' }}
                  >
                    <Text overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
                      {topThree[2] && topThree[2].volunteer_first_name}{' '}
                      {topThree[2] && topThree[2].volunteer_last_name}{' '}
                    </Text>
                  </Flex>
                  <Flex>{topThree[2] && truncate(topThree[2].total_weight, 2)} lbs</Flex>
                </Flex>
              </VStack>
              <Box
                display={'flex'}
                justifyContent={{ base: 'center', lg: 'start' }}
                alignItems={'end'}
              >
                <Button
                  backgroundColor={'#0075FF'}
                  fontSize="lg"
                  style={{
                    whiteSpace: 'normal',
                    wordWrap: 'break-word',
                    color: 'white',
                    my: "3"
                  }}
                  height={'fit-content'}
                >
                  <ExternalLinkIcon marginRight="2" boxSize="6" color={'white'} />{' '}
                  <CSVLink
                    data={volunteerData.length ? volunteerData : []}
                    filename="./data.csv"
                    headers={header}
                  >
                    Export All
                  </CSVLink>
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
