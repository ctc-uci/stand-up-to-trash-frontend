import { Box, Button, Flex, VStack, useBreakpointValue } from '@chakra-ui/react';
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
      setRegistered(parseFloat(response.data));
      response = await Backend.get('/stats/checkedIn');
      setCheckedIn(parseFloat(response.data));
      response = await Backend.get('/stats/total');
      setTotal(parseFloat(response.data));
    } catch (err) {
      console.log(`Error getting events: `, err.message);
    }
  };

  // const header = [
  //   { key: 'id', label: 'ID' },
  //   { key: 'volunteer_name', label: 'VOLUNTEER_NAME' },
  //   { key: 'number_in_party', label: 'NUMBER_IN_PARTY' },
  //   { key: 'pounds', label: 'POUNDS' },
  //   { key: 'ounces', label: 'OUNCES' },
  //   { key: 'notes', label: 'NOTES' },
  //   { key: 'event_name', label: 'EVENT_NAME' },
  //   { key: 'is_checked_in', label: 'IS_CHECKED_IN' },
  //   { key: 'image_array', label: 'IMAGE_ARRAY' },
  // ];
  const header = [
    { key: 'eventName', label: 'event_name' },
    { key: 'id', label: 'ID' },
    { key: 'volunteer_name', label: 'VOLUNTEER_NAME' },
    { key: 'number_in_party', label: 'NUMBER_IN_PARTY' },
    { key: 'pounds', label: 'POUNDS' },
    { key: 'ounces', label: 'OUNCES' },
    { key: 'notes', label: 'NOTES' },
    { key: 'is_checked_in', label: 'IS_CHECKED_IN' },
    { key: 'image_array', label: 'IMAGE_ARRAY' },
  ];

  const flexDirectionBreakpoint = useBreakpointValue(
    {
      base: 'column',
      sm: 'column',
      md: 'row',
    },
    {
      fallback: 'row',
    },
  );

  const gapBreakpoint = useBreakpointValue(
    {
      base: 0,
      sm: 0,
      md: 120,
    },
    {
      fallback: 120,
    },
  );

  useEffect(() => {
    const getEventId = async () => {
      try {
        const eventIdData = await Backend.get(`/stats/export/data`);
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
      gap="8"
      display="flex"
      flexDirection={flexDirectionBreakpoint}
      justifyContent="center"
      alignItems={'center'}
      backgroundColor={'#F8F8F8'}
      borderRadius={'lg'}
      py={10}
      p={3}
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
      <VStack gap={gapBreakpoint}>
        <Box></Box>
        <Button colorScheme={'messenger'} leftIcon={<AiOutlineExport />} size="md">
          <CSVLink
            data={eventIdData.length ? eventIdData : []}
            filename="./data.csv"
            headers={header}
          >
            Export All Data
          </CSVLink>
          {/* {eventIdData.map((eventData) => <CSVLink
            data={eventData ? [eventData] : ''}
            filename="./data.csv"
            headers={header}
          >
          </CSVLink>)} */}
          {/* Export Data */}
        </Button>
      </VStack>
    </Box>
  );
};

export default ImpactSummary;
