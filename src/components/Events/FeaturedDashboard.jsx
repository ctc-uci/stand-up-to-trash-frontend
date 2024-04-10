import { Heading, Flex, Grid, GridItem } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Backend from '../../utils/utils';
import EventCard from './EventCard';

const FeaturedDashboard = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);

  const getEvents = async () => {
    try {
      const eventsData = await Backend.get('/events');
      setFeaturedEvents(eventsData.data.slice(0, 2));
    } catch (err) {
      console.log(`Error getting events: `, err.message);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <Flex
      flexDir={'column'}
      alignItems={'center'}
      bg="#E6EAEF"
      ml={{ base: '0', xl: '15rem' }}
      pt={10}
    >
      <Flex
        width="95%"
        pb="8px"
        flex-direction="column"
        align-items="center"
        gap="8px"
        flex-shrink="0"
        borderRadius={'xl'}
        flexDir={'column'}
      >
        <Heading fontWeight={900} fontSize={32} fontFamily={'Avenir'} color={'rgba(0, 0, 0, 0.75)'}>
          Featured Events
        </Heading>
      </Flex>
      <Flex
        width="95%"
        pt="10px"
        flex-direction="column"
        align-items="center"
        gap="8px"
        flex-shrink="0"
        borderRadius={'xl'}
        flexDir={'column'}
      >
        <Grid templateColumns="repeat(2, 1fr)" gap={6}>
          {featuredEvents.map(element => (
            <GridItem key={element.id}>
              <EventCard
                {...element}
                isSelected={false}
                handleCheckboxChange={() => {}}
                getEvents={() => {}}
                isFeatured={true}
              />
            </GridItem>
          ))}
        </Grid>
      </Flex>
    </Flex>
  );
};

export default FeaturedDashboard;
