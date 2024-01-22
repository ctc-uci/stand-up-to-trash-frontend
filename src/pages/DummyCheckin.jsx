import { Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const DummyCheckin = () => {
  const { eventId } = useParams();
  return <Text>Placeholder for Checkin Page id {eventId}</Text>;
};

export default DummyCheckin;
