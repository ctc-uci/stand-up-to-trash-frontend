import { Text, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';
const DataCard = ({ icon, text, amount }) => {
  return (
    <VStack bg="white" pt={25} pb={2} borderRadius="lg" align="center" w={'25%'}>
      {icon}
      <Text textAlign={'center'} fontWeight={500} fontSize={18} fontFamily={'Avenir'}>
        {text}
      </Text>
      <Text textAlign={'center'} fontSize={56} fontWeight={800} color={'rgba(0, 0, 0, 0.75)'} fontFamily={'Avenir'}>
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
