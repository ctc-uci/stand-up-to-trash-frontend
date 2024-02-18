import { Box, Card, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Backend from '../../utils/utils.js';

const LeaderboardCard = () => {
    const [topThree, setTopThree] = useState([]);

    const getTopThree = async () => {
        try {
          const topThreeData = await Backend.get('/stats/leaderboard');
          console.log(topThreeData);
          setTopThree(topThreeData.data);
        } catch (err) {
          console.log(`Error getting top three volunteers: `, err.message);
        }
    };

    const truncate = (num, decimalPlaces) => {
        const factor = Math.pow(10, decimalPlaces);
        return Math.floor(num * factor) / factor;
    };    

    useEffect(() => {
        getTopThree();
    }, []);

  return (
    <> 
        <Card borderRadius='0px 15px 15px 0px'>
            <Box
                width='331px'
                height='195px'
                mx="13px"
                my="19px"
                display="flex"
                flexDir="column"
                alignContent="center"
                justifyContent="center"
                gap="9px"
                h="100%"
            >
                <Text fontWeight='bold' decoration='underline' textAlign='center'>top 3 volunteers</Text>
                <Box mx='23px' bgColor='#2D558A' color='white' borderRadius='60px' padding='2px'>
                    <Text fontWeight='bold' color='white' textAlign='center'>{topThree[0] && topThree[0].volunteer_first_name} {topThree[0] && topThree[0].volunteer_last_name} ........... {topThree[0] && truncate(topThree[0].total_weight, 2)} lbs</Text>
                </Box>
                <Text fontWeight='bold' textAlign='center'>{topThree[1] && topThree[1].volunteer_first_name} {topThree[1] && topThree[1].volunteer_last_name} ............ {topThree[1] && truncate(topThree[1].total_weight, 2)} lbs</Text>
                <Text fontWeight='bold' textAlign='center'>{topThree[2] && topThree[2].volunteer_first_name} {topThree[2] && topThree[2].volunteer_last_name} ........... {topThree[2] && truncate(topThree[2].total_weight, 2)} lbs</Text>
            </Box>
        </Card>
    </>
  );
};

export default LeaderboardCard;