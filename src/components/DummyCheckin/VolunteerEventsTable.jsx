/* eslint-disable react/prop-types */
import 'react';
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
} from '@chakra-ui/react';
import { FaUser, FaClock, FaArrowUp, FaTag } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
// import DataEntryModal from '../DataEntryModal/DataEntryModal';

const VolunteerEventsTable = ({ volunteers }) => {
  //console.log(volunteers);

  const renderVolunteerRow = volunteer => {
    const {first_name, last_name, email, image_url, is_checked_in } = volunteer.props.data;
    console.log(volunteer)
    // lofi says no checkboxes, so names and the name column title has a margin left of 5rem, feel free to remove if checkboxes added
    return (
      <Tr>
        <Td>
          <Flex ml="5rem">
            <Image src={image_url} boxSize="4rem" borderRadius='full'/>
            <Flex direction="column" ml={3} mt={2} g={1}>
              <Text>{first_name} {last_name}</Text>
              <Text fontWeight="light">{email}</Text>
            </Flex>
          </Flex>
        </Td>
        <Td>
          <Text color="green" fontWeight="650">ATTENDED</Text>
        </Td>
        <Td>
          <Flex>
            {
              is_checked_in ? <Tag bg="#D53F8C"  color="white">Input Data</Tag> : <Tag bg="#95D497">Check-In</Tag>
            }
            <Spacer />
            <Menu>
            <BsThreeDots />
            </Menu>
          </Flex>

        </Td>
      </Tr>

    );
  }

  return (
    <TableContainer>
      <Table variant='simple'>
        <TableCaption>Volunteers for this event</TableCaption>
        <Thead bg="#F7FAFC">
          <Tr>
            <Th w="65%">
              <Flex gap={2} ml="5rem">
                  <FaUser size="1rem"/>
                  <Text color="black" fontWeight="650">NAME</Text>
              </Flex>
            </Th>
            <Th>
              <Flex gap={2}>
                  <FaClock size="1rem"/>
                  <Text color="black" fontWeight="650">STATUS</Text>
                  <FaArrowUp size="1rem"/>
              </Flex>
            </Th>
            <Th>
              <Flex gap={2}>
                  <FaTag size="1rem" transform="rotate(90)"/>
                  <Text color="black" fontWeight="650">ACTION</Text>
              </Flex>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
            {
              volunteers.map((volunteer) => renderVolunteerRow(volunteer))
            }
        </Tbody>
      </Table>
    </TableContainer>
  );
};


// VolunteerEventsTable.propTypes = {
//   volunteers: PropTypes.isObject.isRequired
// };

export default VolunteerEventsTable
