import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState, useContext } from 'react';
import { FaTrashCan } from 'react-icons/fa6';
import { IoDocumentText } from 'react-icons/io5';
import { MdPeopleAlt } from 'react-icons/md';
import UserContext from '../../utils/UserContext';
import Backend from '../../utils/utils';
import DataCard from './DataCard';

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
      alignItems={'center'}
      backgroundColor={'#F8F8F8'}
      borderRadius={'lg'}
      py={10}
    >
      <DataCard
        amount={events}
        text={'Total Events Participated'}
        icon={
          <Flex background={'#96DB53'} p={2.5} borderRadius={'lg'}>
            <IoDocumentText color="white" size={20}></IoDocumentText>
          </Flex>
        }
      />
      <DataCard
        amount={total}
        text={'Total Trash Weight'}
        icon={
          <Flex background={'#915EFF'} p={2.5} borderRadius={'lg'}>
            <MdPeopleAlt color="white" size={20}></MdPeopleAlt>
          </Flex>
        }
      />
      <DataCard
        amount={largestItem}
        text={'Largest Trash Item Collected'}
        icon={
          <Flex background={'#FF792E'} p={2.5} borderRadius={'lg'}>
            <FaTrashCan color="white" size={20} />
          </Flex>
        }
      />
    </Box>
  );
};

export default VolunteerImpactSummary;
