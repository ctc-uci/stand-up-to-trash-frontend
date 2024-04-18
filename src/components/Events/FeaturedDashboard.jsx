import {Heading, Flex, Grid, GridItem, IconButton} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Backend from '../../utils/utils';
import EventCard from './EventCard';
import {RxCaretLeft} from 'react-icons/rx';
import PropTypes from 'prop-types';

const FeaturedDashboard = ({onOpen, showOpenDrawerButton}) => {
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
      pt={4}
    >
      <Flex
        width="95%"
        pb="8px"
        align-items="center"
        justifyContent={"space-between"}
        gap="8px"
        flex-shrink="0"
        borderRadius={'xl'}
        flexDir={'row'}
      >
        <Flex w="70%">
          <Heading fontWeight={900} fontSize={32} fontFamily={'Avenir'} color={'rgba(0, 0, 0, 0.75)'}>
            Featured Events
          </Heading>
        </Flex>
        <Flex w="40px">
          <IconButton
                borderRadius="md"
                borderColor="#EFEFEF"
                bg="white"
                variant={"outline"}
                borderWidth={'0.2em'}
                h="40px"
                w="40px"
                icon={<RxCaretLeft size={22}/>}
                onClick={onOpen}
                display={showOpenDrawerButton ? { base: 'none', xl: 'flex' } : 'none'}

          ></IconButton>
        </Flex>
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

FeaturedDashboard.propTypes = {
  onOpen: PropTypes.func,
  showOpenDrawerButton: PropTypes.bool,
};

export default FeaturedDashboard;
