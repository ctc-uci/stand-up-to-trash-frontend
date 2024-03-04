import { Box, Card, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import TotalParticipantsCard from './TotalParticipants';
import ExportButton from '../ExportCSVButton/ExportButton';
import Backend from '../../utils/utils';

const weeklyTrashData = async () => {
  const resp = await Backend.get('/stats/week');
  // console.log(resp);
  return resp.data;
};

const monthlyTrashData = async () => {
  const resp = await Backend.get('/stats/month');
  // console.log(resp);
  return resp.data;
};

const yearlyTrashData = async () => {
  const resp = await Backend.get('/stats/year');
  // console.log(resp);
  return resp.data;
};

const weeklyParticipantsData = async () => {
  const resp = await Backend.get('/stats/participants/week');
  return resp.data;
};

const monthlyParticipantsData = async () => {
  const resp = await Backend.get('/stats/participants/month');
  // console.log(resp);
  return resp.data;
};

const yearlyParticipantsData = async () => {
  const resp = await Backend.get('/stats/participants/year');
  // console.log(resp);
  return resp.data;
};

const totalTrashData = async () => {
  const resp = await Backend.get('/stats');

  return resp.data;
};

const totalParticipantsData = async () => {
  const resp = await Backend.get('/stats/participants');

  return resp.data;
};

const AllData = () => {
  const [totalParticipants, setTotalParticipants] = useState(0);
  const [totalTrash, setTotalTrash] = useState(0);

  useEffect(() => {
    totalTrashData().then(data => {
      setTotalTrash(Number(data ? data : 0));
    });
    totalParticipantsData().then(data => {
      setTotalParticipants(Number(data ? data : 0));
    });
  });

  // const [trashChange, setTrashChange] = useState({ week: 2, month: 0, year: 1 });
  // const [participantsChange, setParticipantsChange] = useState({ week: 2, month: 0, year: 1 });

  // useEffect(() => {
  //   const getStats = async () => {
  //     // Get change in participants and trash over time
  //     const resp = {
  //       week: await Backend.get('/stats/week').data,
  //       month: await Backend.get('/stats/month').data,
  //       year: await Backend.get('/stats/year').data,
  //     };
  //     console.log(resp);
  //     setTrashChange(resp);
  //   };
  //   getStats();
  // }, []);

  const [trashInformation, setTrashInformation] = useState(0);
  const [participantInformation, setParticipantInformation] = useState(0);

  const weekButton = () => {
    weeklyTrashData().then(data => {
      setTrashInformation(Number(data ? data : 0));
    });
    weeklyParticipantsData().then(data => {
      setParticipantInformation(Number(data ? data : 0));
    });
  };

  const monthButton = () => {
    monthlyTrashData().then(data => {
      setTrashInformation(Number(data ? data : 0));
    });
    monthlyParticipantsData().then(data => {
      setParticipantInformation(Number(data ? data : 0));
    });
  };
  const yearButton = () => {
    yearlyTrashData().then(data => {
      setTrashInformation(Number(data ? data : 0));
    });
    yearlyParticipantsData().then(data => {
      setParticipantInformation(Number(data ? data : 0));
    });
  };

  useEffect(() => {
    // Load week data when the component mounts
    weekButton();
  }, []);

  return (
    <Box maxWidth="484px" width="100%" maxHeight="260px" height="260px" gap="30px">
      <Box my="13px">
        <Heading>overall impact</Heading>
        <Tabs
          variant="soft-rounded"
          colorScheme="green"
          paddingTop="13px"
          onChange={i => [weekButton, monthButton, yearButton][i]()}
        >
          <Box display="flex" flexDir="row" justifyContent="space-between">
            <TabList>
              <Tab>week</Tab>
              <Tab>month</Tab>
              <Tab>year</Tab>
            </TabList>
            <ExportButton eventId={-1} />
          </Box>
          <Card
            marginTop="13px"
            width="484px"
            height="192px"
            flex-shrink="0"
            display="flex"
            flexDir="row"
            alignItems="center"
            style={{
              borderRadius: '30px',
              backgroundColor: '#FFEBEF8F',
              boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
            }}
          >
            <TabPanels>
              <TabPanel p="0">
                <TotalParticipantsCard
                  totalParticipants={totalParticipants}
                  participantsChange={participantInformation}
                  totalTrash={totalTrash}
                  trashChange={trashInformation}
                />
              </TabPanel>
              <TabPanel p="0">
                <TotalParticipantsCard
                  totalParticipants={totalParticipants}
                  participantsChange={participantInformation}
                  totalTrash={totalTrash}
                  trashChange={trashInformation}
                />
              </TabPanel>
              <TabPanel p="0">
                <TotalParticipantsCard
                  totalParticipants={totalParticipants}
                  participantsChange={participantInformation}
                  totalTrash={totalTrash}
                  trashChange={trashInformation}
                />
              </TabPanel>
            </TabPanels>
          </Card>
        </Tabs>
      </Box>
    </Box>
  );
};

export default AllData;
