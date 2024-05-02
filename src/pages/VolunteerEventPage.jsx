import EventFilteredGrid from '../components/Events/EventFilteredGrid';
import FeaturedDashboard from '../components/Events/FeaturedDashboard';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Spacer } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import NavbarContext from '../utils/NavbarContext';
import VolunteerSideView from '../components/VolunteerSideView.jsx';
import { RxCaretLeft } from 'react-icons/rx';
import { useBreakpoint, useDisclosure } from '@chakra-ui/react';
import VolunteerSideViewDrawer from '../components/VolunteerSideViewDrawer.jsx';
const VolunteerEventPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onNavbarDrawerOpen } = useContext(NavbarContext);
  const [currentEventId, setCurrentEventId] = useState(null); // Initial state is null to indicate no event selected
  const breakpoint = useBreakpoint();
  const [setShowOpenDrawerButton] = useState(false);

  const openEventDrawer = eventId => {
    setCurrentEventId(eventId); // Set the current event ID, which triggers the side view to display
    onOpen();
  };

  const handleClose = () => {
    onClose();
    setCurrentEventId(null); // Clear the current event ID on close
  };
  console.log('test' + currentEventId);

  return (
    <Flex dir="column">
      <Box bg="#E6EAEF" flexGrow={1} minW="1px">
        <Flex
          flexDir={'row'}
          alignItems={'center'}
          bg="#E6EAEF"
          ml={{ base: '0', xl: '15rem' }}
          pt={6}
          px={6}
          justifyContent={'space-between'}
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
            <HamburgerIcon
              color={'#717171'}
              boxSize={{ base: 10, md: 16 }}
              onClick={onNavbarDrawerOpen}
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
          >
            <IconButton
              borderRadius="md"
              borderColor="#EFEFEF"
              bg="white"
              variant={'outline'}
              borderWidth={'0.2em'}
              h="64px"
              w="64px"
              icon={<RxCaretLeft size={40} />}
              onClick={onOpen}
            ></IconButton>
          </Flex>
        </Flex>
        <FeaturedDashboard width={{ base: '90%' }} onOpen={onOpen} />
        <EventFilteredGrid
          width={{ base: '90%' }}
          setCurrentEventId={openEventDrawer} // Adjusted to call `openEventDrawer`
        />
      </Box>
      {/* Drawer Component */}
      {breakpoint == 'base' ? (
        <VolunteerSideViewDrawer
          eventId={currentEventId}
          isOpen={isOpen}
          onClose={handleClose}
          setShowOpenDrawerButton={setShowOpenDrawerButton}
        />
      ) : null}
      {isOpen ? (
        <VolunteerSideView
          eventId={currentEventId}
          onClose={handleClose}
          setShowOpenDrawerButton={setShowOpenDrawerButton}
        />
      ) : null}
    </Flex>
  );
};
export default VolunteerEventPage;
