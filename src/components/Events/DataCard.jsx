import { Text, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
const DataCard = ({ icon, text, amount }) => {
  return (
    <VStack bg="white" p={25} borderRadius="lg" align="center" w={'23%'}>
      {icon}
      <Text textAlign={'center'} fontWeight={'medium'} fontSize={20}>
        {text}
      </Text>
      <Text textAlign={'center'} fontSize={50} fontWeight={'bold'} color={'rgba(0, 0, 0, 0.75)'}>
        {amount}
      </Text>
    </VStack>
  );
};

DataCard.propTypes = {
  amount: PropTypes.number,
  text: PropTypes.string,
  icon: PropTypes.element,
};

export default DataCard;
