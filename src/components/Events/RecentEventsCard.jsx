import { Box, Button, Card, Heading, Icon, Text } from '@chakra-ui/react';
import { BsArrowDownRight, BsArrowUpRight } from 'react-icons/bs';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import PropTypes from 'prop-types';
const RecentEventsCard = ({ events }) => {
  const [eventIndex, setEventIndex] = useState(0);

  const handlePrevious = () => {
    let next = eventIndex - 1;
    if (eventIndex <= 0) next = events.length - 1;
    setEventIndex(next);
  };

  const handleNext = () => {
    setEventIndex((eventIndex + 1) % events.length);
  };

  return (
    <Box maxWidth="434px" width="100%" height="280px">
      <Box my="13px" mx="25px">
        <Heading>most recent event</Heading>
        <Box mt="12px" display="flex" flexDir="row" gap="14px">
          <Card
            width="411px"
            height="240px"
            flexShrink="0"
            backgroundColor="#FFEBEF8F"
            display="flex"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
            borderRadius="30px"
            boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
          >
            <Heading fontSize="20px">
              <u>{events.length > 0 ? events[eventIndex].name : ''}</u>
            </Heading>
            <Box display="flex" flexDir="row" alignItems="center" justifyContent="center">
              <Button variant="ghost" width="20px" onClick={handlePrevious}>
                <ChevronLeftIcon />
              </Button>
              <Box w="170px" h="170px">
                <Box
                  mx="13px"
                  display="flex"
                  flexDir="column"
                  alignContent="center"
                  justifyContent="center"
                  gap="3px"
                  h="100%"
                >
                  <span>
                    <Icon as={BsArrowUpRight} /> + 23%
                  </span>
                  <Text fontWeight="bold">236</Text>
                  <Text fontWeight="bold">total participants</Text>
                </Box>
              </Box>
              <Box w="170px" h="170px">
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
                    <Icon as={BsArrowDownRight} /> - 3%
                  </span>
                  <Text fontWeight="bold">491 lbs</Text>
                  <Text fontWeight="bold">total trash</Text>
                </Box>
              </Box>
              <Button variant="ghost" width="20px" _hover={{ color: 'None' }} onClick={handleNext}>
                <ChevronRightIcon />
              </Button>
            </Box>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

RecentEventsCard.propTypes = {
  events: PropTypes.array,
};

export default RecentEventsCard;
