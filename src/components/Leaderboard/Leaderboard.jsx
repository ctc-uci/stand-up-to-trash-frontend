import { Card, Text, Flex, Image } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Backend from '../../utils/utils.js';
import first from '../../Assets/leaderboard_icon/first.png';
import second from '../../Assets/leaderboard_icon/second.png';
import third from '../../Assets/leaderboard_icon/third.png';

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
          mx="13px"
          my="19px"
          display="flex"
          flexDir="column"
          alignContent="center"
          justifyContent="center"
          gap="9px"
          h="100%"
        >
          <Text fontSize={'xl'} fontWeight="sm" textAlign="center">
            Leaderboard
          </Text>

          {/* 1ST PLACE */}
          <Flex
            bgColor="#D4E4F9"
            color="#1873FB"
            borderRadius={'md'}
            px={3}
            py={2}
            alignItems={'center'}
            gap={3}
          >
            <Flex gap={4} alignItems={'center'}>
              <Flex justifyContent={'center'} w={'30px'}>
                <Image src={first} />
              </Flex>
              <Text fontWeight="bold" textAlign="center">
                {LeaderboardArray[0] && LeaderboardArray[0].volunteer_first_name}{' '}
                {LeaderboardArray[0] && LeaderboardArray[0].volunteer_last_name}
              </Text>
            </Flex>
            <Text fontWeight="bold">
              {LeaderboardArray[0] && truncate(LeaderboardArray[0].total_weight, 2)} lb
            </Text>
          </Flex>

          {/* 2ND PLACE */}
          <Flex color="black" borderRadius={'md'} px={3} py={2} alignItems={'center'} gap={3}>
            <Flex gap={4} alignItems={'center'}>
              <Flex justifyContent={'center'} w={'30px'}>
                <Image w={'50%'} src={second} />
              </Flex>
              <Text fontWeight="medium" textAlign="center">
                {LeaderboardArray[1] && LeaderboardArray[1].volunteer_first_name}{' '}
                {LeaderboardArray[1] && LeaderboardArray[1].volunteer_last_name}
              </Text>
            </Flex>
            <Text fontWeight="medium">
              {LeaderboardArray[1] && truncate(LeaderboardArray[1].total_weight, 2)} lb
            </Text>
          </Flex>

          {/* 3RD PLACE */}
          <Flex borderRadius={'md'} px={3} py={2} alignItems={'center'} gap={3}>
            <Flex gap={4} alignItems={'center'}>
              <Flex justifyContent={'center'} w={'30px'}>
                <Image w={'50%'} src={third} />
              </Flex>
              <Text fontWeight="medium" textAlign="center">
                {LeaderboardArray[2] && LeaderboardArray[2].volunteer_first_name}{' '}
                {LeaderboardArray[2] && LeaderboardArray[2].volunteer_last_name}
              </Text>
            </Flex>
            <Text fontWeight="medium">
              {LeaderboardArray[2] && truncate(LeaderboardArray[2].total_weight, 2)} lb
            </Text>
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
  }, []);

  return (
    <>
      <Card borderRadius="0px 15px 15px 0px">
        <ActualLeaderboard LeaderboardArray={topThree} />
      </Card>
    </>
  );
};

LeaderboardCard.propTypes = {
  event_id: PropTypes.number.isRequired,
};

export default LeaderboardCard;
