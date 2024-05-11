import { Text, Flex, Image } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Backend from '../../utils/utils.js';
import first from '../../Assets/leaderboard_icon/first.png';

const LeaderboardCard = ({ event_id }) => {
  const [topThree, setTopThree] = useState([]);

  const getTopThree = async () => {
    try {
      if (event_id === -1) {
        const topThreeData = await Backend.get('/stats/leaderboard');
        setTopThree(topThreeData.data);
      } else {
        const topThreeData = await Backend.get(`/stats/leaderboard/${event_id}`);
        setTopThree(topThreeData.data);
      }
    } catch (err) {
      console.log(`Error getting top three volunteers: `, err.message);
    }
  };

  const truncate = (num, decimalPlaces) => {
    const factor = Math.pow(10, decimalPlaces);
    return Math.floor(num * factor) / factor;
  };

  const ActualLeaderboard = ({ LeaderboardArray }) => {
    return (
      <>
        <Flex
          display="flex"
          flexDir="column"
          justifyContent="center"
          width={250}
          h={200}
          rounded={8}
          p={30}
          overflowY={'scroll'}
        >
          <Text fontWeight="sm" textAlign="center" fontSize={'large'} pt={30} pb={4}>
            Leaderboard
          </Text>

          <Flex direction={'column'} gap={2}>
            {/* 1ST PLACE */}
            <Flex
              bgColor="#D4E4F9"
              color="#1873FB"
              borderRadius={'md'}
              alignItems={'center'}
              gap={3}
              fontSize={{ base: '16px', xl: '16px' }}
              px={2}
              py={3}
              maxW={'100%'}
            >
              <Flex gap={2} alignItems={'center'} w={'9rem'}>
                <Flex justifyContent={'center'} w={6}>
                  <Image src={first} />
                </Flex>
                <Text
                  fontWeight="bold"
                  fontSize={{ base: '16px', xl: '16px' }}
                  w="auto"
                  overflow={'hidden'}
                  textOverflow={'ellipsis'}
                  whiteSpace="nowrap"
                >
                  {LeaderboardArray[0] && LeaderboardArray[0].volunteer_first_name}{' '}
                  {LeaderboardArray[0] && LeaderboardArray[0].volunteer_last_name}
                </Text>
              </Flex>
              <Text fontWeight="bold" whiteSpace="nowrap">
                {LeaderboardArray[0] && truncate(LeaderboardArray[0].total_weight, 2)} lb
              </Text>
            </Flex>

            {/* 2ND PLACE */}
            <Flex
              color="black"
              borderRadius={'md'}
              alignItems={'center'}
              gap={3}
              fontSize={{ base: '16px', xl: '16px' }}
              px={2}
              maxW={'100%'}
            >
              <Flex gap={{ base: '2', xl: '4' }} alignItems={'center'} w={'9rem'}>
                <Flex justifyContent={'center'}>
                  <Text color="#1873FB" fontWeight={'medium'} fontSize={24}>
                    2
                  </Text>
                </Flex>

                <Text
                  fontWeight="medium"
                  fontSize={{ base: '16px', xl: '16px' }}
                  textAlign="center"
                  whiteSpace="nowrap"
                  maxWidth={20}
                  overflow="hidden"
                  textOverflow={'ellipsis'}
                >
                  {LeaderboardArray[1] && LeaderboardArray[1].volunteer_first_name}{' '}
                  {LeaderboardArray[1] && LeaderboardArray[1].volunteer_last_name}
                </Text>
              </Flex>

              <Text fontWeight="medium" fontSize={{ base: '14px', xl: '16px' }} whiteSpace="nowrap">
                {LeaderboardArray[1] && truncate(LeaderboardArray[1].total_weight, 2)} lb
              </Text>
            </Flex>

            {/* 3RD PLACE */}
            <Flex
              borderRadius={'md'}
              alignItems={'center'}
              gap={{ base: '2', xl: '3' }}
              fontSize={{ base: '16px', xl: 'lg' }}
              px={2}
              maxW={'100%'}
            >
              <Flex gap={{ base: '2', xl: '4' }} alignItems={'center'} w={'9rem'}>
                <Flex justifyContent={'center'}>
                  <Text color="#1873FB" fontWeight={'medium'} fontSize={24}>
                    3
                  </Text>
                </Flex>
                <Text
                  fontWeight="medium"
                  fontSize={{ base: '16px', xl: '16px' }}
                  textAlign="center"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow={'ellipsis'}
                  maxWidth={20}
                >
                  {LeaderboardArray[2] && LeaderboardArray[2].volunteer_first_name}{' '}
                  {LeaderboardArray[2] && LeaderboardArray[2].volunteer_last_name}
                </Text>
              </Flex>
              <Text fontWeight="medium" fontSize={{ base: '14px', xl: '16px' }} whiteSpace="nowrap">
                {LeaderboardArray[2] && truncate(LeaderboardArray[2].total_weight, 2)} lb
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </>
    );
  };

  ActualLeaderboard.propTypes = {
    LeaderboardArray: PropTypes.array.isRequired,
  };

  useEffect(() => {
    getTopThree();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event_id]);

  return (
    <>
      {/* <Card
        borderRadius="lg"
        p={3}
        shadow={'none'}
        w={{ base: '288px', xl: '100%' }}
        h={{ base: '212px', xl: '80%' }}
      >
        
      </Card> */}
      <ActualLeaderboard LeaderboardArray={topThree} />
    </>
  );
};

LeaderboardCard.propTypes = {
  event_id: PropTypes.number.isRequired,
};

export default LeaderboardCard;
