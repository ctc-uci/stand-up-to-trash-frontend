import { Box, Icon, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { BsArrowDownRight, BsArrowUpRight } from 'react-icons/bs';
const TotalParticipantsCard = ({
  totalParticipants,
  totalTrash,
  participantsChange,
  trashChange,
}) => {
  return (
    <>
      <Box mt="12px" mx="11px" display="flex" flexDir="row" gap="38px" alignContent="center">
        <Box w="200px" h="173px" alignContent="center" justifyContent="center">
          <Box
            mx="13px"
            display="flex"
            flexDir="column"
            alignContent="center"
            justifyContent="center"
            gap="25px"
            h="100%"
          >
            <span style={{ textAlign: 'center' }}>
              <Icon
                as={participantsChange > 0 ? BsArrowUpRight : BsArrowDownRight}
                color={participantsChange > 0 ? 'green' : 'red'}
              />{' '}
              {participantsChange > 0 ? '+' : '-'}
              {participantsChange}%
            </span>
            <Text fontWeight="bold" textAlign={'center'}>
              {totalParticipants} <br /> total participants
            </Text>
          </Box>
        </Box>
        <Box w="200px" h="170px" alignContent>
          <Box
            mx="13px"
            display="flex"
            flexDir="column"
            alignContent="center"
            justifyContent="center"
            gap="25px"
            h="100%"
          >
            <span style={{ textAlign: 'center' }}>
              <Icon
                as={trashChange > 0 ? BsArrowUpRight : BsArrowDownRight}
                color={trashChange > 0 ? 'green' : 'red'}
              />{' '}
              {trashChange > 0 ? '+' : ''}
              {trashChange}%
            </span>
            <Text fontWeight="bold" textAlign={'center'}>
              {totalTrash} lbs <br /> total trash
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

TotalParticipantsCard.propTypes = {
  totalParticipants: PropTypes.number,
  totalTrash: PropTypes.number,
  trashChange: PropTypes.number,
  participantsChange: PropTypes.number,
};

export default TotalParticipantsCard;
