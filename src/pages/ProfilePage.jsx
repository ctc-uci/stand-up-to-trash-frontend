import {
  Grid,
  GridItem,
  Card,
  Center,
  Box,
  Button,
  Heading,
  Image,
  Stack,
  Text,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  ModalBody,
  Checkbox,
  Flex,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { BsPersonFill } from 'react-icons/bs';
import { RiErrorWarningFill } from 'react-icons/ri';
import SettingsCard from '../components/DummyVolunteerProfile/SettingsCard';
import SettingsField from '../components/DummyVolunteerProfile/SettingsField';
import EditProfilePictureModal from '../components/EditProfilePictureModal';
import { useContext, useEffect, useRef, useState } from 'react';
import RoleContext from '../utils/RoleContext';
import UserContext from '../utils/UserContext';
import NavbarContext from '../utils/NavbarContext';

import {
  EditFirstNameModal,
  EditLastNameModal,
  EditAboutMeModal,
  EditEmailModal,
  EditOrganizationModal,
  EditPhoneNumberModal,
} from '../components/DummyVolunteerProfile/ProfilePageModals';
import { logout } from '../utils/firebaseAuthUtils';
import { useNavigate } from 'react-router-dom';
import { RiPencilFill } from 'react-icons/ri';
import Backend from '../utils/utils';
import { getAuth } from 'firebase/auth';

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const ProfilePage = () => {
  const { user, updateUser } = useContext(UserContext);
  const { role, setRole } = useContext(RoleContext);
  const { onNavbarDrawerOpen } = useContext(NavbarContext);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isProfileOpen, onOpen: onProfileOpen, onClose: onProfileClose } = useDisclosure();
  const [confirmed, setConfirmed] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const logoutPath = '/loginv2';

  const isVolunteer = role === 'volunteer';

  const disclosures = {};
  for (const field of [
    'firstName',
    'lastName',
    'email',
    'phoneNumber',
    'organization',
    'aboutMe',
  ]) {
    // ESlint will complain about hook being called in loop, but it's a static list, so it will be called in the same order every time and not change
    const { isOpen, onOpen, onClose } = useDisclosure(); // eslint-disable-line
    disclosures[field] = { isOpen, onOpen, onClose };
    const prevIsOpen = usePrevious(isOpen); // eslint-disable-line
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      // eslint-disable-line
      if (prevIsOpen && !isOpen) updateUser();
    }, [prevIsOpen, updateUser, isOpen]);
  }

  const handleCheckboxChange = e => {
    setConfirmed(e.target.checked);
  };

  const deleteAccount = async () => {
    let response = null;
    // debugger;
    const uid = getAuth().currentUser.uid;
    const id = user.id;
    // const uid = user.id;
    try {
      await Backend.delete(`/profiles/${id}`);
      response = await Backend.delete(`/firebase/delete-account/${uid}`);
    } catch (error) {
      console.error(error);
    }

    if (!response || response.status !== 200 || response.data.name === 'error') {
      if (response) console.error(response.data);
      toast({
        title: 'An error occurred',
        description: 'Your account was not successfully deleted.',
        status: 'error',
        position: 'bottom-right',
        duration: 9000,
        isClosable: true,
      });
    } else {
      setRole('unloggedIn');
      logout(logoutPath, navigate);
      setTimeout(async () => {
        toast({
          title: 'Account Deleted',
          description: 'Your account was successfully deleted.',
          status: 'success',
          position: 'bottom-right',
          duration: 9000,
          isClosable: true,
        });
      }, 250);
    }
  };

  return (
    <Box
      bg={{ base: 'white', md: '#E8EDF3', lg: '#E8EDF3' }}
      minHeight="100vh"
      ml={{ base: '0', xl: '15rem' }}
      w={{ base: '100vw', md: 'auto', lg: 'auto' }}
      display={{ base: 'flex', md: 'block', lg: 'block' }}
      flexDirection={{ base: 'column', md: 'row', lg: 'row' }}
      justifyContent={{ base: 'center', md: 'flex-start', lg: 'flex-start' }}
      alignItems={{ base: 'center', md: 'flex-start', lg: 'flex-start' }}
    >
      <Flex display={{ base: 'flex', xl: 'none' }} w={'full'} pt={5} pl={5}>
        <HamburgerIcon
          color={'#717171'}
          boxSize={50}
          display={{ base: 'flex', xl: 'none' }}
          onClick={onNavbarDrawerOpen}
        />
      </Flex>

      {/* Profile Card and Account Information */}
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(5, 3fr)', lg: 'repeat(3, 1fr)' }}
        gap={4}
      >
        <GridItem colSpan={{ base: 1, md: 1, lg: 1 }}>
          {/* mobile card for profile picture and name */}
          <Card
            bg="white"
            borderRadius={10}
            mt={{ base: '10', sm: '20' }}
            ml="auto"
            mr="2rem"
            w="full"
            display={{ base: 'flex', md: 'none', lg: 'none' }}
            flexDir={'row'}
            justifyContent={{ base: 'space-evenly' }}
            alignItems={'center'}
            boxShadow={'none'}
          >
            <Center>
              <Image
                src={user.image_url}
                objectFit={'cover'}
                alt="Green double couch with wooden legs"
                mb={5}
                mr={3}
                borderRadius="full"
                boxSize="125px"
                border={'solid black 1px'}
              />
              <Box
                backgroundColor={'#EFEFEF'}
                width={'36px'}
                height={'36px'}
                borderRadius={'4px'}
                position={'absolute'}
                top={'110px'}
                left={'100px'}
              >
                <Box
                  justifyContent={'center'}
                  alignContent={'center'}
                  w="100%"
                  h="100%"
                  padding="8px"
                >
                  <RiPencilFill style={{ height: '100%', width: '100%' }} />
                </Box>
              </Box>
            </Center>

            <Center
              bg={'white'}
              borderBottomRadius={10}
              boxShadow={'0px 2px 2px 0px rgba(0, 0, 0, 0.25)'}
              maxW={'150px'}
              padding={'2%'}
            >
              <Stack spacing="1">
                <Heading
                  size="sm"
                  mt={2}
                  mb={1}
                  maxW={{ base: '150px', md: '200px', xl: '225px' }}
                  textOverflow="ellipsis"
                  overflow="hidden"
                  whiteSpace="nowrap"
                  margin={3}
                >
                  {`${user.first_name} ${user.last_name}`}
                </Heading>
                <Center>
                  <Text mb={2} textTransform={'capitalize'} fontSize={15}>
                    {role}
                  </Text>
                </Center>
              </Stack>
            </Center>
          </Card>

          {/* regular card for profile picture and name */}
          <Card
            bg={'white'}
            borderRadius={10}
            mt={20}
            ml="auto"
            mr="2rem"
            w="16rem"
            boxShadow={'0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}
            display={{ base: 'none', md: 'block', lg: 'block' }}
          >
            <Center>
              <Image
                src={user.image_url}
                objectFit={'cover'}
                onClick={onProfileOpen}
                alt="Green double couch with wooden legs"
                mt={5}
                mb={5}
                borderRadius="full"
                boxSize="150px"
                border={'solid black 1px'}
              />
              <EditProfilePictureModal
                isOpen={isProfileOpen}
                onClose={onProfileClose}
                userInfo={user}
              />

              <Box
                backgroundColor={'#EFEFEF'}
                width={'36px'}
                height={'36px'}
                borderRadius={'4px'}
                position={'absolute'}
                top={'134px'}
                left={'164px'}
              >
                <Box
                  justifyContent={'center'}
                  alignContent={'center'}
                  w="100%"
                  h="100%"
                  padding="8px"
                >
                  <RiPencilFill style={{ height: '100%', width: '100%' }} />
                </Box>
              </Box>
            </Center>
            <Center bg={'#efefef'} borderBottomRadius={10}>
              <Stack spacing="1">
                <Heading
                  size="md"
                  mt={2}
                  mb={1}
                  maxW={{ base: '150px', md: '200px', xl: '225px' }}
                  overflow="hidden"
                  whiteSpace="nowrap"
                  textOverflow="ellipsis"
                >
                  {`${user.first_name} ${user.last_name}`}
                </Heading>
                <Center>
                  <Text mb={2} textTransform={'capitalize'}>
                    {role}
                  </Text>
                </Center>
              </Stack>
            </Center>
          </Card>
        </GridItem>

        <GridItem colSpan={{ base: 1, md: 4, lg: 2 }} rowSpan={{ base: 1, md: 1 }}>
          <Box
            pr="2rem"
            mt={{ base: '0px', md: '20', lg: '20' }}
            display="flex"
            gap="20px"
            flexDirection={'column'}
            mr="auto"
            ml={{ base: '8%', md: 0, lg: 0 }}
            mb={{ base: '5%', md: 0, lg: 0 }}
          >
            <SettingsCard icon={<BsPersonFill />} title="Account Settings">
              <Box mx={{ base: '0rem', md: '2rem', lg: '2rem' }}>
                {isVolunteer ? (
                  <Box
                    display="flex"
                    flexDir={{ base: 'column', md: 'row', lg: 'row' }}
                    gap={{ base: '0', md: '2rem', lg: '2rem' }}
                    w="100%"
                  >
                    <Box w={{ base: '100', md: '50%', lg: '50%' }}>
                      {/* Left-hand side */}
                      <SettingsField
                        title={'First Name'}
                        placeholder={'Joseph'}
                        value={user.first_name}
                        onEdit={disclosures.firstName.onOpen}
                      />
                      <SettingsField
                        title={'Email Address'}
                        placeholder={'volunteer@gmail.com'}
                        value={user.email}
                        type={'email'}
                        onEdit={disclosures.email.onOpen}
                      />
                      <SettingsField
                        title={'Phone Number'}
                        placeholder={'714-322-5732'}
                        value={user.phone_number}
                        type={'tel'}
                        onEdit={disclosures.phoneNumber.onOpen}
                      />
                    </Box>
                    <Box w={{ base: '100', md: '50%', lg: '50%' }}>
                      {/* Right-hand side */}
                      <SettingsField
                        title={'Last Name'}
                        placeholder={'Smith'}
                        value={user.last_name}
                        onEdit={disclosures.lastName.onOpen}
                      />
                      <SettingsField
                        title={'Organization'}
                        placeholder={'Commit the Change'}
                        value={user.organization}
                        onEdit={disclosures.organization.onOpen}
                      />
                      <SettingsField
                        title={'About Me'}
                        placeholder={'I am a volunteer for Stand Up to Trash 🧍🗑️!'}
                        value={user.about_me}
                        onEdit={disclosures.aboutMe.onOpen}
                      />
                    </Box>
                  </Box>
                ) : (
                  <>
                    <Box
                      display="flex"
                      flexDir={{ base: 'column', md: 'row', lg: 'row' }}
                      gap={{ base: '0', md: '2rem', lg: '2rem' }}
                      w="100%"
                    >
                      <Box w={{ base: '100', md: '50%', lg: '50%' }}>
                        {/* Left-hand side */}
                        <SettingsField
                          title={'First Name'}
                          placeholder={'Joseph'}
                          value={user.first_name}
                          onEdit={disclosures.firstName.onOpen}
                        />
                      </Box>
                      <Box w={{ base: '100', md: '50%', lg: '50%' }}>
                        {/* Right-hand side */}
                        <SettingsField
                          title={'Last Name'}
                          placeholder={'Smith'}
                          value={user.last_name}
                          onEdit={disclosures.lastName.onOpen}
                        />
                      </Box>
                    </Box>
                    <SettingsField
                      w="100%"
                      title={'Email Address'}
                      placeholder={'volunteer@gmail.com'}
                      value={user.email}
                      type={'email'}
                      onEdit={disclosures.email.onOpen}
                    />
                    <Box display="flex" flexDir={'row'} gap="2rem" w="100%">
                      <Box w={{ base: '100%', md: '48.5%', lg: '48.5%' }}>
                        {/* Left-hand side */}
                        <SettingsField
                          title={'Phone Number'}
                          placeholder={'714-322-5732'}
                          value={user.phone_number}
                          type={'tel'}
                          onEdit={disclosures.phoneNumber.onOpen}
                        />
                      </Box>
                    </Box>
                  </>
                )}
                <EditFirstNameModal
                  isOpen={disclosures.firstName.isOpen}
                  onClose={disclosures.firstName.onClose}
                  user={user}
                />
                <EditLastNameModal
                  isOpen={disclosures.lastName.isOpen}
                  onClose={disclosures.lastName.onClose}
                  user={user}
                />
                <EditEmailModal
                  isOpen={disclosures.email.isOpen}
                  onClose={disclosures.email.onClose}
                  user={user}
                />
                <EditPhoneNumberModal
                  isOpen={disclosures.phoneNumber.isOpen}
                  onClose={disclosures.phoneNumber.onClose}
                  user={user}
                />
                <EditOrganizationModal
                  isOpen={disclosures.organization.isOpen}
                  onClose={disclosures.organization.onClose}
                  user={user}
                />
                <EditAboutMeModal
                  isOpen={disclosures.aboutMe.isOpen}
                  onClose={disclosures.aboutMe.onClose}
                  user={user}
                />
              </Box>
            </SettingsCard>
            <SettingsCard icon={<RiErrorWarningFill />} title="Account Access" w={'100%'}>
              <Box display={'flex'} flexDir={'row'} gap="2rem" w="100%">
                <Box w="70%" display={{ base: 'none', md: 'block', lg: 'block' }}>
                  <Heading size={'sm'}>Sign out</Heading>
                  <Text>You can sign back in anytime.</Text>
                  <Heading mt={5} size={'sm'}>
                    Delete your account
                  </Heading>
                  <Text>
                    Permanently delete your user data and account. This action cannot be undone.
                  </Text>
                </Box>
                <Box
                  w={{ base: '100%', md: '20%', lg: '20%' }}
                  display="flex"
                  justifyContent={{ base: 'center', md: 'end', lg: 'end' }}
                  flexDir="column"
                  alignItems={{ base: 'center', md: 'none', lg: 'none' }}
                >
                  <Button
                    ml={{ base: 0, md: 'auto', lg: 'auto' }}
                    mt={4}
                    colorScheme="black"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      logout(logoutPath, navigate);
                    }}
                    w={'110px'}
                  >
                    Sign Out
                  </Button>
                  <Button
                    ml={{ base: 0, md: 'auto', lg: 'auto' }}
                    mt={8}
                    colorScheme="red"
                    size="sm"
                    onClick={onOpen}
                    w={{ base: '120px', md: 'auto', lg: 'auto' }}
                  >
                    Delete account
                  </Button>
                </Box>
              </Box>
            </SettingsCard>
          </Box>
        </GridItem>
      </Grid>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>
              Are you sure you want to proceed? Keep in mind this operation is irreversible and will
              result in the deletion of your account data.
            </p>
            <Flex mt={5}>
              <Checkbox onChange={handleCheckboxChange} />
              <Text ml={5}>Yes, I want to permanently delete this account and all its data.</Text>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="black" variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" isDisabled={!confirmed} onClick={deleteAccount}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProfilePage;
