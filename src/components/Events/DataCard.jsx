import { Card, Text, Stack, CardBody } from '@chakra-ui/react';
import PropTypes from 'prop-types';
const DataCard = ({ icon, text, amount }) => {
  return (
    <Card
      align="center"
      width="235px"
      height="150px"
      flexShrink="0"
      backgroundColor="white"
      display="flex"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
    >
      <CardBody textAlign={'center'} alignItems={'center'}>
        <Stack align="center">
          {icon}
          <Text marginTop={-2} fontSize={15}>
            {text}
          </Text>
          <Text fontWeight={'bold'} marginTop={-2} fontSize={30}>
            {amount}
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
};

DataCard.propTypes = {
  amount: PropTypes.number,
  text: PropTypes.string,
  icon: PropTypes.element,
};

export default DataCard;
