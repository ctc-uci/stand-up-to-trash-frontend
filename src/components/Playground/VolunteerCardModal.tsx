import React, { useState } from 'react';
import Backend from '../../utils/utils';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
  Text,
  Flex,
  Stack,
  Textarea,
  HStack,
  useToast,
} from '@chakra-ui/react';

type VolunteerProfile = {
  id: number;
  firebase_uid: string;
  email: string;
  first_name: string;
  last_name: string;
  image_url: string;
  about_me: string;
  role: 'guest' | 'volunteer' | 'admin';
  phone_number: string;
  organization: string;
};

const VolunteerCardModal = ({ volunteerId }: { volunteerId: number }) => {
  const [volunteerData, setVolunteerData] = useState<VolunteerProfile>();
  const [volunteerStats, setVolunteerStats] = useState<number>();
  const [volunteerEvents, setVolunteerEvents] = useState<string[]>();
  const [volunteerImages, setVolunteerImages] = useState<string[]>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleClick = async () => {
    setLoading(true);

    try {
      const [profileResponse, statsResponse, eventsResponse, imagesResponse] = await Promise.all([
        Backend.get(`/profiles/${volunteerId}`),
        Backend.get(`stats/volunteer/${volunteerId}`),
        Backend.get(`data/volunteer/${volunteerId}/event`),
        Backend.get(`data/images/${volunteerId}`),
      ]);

      setVolunteerData(profileResponse.data);
      setVolunteerStats(statsResponse.data);
      setVolunteerEvents(eventsResponse.data);
      setVolunteerImages(imagesResponse.data);

      onOpen();
    } catch (err) {
      toast({
        title: 'Error opening volunteer profile',
        description: 'Could not fetch data',
        position: 'bottom-right',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });

      console.log(`Error getting profile: `, err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleClick} isLoading={loading}>
        Volunteer Modal
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent paddingY={4} paddingX={6} boxShadow="xl" maxWidth={500}>
          <ModalCloseButton />
          <ModalBody>
            <Stack gap={4}>
              <Flex display="flex" flexDirection="column" alignItems="center">
                <Image src={volunteerData?.image_url} alt="profile" rounded="100%" w={20} h={20} />
                <Text fontSize="2xl" fontWeight={700} w="fit-content">
                  {volunteerData?.first_name} {volunteerData?.last_name}
                </Text>
                <Text fontSize="sm" fontWeight="400" w="fit-content" color="#718096">
                  {volunteerData?.email}
                </Text>
              </Flex>

              <Flex display="flex" flexDirection="column" gap={1}>
                <HStack gap={0} flexWrap="wrap">
                  <Text fontSize="md" fontWeight={600}>
                    Total Trash:&nbsp;
                  </Text>
                  <Text fontWeight={400}>{volunteerStats} lbs</Text>
                </HStack>
                <HStack gap={0} flexWrap="wrap">
                  <Text fontSize="md" fontWeight={600}>
                    Events Attended:&nbsp;
                  </Text>
                  <Text fontWeight={400}>{volunteerEvents?.join(', ')}</Text>
                </HStack>
                <Stack>
                  <Text fontSize="md" fontWeight={600}>
                    Other Information:
                  </Text>
                  <Textarea placeholder="Notes..." />
                </Stack>
              </Flex>

              <Flex display="flex" flexDirection="column" gap={1}>
                <Stack gap={0}>
                  <Text fontSize="md" fontWeight={600}>
                    Unusual Items:
                  </Text>
                  <HStack overflow="scroll">
                    {volunteerImages?.map((imageUrl, index) => (
                      <Image
                        src={imageUrl}
                        alt={`unusual item ${index + 1}`}
                        w={32}
                        h={32}
                        objectFit="contain"
                        key={imageUrl}
                      />
                    ))}
                  </HStack>
                </Stack>
              </Flex>
            </Stack>
          </ModalBody>

          <ModalFooter display="flex" justifyContent="center">
            <Button colorScheme="blue" mr={3} onClick={onClose} w="100%">
              Close Profile
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default VolunteerCardModal;
