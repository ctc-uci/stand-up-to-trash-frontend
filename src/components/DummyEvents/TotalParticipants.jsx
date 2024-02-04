import { Box, Icon, Text } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { BsArrowDownRight, BsArrowUpRight } from 'react-icons/bs';
const TotalParticipantsCard = ({ totalParticipants, totalTrash }) => {
  return (
    <>
      <Box mt="12px" mx="11px" display="flex" flexDir="row" gap="38px" alignContent="left">
        <Box backgroundColor="#E7E7E7" w="200px" h="173px">
          <Box
            mx="13px"
            display="flex"
            flexDir="column"
            alignContent="center"
            justifyContent="center"
            gap="25px"
            h="100%"
          >
            <Text>total participants</Text>
            <span>
              <Icon as={BsArrowUpRight} /> + {totalParticipants}%
            </span>
          </Box>
        </Box>
        <Box backgroundColor="#E7E7E7" w="200px" h="170px">
          <Box
            mx="13px"
            display="flex"
            flexDir="column"
            alignContent="center"
            justifyContent="center"
            gap="25px"
            h="100%"
          >
            <Text>total trash</Text>
            <span>
              <Icon as={BsArrowDownRight} /> - {totalTrash}%
            </span>
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
