import EventFilteredGrid from '../components/Events/EventFilteredGrid';
import FeaturedDashboard from '../components/Events/FeaturedDashboard';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, Spacer } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import NavbarContext from '../utils/NavbarContext';
import VolunteerSideView from '../components/VolunteerSideView.jsx';
import { RxCaretLeft } from 'react-icons/rx';
// import RegistrationFlowController from '../components/EventRegistration/RegistrationFlowController.jsx';

const VolunteerEventPage = () => {
  const { onNavbarDrawerOpen } = useContext(NavbarContext);
  // eslint-disable-next-line
  const [currentEventId, setCurrentEventId] = useState(-1);

  const [showOpenDrawerButton, setShowOpenDrawerButton] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => {
    setIsOpen(!isOpen);
    setShowOpenDrawerButton(false);
  };
  const onClose = () => setIsOpen(!isOpen);

  // const {
  //   isOpen: isRegistrationFlowOpen,
  //   onOpen: onRegistrationFlowOpen,
  //   onClose: onRegistrationFlowClose,
  // } = useDisclosure({ defaultIsOpen: false });

  return (
    <Flex dir="column">
      {/* controller */}
      {/* <Button onClick={onRegistrationFlowOpen}>Open!</Button>
      {isRegistrationFlowOpen && (
        <RegistrationFlowController
          isOpen={isRegistrationFlowOpen}
          onClose={onRegistrationFlowClose}
          eventId={currentEventId}
        />
      )} */}
      {/* <RegistrationModal /> */}
      <Box bg="#E6EAEF" flexGrow={1} minW="1px" minH={'100vh'}>
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
            display={showOpenDrawerButton ? { base: 'flex', xl: 'none' } : 'none'}
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
          setCurrentEventId={setCurrentEventId}
          setIsOpen={setIsOpen}
          setShowOpenDrawerButton={setShowOpenDrawerButton}
          showOpenDrawerButton={showOpenDrawerButton}
        />
        <EventFilteredGrid
          width={{ base: '90%' }}
          setCurrentEventId={setCurrentEventId}
          setIsOpen={setIsOpen}
          setShowOpenDrawerButton={setShowOpenDrawerButton}
          isOpen={isOpen}
        />
      </Box>
      <Box w={isOpen ? '480px' : 0} flexShrink={0}>
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
    </Flex>
  );
};

export default VolunteerEventPage;
