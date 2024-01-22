import { Text } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

const DummyCheckin = () => {
  const { id } = useParams();
  return <Text>Placeholder for Checkin Page id {id}</Text>;
};

export default DummyCheckin;
