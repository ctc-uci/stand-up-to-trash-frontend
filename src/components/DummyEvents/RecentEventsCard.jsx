import { Box, Heading, Icon, Text } from '@chakra-ui/react';
import { BsArrowDownRight, BsArrowUpRight } from 'react-icons/bs';
const RecentEventsCard = () => {
  return (
    <Box backgroundColor="#F3F3F3" maxWidth="434px" width="100%" height="280px">
      <Box my="13px" mx="25px">
        <Heading>recent event</Heading>

        <Box mt="12px" mx="11px" display="flex" flexDir="row" gap="14px">
          <Box backgroundColor="#E7E7E7" w="170px" h="170px">
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
                <Icon as={BsArrowUpRight} /> + 23%
              </span>
            </Box>
          </Box>
          <Box backgroundColor="#E7E7E7" w="170px" h="170px">
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
                <Icon as={BsArrowDownRight} /> - 3%
              </span>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RecentEventsCard;
