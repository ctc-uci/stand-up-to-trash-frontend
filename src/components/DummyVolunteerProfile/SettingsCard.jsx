import { Card, CardBody, Text, Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const SettingsCard = ({ icon, title, children }) => {
  return (
    <Card borderRadius="12">
      <Box
        backgroundColor={'#F7FAFC'}
        borderBottom={'1px'}
        borderColor={'#E7EDF3'}
        borderTopRadius={'12'}
      >
        <Box
          ml="20px"
          my="6px"
          textTransform={'uppercase'}
          fontWeight={'bold'}
          display="flex"
          alignItems="center"
          textColor="#2D3748"
          fontSize={14}
        >
          {icon}
          <Text ml="8px">{title}</Text>
        </Box>
      </Box>
      <CardBody>
        {/* <Text>View a summary of all your customers over the last month.</Text> */}
        {children}
      </CardBody>
    </Card>
  );
};

SettingsCard.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default SettingsCard;
