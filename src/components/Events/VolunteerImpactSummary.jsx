import { Box, Flex, Text } from '@chakra-ui/react';
import { useEffect, useState, useContext } from 'react';
import UserContext from '../../utils/UserContext';
import Backend from '../../utils/utils';
import DataCard from './DataCard';
import { TotalEventsIcon, TotalTrashIcon, LargestTrashIcon } from '../../Assets/impact_summary/ImpactSummaryIcons';

const VolunteerImpactSummary = () => {
  const [events, setEvents] = useState(0);
  const [total, setTotalPounds] = useState(0);
  const [largestItem, setLargestItem] = useState(0);

  const { user, updateUser } = useContext(UserContext);

  useEffect(() => {
    updateUser();
    console.log(user);
    getData();
  }, []);

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
      for (const { ounces, pounds } of weightResponse.data) { totalPounds += ounces / 16 + pounds; allWeights.push(ounces / 16 + pounds); }
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

  return (
    <Box
      mb="5"
      display="flex"
      flexDirection="row"
      gap="8"
      justifyContent="center"
      alignItems={'stretch'}
      backgroundColor={'#F8F8F8'}
      borderRadius={'lg'}
      py={10}
    >
      <DataCard
        amount={events}
        text={<Text
            fontSize={'18px'}
            fontFamily={'Avenir'}
            fontWeight={500}
          >
            Total Events Participated
        </Text>}
        icon={
          <Flex background={'#96DB53'} p={2.5} borderRadius={'lg'}>
            <TotalEventsIcon></TotalEventsIcon>
          </Flex>
        }

      />
      <DataCard
        amount={total}
        text={<Text
            fontSize={'18px'}
            fontFamily={'Avenir'}
            fontWeight={500}
          >
            Total Trash Weight
          </Text>}
        icon={
          <Flex background={'#FF792E'} p={2.5} borderRadius={'lg'}>
            <TotalTrashIcon></TotalTrashIcon>
          </Flex>
        }
      />
      <DataCard
        height={'100%'}
        amount={largestItem}
        text={<Text
          fontSize={'18px'}
          fontFamily={'Avenir'}
          fontWeight={500}
        >
          Largest Trash Item Collected
        </Text>}
        icon={
          <Flex background={'#915EFF'} p={2.5} borderRadius={'lg'}>
            <LargestTrashIcon></LargestTrashIcon>
          </Flex>
        }
      />
    </Box>
  );
};

export default VolunteerImpactSummary;
