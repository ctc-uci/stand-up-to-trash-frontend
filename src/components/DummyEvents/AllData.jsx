import { Box, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import TotalParticipantsCard from './TotalParticipants';

const AllData = () => {
  const totalP = 23;
  const totalT = 23;
  return (
    <Box maxWidth="434px" width="100%" maxHeight="260px" height="260px">
      <Box my="13px">
        <Heading>all data</Heading>
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab>weekly</Tab>
            <Tab>monthly</Tab>
            <Tab>yearly</Tab>
          </TabList>
          <TabPanels>
            <TabPanel p="0">
              <TotalParticipantsCard totalParticipants={totalP} totalTrash={totalT} />
            </TabPanel>
            <TabPanel p="0">
              <TotalParticipantsCard totalParticipants={totalP} totalTrash={totalT} />
            </TabPanel>
            <TabPanel p="0">
              <TotalParticipantsCard totalParticipants={totalP} totalTrash={totalT} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default AllData;
