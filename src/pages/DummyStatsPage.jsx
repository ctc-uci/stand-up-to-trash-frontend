import { Card, CardBody, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Backend from '../utils/utils';

const DummyStatsPage = () => {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    getVolunteerData().then(data => setStats(data));
  }, []);
  return (
    <Card m="8">
      <CardBody>
        <Text>
          All events
          <br />
          <br />
          total trash:
          <br />
          {stats} pounds
        </Text>
      </CardBody>
    </Card>
  );
};

const getVolunteerData = async () => {
  const resp = await Backend.get('/stats');
  return resp.data;
};

export default DummyStatsPage;
