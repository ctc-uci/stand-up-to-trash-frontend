import { Button, Box, Card, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons'
import TotalParticipantsCard from './TotalParticipants';

const AllData = () => {
  const totalP = 23;
  const totalT = 23;
  return (
    <Box maxWidth="484px" width="100%" maxHeight="260px" height="260px" gap='30px'>
      <Box my="13px">
        <Heading>overall impact</Heading>
          <Tabs variant="soft-rounded" colorScheme="green" paddingTop='13px'>
          <Box display='flex' flexDir='row' justifyContent='space-between'>
            <TabList>
              <Tab>week</Tab>
              <Tab>month</Tab>
              <Tab>year</Tab>
            </TabList>
            <Button background='#EC8BAE' color='white' style={{borderRadius: '30px'}}><ExternalLinkIcon marginRight='5px'/> export overall data</Button>
          </Box>
          <Card marginTop='13px' width='484px' height='192px' flex-shrink='0' display='flex' flexDir='row' alignItems='center' style={{ borderRadius: '30px', backgroundColor: "#FFEBEF8F", boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}}>
            
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
          </Card>  
        </Tabs>
      </Box>
    </Box>
  );
};

export default AllData;
