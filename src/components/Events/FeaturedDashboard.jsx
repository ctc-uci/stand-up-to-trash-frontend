import { Heading, Flex, Grid, GridItem, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { useState, useEffect, useContext } from 'react';
import Backend from '../../utils/utils';
import EventCard from './EventCard';
import { RxCaretLeft } from 'react-icons/rx';
import PropTypes from 'prop-types';

import UserContext from '../../utils/UserContext';

const FeaturedDashboard = ({
  setCurrentEventId,
  setIsOpen,
  setShowOpenDrawerButton,
  onOpen,
  showOpenDrawerButton,
}) => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const numEvents = useBreakpointValue({ base: 1, md: 2, xl: 2 });

  const { user } = useContext(UserContext);

  const getEvents = async () => {
    try {
      const eventsData = await Backend.get(`/data/unregistered/${user.id}`);
      setFeaturedEvents(eventsData.data.slice(0, numEvents));
    } catch (err) {
      console.log(`Error getting events: `, err.message);
    }
  };

  useEffect(() => {
    getEvents();
  }, [numEvents]);

  return (
    // Flag: Navbar responsive (Use 15%)
    <Flex
      flexDir={'column'}
      alignItems={'center'}
      bg="#E6EAEF"
      ml={{ base: '3vw', xl: '15rem' }}
      mr={{ base: '3vw' }}
      pt={4}
    >
      <Flex
        width={{ base: '100%', xl: '95%' }}
        p={{ base: '20px' }}
        pb="8px"
        align-items="center"
        justifyContent={'space-between'}
        gap="8px"
        flex-shrink="0"
        borderRadius={'xl'}
        flexDir={'row'}
      >
        <Flex w="80%">
          <Heading
            w="100%"
            fontWeight={{ base: 600, xl: 900 }}
            lineHeight="normal"
            fontStyle="normal"
            fontSize={{ base: '18px', xl: '32px' }}
            color={'rgba(0, 0, 0, 0.75)'}
          >
            Featured Events
          </Heading>
        </Flex>
        <Flex w="40px">
          <IconButton
            borderRadius="md"
            borderColor="#EFEFEF"
            bg="white"
            variant={'outline'}
            borderWidth={'0.2em'}
            h="40px"
            w="40px"
            icon={<RxCaretLeft size={22} />}
            onClick={() => {
              // onDrawerOpen();
              // Conditionally call here???
              onOpen();
              setIsOpen(true);
              setShowOpenDrawerButton(false);
            }}
            display={showOpenDrawerButton ? 'flex' : 'none'}
          />
        </Flex>
      </Flex>
      <Flex
        width="96%"
        ml={{ xl: 3 }}
        pt="10px"
        flex-direction="column"
        align-items="center"
        gap="8px"
        flex-shrink="0"
        borderRadius={'xl'}
        flexDir={'column'}
      >
        <Grid
          templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', xl: 'repeat(2, 1fr)' }}
          gap={6}
        >
          {featuredEvents.map(element => (
            <GridItem
              key={element.id}
              onClick={() => {
                setCurrentEventId(element.id);
                setIsOpen(true);
                setShowOpenDrawerButton(false);
              }}
            >
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
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  showOpenDrawerButton: PropTypes.bool,
  setCurrentEventId: PropTypes.func.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  setShowOpenDrawerButton: PropTypes.func.isRequired,
};

export default FeaturedDashboard;
