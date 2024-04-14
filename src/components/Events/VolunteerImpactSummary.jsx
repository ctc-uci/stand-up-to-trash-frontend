import { Box, Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaTrashCan } from 'react-icons/fa6';
import { IoDocumentText } from 'react-icons/io5';
import { MdPeopleAlt } from 'react-icons/md';
import Backend from '../../utils/utils';
import DataCard from './DataCard';

const VolunteerImpactSummary = () => {
  const [events, setEvents] = useState(0);
  const [total, setTotalPounds] = useState(0);
  const [largestItem, setLargestItem] = useState(0);

  // mock volunteer object so i can push for now; delete after
  const volunteer = {
    id: '123',
    name: 'John Doe',
    email: 'johndoe@example.com',
    ounces: '5',
    pounds: '10'
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
    let totalPounds = 0; 
      // need to get and set the volunteer id here
      let response = await Backend.get(`/data/volunteer/${volunteer.id}/event`);
      console.log(response.data.length);
      setEvents(response.data.length);
      response = await Backend.get(`/data/volunteer/${volunteer.id}`);
      for (const { ounces, pounds } of response.data) { totalPounds += ounces / 16 + pounds; }
      console.log(totalPounds);
    setTotalPounds(parseFloat(totalPounds));
      response = await Backend.get(`/data/volunteer/${volunteer.id}`);
      console.log(response.data);
      // lol need to fix; this is prolly going to error
      setLargestItem(parseFloat(['max_weight']));
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
