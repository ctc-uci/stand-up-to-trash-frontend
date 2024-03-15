import React, { useState } from 'react';
import Backend from '../../utils/utils';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Image,
  Text,
  Center,
  Flex,
  Stack,
  Textarea,
} from '@chakra-ui/react';

type UserProfile = {
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
  const [volunteerData, setVolunteerData] = useState<UserProfile>();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = async () => {
    try {
      const response = await Backend.get(`/profiles/${volunteerId}`);
      setVolunteerData(response.data);

      onOpen();
    } catch (err) {
      console.log(`Error getting profile: `, err.message);
    }
  };

  return (
    <>
      <Button onClick={handleClick}>Volunteer Modal</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent padding={9} boxShadow="xl" maxWidth={500}>
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
                <Text fontSize="md" fontWeight={600} flexWrap="wrap">
                  Total Trash: BLANK lbs
                </Text>
                <Text fontSize="md" fontWeight={600} flexWrap="wrap" display="flex">
                  Events Attended:&nbsp;<Text fontWeight={400}>1, 2, 3</Text>
                </Text>
                <Stack>
                  <Text fontSize="md" fontWeight={600} flexWrap="wrap">
                    Other Information
                  </Text>
                  <Textarea placeholder="Notes..." />
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
