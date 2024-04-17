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
import { NavLink } from 'react-router-dom';

const RenderEventRow = ({ event }) => {
  const { id, name, location, date, image_url } = event;

  return (
    <>
      <Tr key={id} bg="#FFFFFF" fontWeight={'medium'}>
        <Td>
          <Flex>
            <Image src={image_url} boxSize="4rem" borderRadius="full" />
            <Flex direction="column" ml={3} mt={4} g={1} overflow="hidden">
              <Text color={'#2D3748'} whiteSpace="nowrap" overflow="hidden" textOverflow="ellipsis">
                {name}
              </Text>
            </Flex>
          </Flex>
        </Td>
        <Td>
          <Flex>
            <Text fontWeight="550" mt={2}>
              {location}
            </Text>
          </Flex>
        </Td>
        <Flex mt={9}>
          <Text fontWeight="550">
            {`${date.substring(5, 7)}/${date.substring(8, 10)}/${date.substring(0, 4)}`}
          </Text>
        </Flex>
        <Td>
          <NavLink to={`/past-events/${event.id}`}>
            <Button
              color="#0075FF"
              variant="outline"
              borderWidth="2px"
              borderColor="#0075FF"
              onClick={() => console.log('sends to new page')}
            >
              View Event
            </Button>
          </NavLink>
        </Td>
      </Tr>
    </>
  );
};

const EventsTable = ({ events }) => {
  return (
    <TableContainer border={'2px solid #E2E8F0'} borderRadius={'15px'}>
      <Table mb={5} colorScheme="gray">
        <Thead bg="#F7FAFC">
          <Tr fontWeight={'medium'}>
            <Th w="25%">
              <Flex gap={2}>
                <Text color="#2D3748" fontWeight="650">
                  Event Name
                </Text>
              </Flex>
            </Th>
            <Th w="25%">
              <Flex gap={2}>
                <Text color="#2D3748" fontWeight="650">
                  Location
                </Text>
              </Flex>
            </Th>
            <Th w="25%">
              <Flex gap={2}>
                <Text color="#2D3748" fontWeight="650">
                  Date
                </Text>
              </Flex>
            </Th>
            <Th w="100%"></Th>
          </Tr>
        </Thead>
        <Tbody>
          {events.map(event => (
            <RenderEventRow key={event.id} event={event} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default EventsTable;
