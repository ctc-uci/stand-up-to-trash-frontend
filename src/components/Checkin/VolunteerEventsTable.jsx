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
  TableContainer,
  Tag,
  useDisclosure,
} from '@chakra-ui/react';
import { FaUser } from 'react-icons/fa';
import { MdInput, MdCheck } from 'react-icons/md';

const RenderVolunteerRow = ({ volunteer, changeIsCheckedIn, isCheckinPage }) => {
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
    notes,
    pounds,
    ounces,
    trash_bags,
  } = volunteer;

  let status = 'Registered';
  let statusColor = 'white';
  if (role === 'guest') {
    status = 'Guest';
    statusColor = '#FF84B0';
  } else if (is_checked_in === false) {
    status = 'Registered';
    statusColor = '#9188F2';
  } else if (is_checked_in === true) {
    status = 'Checked-in';
    statusColor = '#9BCB6C';
  }

  return (
    <Tr key={id} bg="#FFFFFF" fontWeight={'medium'}>
      <Td>
        <Flex>
          <Image src={image_url} boxSize="4rem" borderRadius="full" />
          <Flex direction="column" ml={3} mt={4} g={1}>
            <Text color={'#2D3748'}>
              {first_name} {last_name}
            </Text>
          </Flex>
        </Flex>
      </Td>
      <Td>
        <Flex>
          <Box backgroundColor="#8589dc" boxSize="2rem" borderRadius="full" mr={5}>
            <Center mt={2}>
              <FaUser color="white" />
            </Center>
          </Box>
          <Text fontWeight="550" mt={2}>
            Individual
          </Text>
        </Flex>
      </Td>
      <Td>
        <Flex>
          <Flex borderRadius={'full'} padding={1} border={'solid 1px rgba(0, 0, 0, 0.3)'}>
            <Box
              ml={1}
              borderRadius={'100%'}
              backgroundColor={statusColor}
              padding={2}
              w="14px"
              h="14px"
              my="auto"
            ></Box>
            <Text fontSize="13" ml={2} mr={2}>
              {status}
            </Text>
          </Flex>
        </Flex>
      </Td>
      <Td>{number_in_party}</Td>
      <Td>
        <Flex gap={2}>
          {is_checked_in ? (
            <>
              {!isCheckinPage ? (
                <>
                  <Tag
                    cursor={'pointer'}
                    onClick={onOpen}
                    borderRadius={10}
                    padding={2}
                    color={'#7B7C7D'}
                    bg={'#E2E4E5'}
                  >
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
                    notes={notes}
                    pounds={pounds}
                    ounces={ounces}
                    trashBags={trash_bags}
                  />
                </>
              ) : (
                <Text color={'#717171'} fontWeight={400}>
                  Checked-in
                </Text>
              )}
            </>
          ) : (
            <Tag
              onClick={() => changeIsCheckedIn(event_data_new_id)}
              cursor={'pointer'}
              textColor={'gray'}
              borderRadius={10}
              padding={2}
              color={'#7B7C7D'}
              bg={'#E2E4E5'}
            >
              <Box mr="2">
                <MdCheck />
              </Box>
              Check-In
            </Tag>
          )}
          <Spacer marginRight={5} />
        </Flex>
      </Td>
    </Tr>
  );
};

const VolunteerEventsTable = ({ volunteers, changeIsCheckedIn, isCheckinPage }) => {
  return (
    <TableContainer border={'2px solid #E2E8F0'} borderRadius={'15px'}>
      <Table
        mb={5}
        variant="striped"
        colorScheme="gray"
        sx={{
          tbody: {
            tr: {
              '&:nth-of-type(odd)': {
                backgroundColor: '#F9F9F9', // Or any other color from the theme
              },
            },
          },
        }}
      >
        <Thead bg="#F7FAFC">
          <Tr fontWeight={'medium'}>
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
                  Party Size
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
              isCheckinPage={isCheckinPage}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default VolunteerEventsTable;
