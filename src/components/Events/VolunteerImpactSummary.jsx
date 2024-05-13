import { Box, Flex, Text } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useEffect, useState, useContext } from 'react';
import UserContext from '../../utils/UserContext';
import Backend from '../../utils/utils';
import DataCard from './DataCard';
import {
  TotalEventsIcon,
  TotalTrashIcon,
  LargestTrashIcon,
} from '../../Assets/impact_summary/ImpactSummaryIcons';
import PropTypes from 'prop-types';

const VolunteerImpactSummary = ({ showLargestItemCollected }) => {
  const [events, setEvents] = useState(0);
  const [total, setTotalPounds] = useState(0);
  const [largestItem, setLargestItem] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = 3;

  const { user } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      getData();
    }
    
  }, [user]);

  const getData = async () => {
    try {
      let totalPounds = 0;
      let allWeights = [];
      // let userId = 111; // For testing
      let userId = user?.id;

      // Get the events which the user has attended, length = num events
      let eventResponse = await Backend.get(`/data/volunteer/${userId}/event`);
      setEvents(eventResponse.data.length);

      // Get all weight entries and calculate total weight in lbs
      let weightResponse = await Backend.get(`/data/volunteer/${userId}`);
      for (const { ounces, pounds } of weightResponse.data) {
        totalPounds += ounces / 16 + pounds;
        allWeights.push(ounces / 16 + pounds);
      }
      setTotalPounds(parseFloat(totalPounds));

      // Largest value of all weights entered
      let largestItem = parseFloat(Math.max(...allWeights));
      if (isNaN(largestItem) || !isFinite(largestItem)) {
        // NaN if invalid entry, -inf if empty
        largestItem = 0;
      }
      setLargestItem(largestItem);
    } catch (err) {
      console.log(`Error getting events: `, err.message);
    }
  };

  const handleNextClick = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % totalItems);
  };

  const handlePrevClick = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + totalItems) % totalItems);
  };

  return (
    <Box
      mb="5"
      display="flex"
      flexDirection="row"
      overflowX="hidden"
      gap={{ base: 0, md: 8 }}
      justifyContent="center"
      alignItems={'stretch'}
      backgroundColor={{ base: '#FFFFFF', md: '#F8F8F8' }}
      borderRadius={'lg'}
      py={10}
      px={25}
    >
      <Box display={{ base: 'inline-flex', md: 'none' }}>
        <button onClick={handlePrevClick}>
          <ChevronLeftIcon boxSize="24px" />
        </button>
      </Box>
      <Box display={{ base: currentIndex === 0 ? 'block' : 'none', md: 'block' }} width="100%">
        <DataCard
          index={1}
          amount={events}
          text={
            <Text fontSize={'18px'} fontWeight={500}>
              Total Events Participated
            </Text>
          }
          icon={
            <Flex background={'#96DB53'} p={2.5} borderRadius={'lg'}>
              <TotalEventsIcon></TotalEventsIcon>
            </Flex>
          }
        />
      </Box>
      <Flex display={{ base: currentIndex === 1 ? 'block' : 'none', md: 'block' }} width="100%">
        <DataCard
          index={2}
          amount={total + ' lbs'}
          text={
            <Text fontSize={'18px'} fontWeight={500}>
              Total Trash Weight
            </Text>
          }
          icon={
            <Flex background={'#FF792E'} p={2.5} borderRadius={'lg'}>
              <TotalTrashIcon></TotalTrashIcon>
            </Flex>
          }
        />
      </Flex>
      <Flex
        display={
          showLargestItemCollected
            ? { base: currentIndex === 2 ? 'block' : 'none', md: 'block' }
            : 'none'
        }
        width="100%"
      >
        <DataCard
          index={3}
          amount={largestItem + ' lbs'}
          text={
            <Text fontSize={'18px'} fontWeight={500}>
              Largest Trash Item Collected
            </Text>
          }
          icon={
            <Flex background={'#915EFF'} p={2.5} borderRadius={'lg'}>
              <LargestTrashIcon></LargestTrashIcon>
            </Flex>
          }
        />
      </Flex>
      <Box display={{ base: 'inline-flex', md: 'none' }}>
        <button onClick={handleNextClick}>
          <ChevronRightIcon boxSize="24px" />
        </button>
      </Box>
    </Box>
  );
};

VolunteerImpactSummary.propTypes = {
  showLargestItemCollected: PropTypes.bool.isRequired,
};

export default VolunteerImpactSummary;
