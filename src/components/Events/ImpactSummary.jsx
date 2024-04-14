import { Box, Button, Flex, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { AiOutlineExport } from 'react-icons/ai';
import { FaTrashCan } from 'react-icons/fa6';
import { IoDocumentText } from 'react-icons/io5';
import { MdPeopleAlt } from 'react-icons/md';
import Backend from '../../utils/utils';
import DataCard from './DataCard';
import { CSVLink } from 'react-csv';

const ImpactSummary = () => {
  const [registered, setRegistered] = useState(0);
  const [checkedIn, setCheckedIn] = useState(0);
  const [total, setTotal] = useState(0);
  const [eventIdData, setEventIdData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      let response = await Backend.get('/stats/registered');
      console.log(response.data);
      setRegistered(parseFloat(response.data));
      response = await Backend.get('/stats/checkedIn');
      setCheckedIn(parseFloat(response.data));
      response = await Backend.get('/stats/total');
      setTotal(parseFloat(response.data));
    } catch (err) {
      console.log(`Error getting events: `, err.message);
    }
  };

  const header = [
    { key: 'event_id', label: 'EVENT_ID' },
    { key: 'id', label: 'ID' },
    { key: 'is_checked_in', label: 'IS_CHECKED_IN' },
    { key: 'number_in_party', label: 'NUMBER_IN_PARTY' },
    { key: 'ounces', label: 'OUNCES' },
    { key: 'pounds', label: 'POUNDS' },
    { key: 'unusual_items', label: 'UNUSUAL_ITEMS' },
    { key: 'volunteer_id', label: 'VOLUNTEER_ID' },
  ];

  useEffect(() => {
    const getEventId = async () => {
      try {
        const eventIdData = await Backend.get(`/data/`);
        setEventIdData(eventIdData.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    getEventId();
  }, []);

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
        amount={registered}
        text={'Total Registered Volunteers'}
        icon={
          <Flex background={'#96DB53'} p={2.5} borderRadius={'lg'}>
            <IoDocumentText color="white" size={20}></IoDocumentText>
          </Flex>
        }
      />
      <DataCard
        amount={checkedIn}
        text={'Total Checked-In Volunteers'}
        icon={
          <Flex background={'#915EFF'} p={2.5} borderRadius={'lg'}>
            <MdPeopleAlt color="white" size={20}></MdPeopleAlt>
          </Flex>
        }
      />
      <DataCard
        amount={total}
        text={'Total Trash Weight'}
        icon={
          <Flex background={'#FF792E'} p={2.5} borderRadius={'lg'}>
            <FaTrashCan color="white" size={20} />
          </Flex>
        }
      />
      <VStack gap={120}>
        <Box></Box>
        <Button colorScheme={'messenger'} leftIcon={<AiOutlineExport></AiOutlineExport>} size="md">
          <CSVLink data={eventIdData} filename="./data.csv" headers={header}>
            Export Data
          </CSVLink>
        </Button>
      </VStack>
    </Box>
  );
};

export default ImpactSummary;
