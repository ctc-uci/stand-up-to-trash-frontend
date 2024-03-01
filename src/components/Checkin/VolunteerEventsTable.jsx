/* eslint-disable react/prop-types */
import 'react';
import DataEntryModal from '../DataEntryModal/DataEntryModal';
import {
  Text,
  Box,
  Flex,
  Spacer,
  Center,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  // TableCaption,
  TableContainer,
  Tag,
  Menu,
  useDisclosure,
} from '@chakra-ui/react';
import { FaUser, FaRegUser } from 'react-icons/fa';
import { BsThreeDots } from 'react-icons/bs';
import { MdInput, MdCheck } from "react-icons/md";

const RenderVolunteerRow = ({ volunteer, changeIsCheckedIn }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    first_name,
    last_name,
    // email,
    image_url,
    is_checked_in,
    number_in_party,
    event_data_new_id,
    volunteer_id,
    event_id,
    role,
    id,
    unusual_items,
    pounds,
    ounces,
  } = volunteer;
  console.log(volunteer);

  let status = "Registered";
  let statusColor = "white";
  if (role === "guest") {
    status = "Guest"
    statusColor = "#FF84B0"
  } else if (is_checked_in === false) {
    status = "Registered";
    statusColor = "#8589dc"
  } else if (is_checked_in === true) {
    status = "Checked-in"
    statusColor = "green"
  }
  

  return (
    <Tr key={id} bg="#FFFFFF">
      <Td>
        <Flex>
          <Image src={image_url} boxSize="4rem" borderRadius="full" />
          <Flex direction="column" ml={3} mt={4} g={1}>
            <Text color={'#2D3748'}>
              {first_name} {last_name}
            </Text>
            {/* <Text fontWeight="light" color={'#718096'}>
              {email}
            </Text> */}
          </Flex>
        </Flex>
      </Td>
      <Td>
        <Flex>
          <Box backgroundColor="#8589dc" boxSize="2rem" borderRadius="full" mr={5}>
            <Center mt={2}>
              <FaRegUser />
            </Center>
          </Box>
          <Text fontWeight="550" mt={2}>
            Individual
          </Text>
        </Flex>
      </Td>
      <Td>
        <Text>
          <Flex borderRadius={"full"} padding={1} border={"solid 1px rgba(0, 0, 0, 0.3)"}>
            <Box ml={1} borderRadius={"100%"} backgroundColor={statusColor} padding={2} w="14px" h="14px" my="auto"></Box>
            <Text fontSize="13" ml={2} mr={2}>{status}</Text>
          </Flex>
        </Text>
      </Td>
      <Td>
        {number_in_party}
      </Td>
      <Td>
        <Flex gap={2}>
          {is_checked_in ? (
            <>
              <Tag cursor={'pointer'} onClick={onOpen} borderRadius={10} padding={2} textColor={'gray'}>
                <Box mr="2">
                  <MdInput />
                </Box>
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
              textColor={'gray'}
              borderRadius={10}
              padding={2}
            >
              <Box mr="2">
                <MdCheck />
              </Box>
              Check-In
            </Tag>
          )}
          <Spacer marginRight={5}/>
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
        {/* <TableCaption>Volunteers for this event</TableCaption> */}
        <Thead bg="#F7FAFC">
          <Tr>
            <Th w="50%">
              <Flex gap={2}>
                <FaUser size="1rem" />
                <Text color="#2D3748" fontWeight="650">
                  Attendee
                </Text>
              </Flex>
            </Th>
            <Th w="30%">
              <Flex gap={2}>
                <Text color="#2D3748" fontWeight="650">
                  Type
                </Text>
              </Flex>
            </Th>
            <Th>
              <Flex gap={2}>
                <Text color="#2D3748" fontWeight="650">
                  Status
                </Text>
              </Flex>
            </Th>
            <Th>
              <Flex gap={2}>
                <Text color="#2D3748" fontWeight="650">
                  Number in Party
                </Text>
              </Flex>
            </Th>
            <Th>
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
