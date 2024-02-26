/* eslint-disable react/prop-types */
import 'react';
import DataEntryModal from '../DataEntryModal/DataEntryModal';
import {
  Text,
  Flex,
  Spacer,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Tag,
  Menu,
  useDisclosure,
} from '@chakra-ui/react';
import { FaUser, FaClock, FaArrowUp, FaTag } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';

const RenderVolunteerRow = ({ volunteer, changeIsCheckedIn }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    first_name,
    last_name,
    email,
    image_url,
    is_checked_in,
    number_in_party,
    event_data_new_id,
    volunteer_id,
    event_id,
    id,
    unusual_items,
    pounds,
    ounces,
  } = volunteer;
  console.log(volunteer);

  return (
    <Tr key={id} bg="#FFFFFF">
      <Td>
        <Flex ml="5rem">
          <Image src={image_url} boxSize="4rem" borderRadius="full" />
          <Flex direction="column" ml={3} mt={2} g={1}>
            <Text color={'#2D3748'}>
              {first_name} {last_name}
            </Text>
            <Text fontWeight="light" color={'#718096'}>
              {email}
            </Text>
          </Flex>
        </Flex>
      </Td>
      <Td>
        <Text color="green" fontWeight="650">
          ATTENDED
        </Text>
      </Td>
      <Td>
        <Flex gap={2}>
          {is_checked_in ? (
            <>
              <Tag cursor={'pointer'} onClick={onOpen} bg="#2D558A" textColor={'#FFFFFF'}>
                Input Data
              </Tag>
              <DataEntryModal
                isOpen={isOpen}
                onClose={onClose}
                id={event_data_new_id}
                profileImage={image_url}
                firstName={first_name}
                lastName={last_name}
                volunteerId={volunteer_id}
                numberInParty={number_in_party}
                eventId={event_id}
                unusualItems={unusual_items}
                pounds={pounds}
                ounces={ounces}
              />
            </>
          ) : (
            <Tag
              onClick={() => changeIsCheckedIn(event_data_new_id)}
              cursor={'pointer'}
              bg="#2D558A"
              textColor={'#FFFFFF'}
            >
              Check-In
            </Tag>
          )}
          <Spacer />
          <Menu>
            <BsThreeDots />
          </Menu>
        </Flex>
      </Td>
    </Tr>
  );
};

const VolunteerEventsTable = ({ volunteers, changeIsCheckedIn }) => {
  return (
    <TableContainer borderRadius={'15px'}>
      <Table variant="simple">
        <TableCaption>Volunteers for this event</TableCaption>
        <Thead bg="#F7FAFC">
          <Tr>
            <Th w="65%">
              <Flex gap={2} ml="5rem">
                <FaUser size="1rem" />
                <Text color="#2D3748" fontWeight="650">
                  VOLUNTEER NAME
                </Text>
              </Flex>
            </Th>
            <Th>
              <Flex gap={2}>
                <FaClock size="1rem" />
                <Text color="#2D3748" fontWeight="650">
                  STATUS
                </Text>
                <FaArrowUp size="1rem" />
              </Flex>
            </Th>
            <Th>
              <Flex gap={2}>
                <FaTag size="1rem" transform="rotate(90)" />
                <Text color="#2D3748" fontWeight="650">
                  ACTION
                </Text>
              </Flex>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {volunteers.map(volunteer => (
            <RenderVolunteerRow
              key={volunteer.id}
              volunteer={volunteer}
              changeIsCheckedIn={changeIsCheckedIn}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default VolunteerEventsTable;
