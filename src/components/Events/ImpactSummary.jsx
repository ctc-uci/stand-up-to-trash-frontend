import { Box, Heading, Button, VStack, Flex } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { AiOutlineExport } from 'react-icons/ai';
import { FaTrashCan } from 'react-icons/fa6';
import { MdPeopleAlt } from 'react-icons/md';
import { IoDocumentText } from 'react-icons/io5';
import Backend from '../../utils/utils';
import DataCard from './DataCard';

const ImpactSummary = () => {
  const [registered, setRegistered] = useState(0);
  const [checkedIn, setCheckedIn] = useState(0);
  const [total, setTotal] = useState(0);

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

  return (
    <Box>
      <Heading mb="4">Impact Summary</Heading>
      <Box
        mb="60px"
        display="flex"
        flexDirection="row"
        gap="20px"
        justifyContent="center"
        alignItems={'center'}
        backgroundColor={'#F8F8F8'}
        height="200px"
        width={'1000px'}
      >
        <DataCard
          amount={registered}
          text={'Total Registered Volunteers'}
          icon={
            <Flex
              backgroundColor="green"
              height="30px"
              width="30px"
              justifyContent={'center'}
              alignItems={'center'}
            >
              <IoDocumentText color="white" size={15}></IoDocumentText>
            </Flex>
          }
        />
        <DataCard
          amount={checkedIn}
          text={'Total Checked-In Volunteers'}
          icon={
            <Flex
              backgroundColor="purple"
              height="30px"
              width="30px"
              justifyContent={'center'}
              alignItems={'center'}
            >
              <MdPeopleAlt color="white" size={15}></MdPeopleAlt>
            </Flex>
          }
        />
        <DataCard
          amount={total}
          text={'Total Trash Weight'}
          icon={
            <Flex
              backgroundColor="orange"
              height="30px"
              width="30px"
              justifyContent={'center'}
              alignItems={'center'}
            >
              <FaTrashCan color="white" size={15} />
            </Flex>
          }
        />
        <VStack gap={110}>
          <Box></Box>
          <Button
            colorScheme={'messenger'}
            leftIcon={<AiOutlineExport></AiOutlineExport>}
            size="md"
          >
            Export Data
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default ImpactSummary;
