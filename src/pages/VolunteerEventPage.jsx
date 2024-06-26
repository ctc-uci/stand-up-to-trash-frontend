import EventFilteredGrid from '../components/Events/EventFilteredGrid';
import FeaturedDashboard from '../components/Events/FeaturedDashboard';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex, Spacer } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import NavbarContext from '../utils/NavbarContext';
import VolunteerSideView from '../components/VolunteerSideView.jsx';
import { useBreakpoint, useDisclosure } from '@chakra-ui/react';
import VolunteerSideViewDrawer from '../components/VolunteerSideViewDrawer.jsx';

const VolunteerEventPage = () => {
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(!isOpen);

  const { onNavbarDrawerOpen } = useContext(NavbarContext);
  const [currentEventId, setCurrentEventId] = useState(null); // Initial state is null to indicate no event selected
  const breakpoint = useBreakpoint();
  const [showOpenDrawerButton, setShowOpenDrawerButton] = useState(false);

  const openEventDrawer = eventId => {
    setCurrentEventId(eventId); // Set the current event ID, which triggers the side view to display
    setShowOpenDrawerButton(false);
    onDrawerOpen();
  };


  console.log('test' + currentEventId);

  return (
    <Flex dir="column">
      {/* <RegistrationModal /> */}
      <Box bg="#E6EAEF" flexGrow={1} minW="1px" minH={'100vh'}>
        <Flex
          flexDir={'row'}
          alignItems={'center'}
          bg="#E6EAEF"
          ml={{ base: '0', xl: '15%' }}
          pt={6}
          px={6}
          justifyContent={'space-between'}
          // display={{ base: 'flex', xl: 'none' }}
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
            <HamburgerIcon
              color={'#717171'}
              boxSize={{ base: 10, md: 16 }}
              onClick={onNavbarDrawerOpen}
              display={{ base: 'flex', xl: 'none' }}
            />
          </Flex>
          <Flex>
            <Spacer />
          </Flex>
          <Flex
            flex-direction="column"
            justifySelf={'end'}
            alignSelf={'end'}
            gap="8px"
            flex-shrink="0"
            borderRadius={'xl'}
            flexDir={'column'}
          ></Flex>
        </Flex>
        <FeaturedDashboard
          width={{ base: '90%' }}
          onOpen={onDrawerOpen}
          setCurrentEventId={setCurrentEventId}
          setIsOpen={setIsOpen}
          setShowOpenDrawerButton={setShowOpenDrawerButton}
          showOpenDrawerButton={showOpenDrawerButton}
          isOpen={isDrawerOpen}
          isSideBarOpen={isOpen}
        />
        <EventFilteredGrid
          width={{ base: '90%' }}
          setCurrentEventId={openEventDrawer} // Adjusted to call `openEventDrawer`
          setIsOpen={setIsOpen}
          setShowOpenDrawerButton={setShowOpenDrawerButton}
          isOpen={isOpen}
          onlyUnregistered={true}
        />
      </Box>
      {/* Drawer Component */}
      {breakpoint != 'xl' ? (
        <VolunteerSideViewDrawer
          eventId={currentEventId}
          isOpen={isDrawerOpen}
          onClose={onDrawerClose}
          setShowOpenDrawerButton={setShowOpenDrawerButton}
        />
      ) : (
        // Flag: Need responsive
        <Box
          w={{
            base: isOpen ? '100%' : '0',
            md: isOpen ? '480px' : '0',
            lg: isOpen ? '480px' : '0',
            xl: isOpen ? '28%' : '0',
          }}
          flexShrink={0}
        >
          <Box pos={'fixed'} right={'0'} top={'0'} h={'100%'} overflowY={'auto'} paddingBottom={10}>
            {isOpen && (
              <VolunteerSideView
                eventId={currentEventId}
                onClose={onClose}
                setShowOpenDrawerButton={setShowOpenDrawerButton}
              />
            )}
          </Box>
        </Box>
      )}
    </Flex>
  );
};
export default VolunteerEventPage;
