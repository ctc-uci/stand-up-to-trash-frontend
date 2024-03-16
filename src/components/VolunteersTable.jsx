/* eslint-disable react/prop-types */
import {
  Text,
  Flex,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
} from '@chakra-ui/react';

const RenderVolunteerRow = ({ volunteer }) => {
  const {
    id,
    first_name,
    last_name,
    image_url,
    total,
  } = volunteer;

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
          <Text fontWeight="550" mt={2}>
            {total}
          </Text>
        </Flex>
      </Td>
      <Td>
        <Flex>
          <Button color='#0075FF' variant='outline' borderWidth="2px" borderColor='#0075FF'>View</Button>
        </Flex>
      </Td>
    </Tr>
  );
};

const VolunteersTable = ({ volunteers }) => {
  return (
    <TableContainer border={'2px solid #E2E8F0'} borderRadius={'15px'}>
      <Table
        mb={5}
        colorScheme="gray"
      >
        <Thead bg="#F7FAFC">
          <Tr fontWeight={'medium'}>
            <Th w="30%">
              <Flex gap={2}>
                <Text color="#2D3748" fontWeight="650">
                  Attendee
                </Text>
              </Flex>
            </Th>
            <Th w="50%">
              <Flex gap={2}>
                <Text color="#2D3748" fontWeight="650">
                  Events Attended
                </Text>
              </Flex>
            </Th>
            <Th w="30%">
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {volunteers.map(volunteer => (
            <RenderVolunteerRow
              key={volunteer.id}
              volunteer={volunteer}
            />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default VolunteersTable;
