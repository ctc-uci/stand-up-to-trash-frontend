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
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { BsPersonFill } from 'react-icons/bs';
import { RiErrorWarningFill } from 'react-icons/ri';
import SettingsCard from '../components/DummyVolunteerProfile/SettingsCard';
import SettingsField from '../components/DummyVolunteerProfile/SettingsField';

export const DummyVolunteerProfilePage = () => {
  return (
    <Box bg={'#e6eaee'} minHeight="100vh" paddingLeft={'15rem'}>
      {/* Profile Card and Account Information */}
      <Grid templateColumns="repeat(3, 1fr)" gap={4}>
        <GridItem colSpan={1}>
          <Card
            bg={'white'}
            borderRadius={10}
            border={'solid #efefef'}
            mt={20}
            ml="auto"
            mr="2rem"
            w="16rem"
          >
            <Center>
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt="Green double couch with wooden legs"
                mt={5}
                mb={5}
                borderRadius="full"
                boxSize="150px"
                border={'solid black 1px'}
                boxShadow={'2px 2px 2px 2px #dce0e2'}
              />
              <EditIcon mt={'100px'} />
            </Center>
            <Center bg={'#efefef'}>
              <Stack spacing="1">
                <Heading size="md" mt={2} mb={1}>
                  Joseph Smith
                </Heading>
                <Center>
                  <Text mb={2}>Volunteer</Text>
                </Center>
              </Stack>
            </Center>
          </Card>
        </GridItem>

        <GridItem colSpan={2}>
          <Box pr="2rem" mt="20" display="flex" gap="20px" flexDirection={'column'} mr="auto">
            <SettingsCard icon={<BsPersonFill />} title="Account Settings">
              <Box mx="2rem">
                <Box display="flex" flexDir={'row'} gap="2rem" w="100%">
                  <Box w="50%">
                    {/* Left-hand side */}
                    <SettingsField title={'Full Name'} placeholder={'Volunteer Name'} />
                    <SettingsField
                      title={'Email Address'}
                      placeholder={'volunteer@gmail.com'}
                      type={'email'}
                    />
                    <SettingsField
                      title={'Phone Number'}
                      placeholder={'714-322-5732'}
                      type={'tel'}
                    />
                  </Box>
                  <Box w="50%">
                    {/* Right-hand side */}
                    <SettingsField
                      title={'About Me'}
                      placeholder={'I am a volunteer for Stand Up to Trash 🧍🗑️!'}
                      textarea={true}
                    />
                    <SettingsField title={'Organization'} placeholder={'Commit the Change'} />
                  </Box>
                </Box>
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
                <Box w="20%">
                  <Button mt={4} colorScheme="black" variant="outline" size="sm">
                    Sign Out
                  </Button>
                  <Button mt={8} colorScheme="red" size="sm">
                    Delete account
                  </Button>
                </Box>
              </Box>
            </SettingsCard>
          </Box>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default DummyVolunteerProfilePage;
