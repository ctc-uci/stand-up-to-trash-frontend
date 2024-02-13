import {
  Flex,
  Text,
  Input,
  InputGroup,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  InputLeftElement,
  Image,
  Tag,
  IconButton,
  Icon,
} from '@chakra-ui/react';

import { SearchIcon, InfoIcon } from '@chakra-ui/icons';
import { IoPerson } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import { getAdminProfile } from '../utils/profileUtils';

export default function AdminPage() {
  const [adminData, setAdminData] = useState([]);

  useEffect(() => {
    getAdminProfile().then(data => setAdminData(data));
  }, []);

  const adminDataList = adminData.map(admin => {
    return (
      <Tr key={admin.id}>
        {/* COLUMN 1 */}
        <Td padding={5}>
          <Flex gap={3} alignItems={'center'}>
            <Image
              boxSize="60px"
              borderRadius={'full'}
              src="https://i.pinimg.com/1200x/00/70/16/00701602b0eac0390b3107b9e2a665e0.jpg"
            />
            <Flex flexDir={'column'} gap={2}>
              <Text fontSize={'md'} fontWeight={'500'}>
                {admin.first_name} {admin.last_name}
              </Text>
              <Flex>
                <Tag backgroundColor={'#2D558A'} color={'white'} borderRadius={12} fontSize={'sm'}>
                  Primary Admin
                </Tag>
              </Flex>
            </Flex>
          </Flex>
        </Td>

        {/* COLUMN 2 */}
        <Td fontSize={'md'}>{admin.email}</Td>
        {/* COLUMN 3 */}
        <Td fontSize={'md'}>Admin</Td>
        {/* COLUMN 4 */}
        <Td>
          <Tag
            backgroundColor={'#2D558A'}
            color={'white'}
            borderRadius={12}
            onClick={() => {}}
            fontSize={'md'}
          >
            Edit
          </Tag>
        </Td>
      </Tr>
    );
  });

  return (
    <Flex flexDir={'column'} w={'100vw'} padding={'2%'} gap={'1em'}>
      {/* title and add admin button */}
      <Flex justify={'space-between'}>
        <Text fontFamily={'Poppins'} fontSize={'2.3rem'} fontWeight={500}>
          Administrators
        </Text>
        <Button borderRadius={20}>+ Add Admin</Button>
      </Flex>

      {/* Searchbar */}
      <Flex gap={'1em'}>
        <InputGroup>
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
          <Input size={'lg'} placeholder="Search Administrator Name (e.g. “Amy Santiago”)"></Input>
        </InputGroup>
        <IconButton background={'#2D558A'} color="white" icon={<SearchIcon />} size={'lg'} />
      </Flex>

      {/* TABLE */}
      <TableContainer>
        <Table
          size="sm"
          colorScheme="gray"
          border="1px solid #E2E8F0"
          borderRadius={'lg'}
          overflow={'hidden'}
        >
          <Thead backgroundColor={'#E2E8F0'} h={'3em'}>
            <Tr>
              <Th>
                <Flex alignItems={'center'} gap={2}>
                  <Icon as={IoPerson} boxSize={'1.5em'} />
                  <Text fontSize={'md'}>User Name</Text>
                </Flex>
              </Th>
              <Th>
                <Flex alignItems={'center'} gap={2}>
                  <InfoIcon boxSize={'1.5em'} />
                  <Text fontSize={'md'}>Email Address</Text>
                </Flex>
              </Th>
              <Th>
                <Flex alignItems={'center'} gap={2}>
                  <InfoIcon boxSize={'1.5em'} />
                  <Text fontSize={'md'}>Role</Text>
                </Flex>
              </Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {adminDataList}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}
