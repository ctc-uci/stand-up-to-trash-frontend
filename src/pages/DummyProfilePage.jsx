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
import { BsPersonFill } from 'react-icons/bs';
import { RiErrorWarningFill } from 'react-icons/ri';
import SettingsCard from '../components/DummyVolunteerProfile/SettingsCard';
import SettingsField from '../components/DummyVolunteerProfile/SettingsField';
import { useContext, useEffect, useRef, useState } from 'react';
import RoleContext from '../utils/RoleContext';
import UserContext from '../utils/UserContext';
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

export const DummyProfilePage = () => {
  const { user, updateUser } = useContext(UserContext);
  const { role, setRole } = useContext(RoleContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    <Box bg={'#E8EDF3'} minHeight="100vh" ml={{ base: '0', xl: '15rem' }}>
      {/* Profile Card and Account Information */}
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        <GridItem colSpan={1}>
          <Card
            bg={'white'}
            borderRadius={10}
            mt={20}
            ml="auto"
            mr="2rem"
            w="16rem"
            boxShadow={'0px 4px 4px 0px rgba(0, 0, 0, 0.25)'}
          >
            <Center>
              <Image
                src={user.image_url}
                objectFit={'cover'}
                alt="Green double couch with wooden legs"
                mt={5}
                mb={5}
                borderRadius="full"
                boxSize="150px"
                border={'solid black 1px'}
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
                <Heading size="md" mt={2} mb={1}>
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

        <GridItem colSpan={2}>
          <Box pr="2rem" mt="20" display="flex" gap="20px" flexDirection={'column'} mr="auto">
            <SettingsCard icon={<BsPersonFill />} title="Account Settings">
              <Box mx="2rem">
                {isVolunteer ? (
                  <Box display="flex" flexDir={'row'} gap="2rem" w="100%">
                    <Box w="50%">
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
                    <Box w="50%">
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
                    <Box display="flex" flexDir={'row'} gap="2rem" w="100%">
                      <Box w="50%">
                        {/* Left-hand side */}
                        <SettingsField
                          title={'First Name'}
                          placeholder={'Joseph'}
                          value={user.first_name}
                          onEdit={disclosures.firstName.onOpen}
                        />
                      </Box>
                      <Box w="50%">
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
                      <Box w="50%">
                        {/* Left-hand side */}
                        <SettingsField
                          title={'Phone Number'}
                          placeholder={'714-322-5732'}
                          value={user.phone_number}
                          type={'tel'}
                          onEdit={disclosures.phoneNumber.onOpen}
                        />
                      </Box>
                      <Box w="50%">{/* Right-hand side */}</Box>
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
            <SettingsCard icon={<RiErrorWarningFill />} title="Account Access">
              <Box display={'flex'} flexDir={'row'} gap="2rem" w="100%">
                <Box w="70%">
                  <Heading size={'sm'}>Sign out</Heading>
                  <Text>You can sign back in anytime.</Text>
                  <Heading mt={5} size={'sm'}>
                    Delete your account
                  </Heading>
                  <Text>
                    Permanently delete your user data and account. This action cannot be undone.
                  </Text>
                </Box>
                <Box w="20%" display="flex" justifyContent={'end'} flexDir="column">
                  <Button
                    ml="auto"
                    mt={4}
                    colorScheme="black"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      logout(logoutPath, navigate);
                    }}
                    minW="110px"
                  >
                    Sign Out
                  </Button>
                  <Button ml="auto" mt={8} colorScheme="red" size="sm" onClick={onOpen}>
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

export default DummyProfilePage;
