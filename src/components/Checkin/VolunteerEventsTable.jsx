/* eslint-disable react/prop-types */
import {
  Box,
  Center,
  Flex,
  Image,
  Table,
  TableContainer,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import 'react';
import { FaUser } from 'react-icons/fa';
import { MdCheck, MdInput } from 'react-icons/md';
import checked_in from '../../Assets/status_icon/checked_in.svg';
import registered from '../../Assets/status_icon/registered.svg';
import DataEntryModal from '../DataEntryModal/DataEntryModal';

const RenderVolunteerRow = ({ volunteer, changeIsCheckedIn, isCheckinPage, isViewEventPage }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    first_name,
    last_name,
    // email,
    image_url,
    is_checked_in,
    number_in_party,
    event_data_id,
    volunteer_id,
    event_id,
    role,
    id,
    // unusual_items = '',
    notes,
    pounds,
    ounces,
    trash_bags,
  } = volunteer;

  let status = 'Registered';
  if (role === 'guest') {
    status = 'Guest';
  } else if (is_checked_in === false) {
    status = 'Registered';
  } else if (is_checked_in === true) {
    status = 'Checked-in';
  }

  // const stringvolunteerId = volunteer_id.toString();
  return (
    <Tr key={id} bg="#FFFFFF" fontWeight={'medium'}>
      <Td>
        <Flex maxWidth={{ base: '200px', md: '200px', lg: '300px', xl: '300px' }}>
          <Image src={image_url} boxSize="4rem" borderRadius="full" />
          <Flex direction="column" ml={3} mt={4} g={1} maxW="75%">
            <Text color={'#2D3748'} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
              {first_name} {last_name}
            </Text>
          </Flex>
        </Flex>
      </Td>
      <Td display={{ base: 'none', lg: 'table-cell' }}>
        <Flex>
          <Box backgroundColor="#8589dc" boxSize="2rem" borderRadius="full" mr={5}>
            <Center mt={2}>
              <FaUser color="white" />
            </Center>
          </Box>
          <Text fontWeight="550" mt={2}>
            {volunteer.number_in_party === 1 ? 'Individual' : 'Group'}
          </Text>
        </Flex>
      </Td>
      <Td>
        <Flex>
          <Flex
            borderRadius={'lg'}
            p={2}
            border={'2px solid rgba(0, 0, 0, 0.10)'}
            alignItems={'center'}
            gap={1}
            justifyContent={'center'}
          >
            <Image src={status === 'Checked-in' ? checked_in : registered} />
            <Text fontSize="md">{status}</Text>
          </Flex>
        </Flex>
      </Td>
      <Td>
        <Flex alignItems={'start'} justifyContent={'start'}>
          <Text fontSize="md">{number_in_party}</Text>
        </Flex>
      </Td>
      <Td>
        <Flex gap={2} justifyContent={'center'} alignItems={'center'}>
          {is_checked_in ? (
            <>
              {!isCheckinPage ? (
                <>
                  <Tag
                    onClick={onOpen}
                    cursor={'pointer'}
                    borderRadius={10}
                    p={2}
                    color={'#0075FF'}
                    bg={'white'}
                    border={'2px solid #0075FF'}
                    gap={1}
                  >
                    <MdInput />
                    <Text fontSize={'md'}> Input Data</Text>
                  </Tag>
                  <DataEntryModal
                    isOpen={isOpen}
                    onClose={onClose}
                    id={event_data_id}
                    image_url={image_url}
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
                <Text color={'#717171'} fontSize={'lg'} fontWeight={'semibold'}>
                  Checked-in
                </Text>
              )}
            </>
          ) : (
            <>
              {isViewEventPage ? (
                <Tag
                  borderRadius={10}
                  p={2}
                  color={'#0075FF'}
                  bg={'white'}
                  border={'2px solid #0075FF'}
                  gap={1}
                >
                  <MdCheck />
                  <Text fontSize={'md'}>Check-In</Text>
                </Tag>
              ) : (
                <Tag
                  onClick={() => changeIsCheckedIn(volunteer)}
                  cursor={'pointer'}
                  borderRadius={10}
                  p={2}
                  color={'#0075FF'}
                  bg={'white'}
                  border={'2px solid #0075FF'}
                  gap={1}
                >
                  <MdCheck />
                  <Text fontSize={'md'}>Check-In</Text>
                </Tag>
              )}
            </>
          )}
        </Flex>
      </Td>
    </Tr>
  );
};

const VolunteerEventsTable = ({
  volunteers,
  changeIsCheckedIn,
  isCheckinPage,
  isViewEventPage,
}) => {
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
            <Th>
              <Flex gap={2}>
                <FaUser size="1rem" />
                <Text color="#2D3748" fontWeight="650">
                  Attendee
                </Text>
              </Flex>
            </Th>
            <Th display={{ base: 'none', lg: 'flex' }}>
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
            <Th display={{ base: 'none', xl: 'block' }}>
              <Flex>
                <Text color="#2D3748" fontWeight="650">
                  Party Size
                </Text>
              </Flex>
            </Th>
            <Th w={{ base: '25%', xl: '' }}></Th>
          </Tr>
        </Thead>
        <Tbody>
          {volunteers.map(volunteer => (
            <RenderVolunteerRow
              key={volunteer.id}
              volunteer={volunteer}
              changeIsCheckedIn={changeIsCheckedIn}
              isCheckinPage={isCheckinPage}
              isViewEventPage={isViewEventPage}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default VolunteerEventsTable;
