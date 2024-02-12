import { Box, Icon, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { BsArrowDownRight, BsArrowUpRight } from 'react-icons/bs';
const TotalParticipantsCard = ({ totalParticipants, totalTrash }) => {
  return (
    <>
      <Box mt="12px" mx="11px" display="flex" flexDir="row" gap="38px" alignContent="center">
        <Box w="200px" h="173px" alignContent='center' justifyContent='center'>
          <Box
            mx="13px"
            display="flex"
            flexDir="column"
            alignContent="center"
            justifyContent="center"
            gap="25px"
            h="100%"
          >
            <span>
              <Icon as={BsArrowUpRight} /> + {totalParticipants}%
            </span>
            <Text fontWeight='bold'>total participants</Text>
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
            <span>
              <Icon as={BsArrowDownRight} /> - {totalTrash}%
            </span>
            <Text fontWeight='bold'>total trash</Text>
          </Box>
        </Box>
      </Box>
    </>
  );
};

TotalParticipantsCard.propTypes = {
  totalParticipants: PropTypes.number,
  totalTrash: PropTypes.number,
};

export default TotalParticipantsCard;
