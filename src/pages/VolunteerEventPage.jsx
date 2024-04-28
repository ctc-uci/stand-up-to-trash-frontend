import EventFilteredGrid from '../components/Events/EventFilteredGrid';
import FeaturedDashboard from '../components/Events/FeaturedDashboard';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Spacer } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import NavbarContext from '../utils/NavbarContext';
import VolunteerSideView from '../components/VolunteerSideView.jsx';
import { RxCaretLeft } from 'react-icons/rx';
import { Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, useDisclosure } from '@chakra-ui/react';

const VolunteerEventPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onNavbarDrawerOpen } = useContext(NavbarContext);
  const [currentEventId, setCurrentEventId] = useState(-1);

  const openEventDrawer = (eventId) => {
    setCurrentEventId(eventId);
    onOpen();
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
        <FeaturedDashboard
          width={{ base: '90%' }}
          onOpen={onOpen}
        />
        <EventFilteredGrid
          width={{ base: '90%' }}
          setCurrentEventId={openEventDrawer} // Adjusted to call `openEventDrawer`
        />
      </Box>
      {/* Drawer Component */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="s">
        <DrawerOverlay />
        <DrawerContent minWidth="320px"> {/* Setting a minimum width */}
          <DrawerCloseButton />
          <DrawerHeader>Event Details</DrawerHeader>
          <DrawerBody>
            {isOpen && (
              <div style={{ width: '100%', overflow: 'auto' }}> {/* Ensure content fits and is scrollable if needed */}
                <VolunteerSideView eventId={currentEventId} onClose={onClose} />
              </div>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};
export default VolunteerEventPage;