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
    <Flex minW="95%" flexDir={'column'}>
      <Heading mb="8">Impact Summary</Heading>
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
          <Button
            colorScheme={'messenger'}
            leftIcon={<AiOutlineExport></AiOutlineExport>}
            size="md"
          >
            Export Data
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};

export default ImpactSummary;
