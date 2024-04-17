import EventFilteredGrid from '../components/Events/EventFilteredGrid';
import FeaturedDashboard from '../components/Events/FeaturedDashboard';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex } from '@chakra-ui/react';
import { useContext } from 'react';
import NavbarContext from '../utils/NavbarContext';

const VolunteerEventPage = () => {
  const { onNavbarDrawerOpen } = useContext(NavbarContext);

  return (
    <Box bg="#E6EAEF">
      <Flex
        flexDir={'column'}
        alignItems={'center'}
        bg="#E6EAEF"
        ml={{ base: '0', xl: '15rem' }}
        pt={6}
        display={{ base: 'flex', xl: 'none' }}
      >
        <Flex
          width="95%"
          flex-direction="column"
          align-items="center"
          gap="8px"
          flex-shrink="0"
          borderRadius={'xl'}
          flexDir={'column'}
        >
          <HamburgerIcon color={'#717171'} boxSize={16} onClick={onNavbarDrawerOpen} />
        </Flex>
      </Flex>

      <FeaturedDashboard />
      <EventFilteredGrid />
    </Box>
  );
};

export default VolunteerEventPage;
