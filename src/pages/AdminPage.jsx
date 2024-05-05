import { useState, useEffect } from 'react';
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
import { getAdminProfile } from '../utils/profileUtils';
import EditUserModal from '../components/AdminModals/EditUserModal';
import AddUserModal from '../components/AdminModals/AddUserModal';

export default function AdminPage() {
  const [adminData, setAdminData] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  useEffect(() => {
    getAdminProfile()
      .then(data => setAdminData(data))
      .catch(error => console.error('Failed to fetch admin profiles:', error));
  }, []);

  const openEditModal = admin => {
    setSelectedAdmin(admin);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedAdmin(null);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const adminDataList = adminData.map(admin => (
    <Tr key={admin.id}>
      <Td padding={5}>
        <Flex gap={3} alignItems={'center'}>
          <Image
            boxSize="60px"
            borderRadius={'full'}
            src={admin.image_url || 'https://via.placeholder.com/150'}
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
      <Td fontSize={'md'}>{admin.email}</Td>
      <Td fontSize={'md'}>Admin</Td>
      <Td>
        <Tag
          backgroundColor={'#2D558A'}
          color={'white'}
          borderRadius={12}
          onClick={() => openEditModal(admin)}
          fontSize={'md'}
          cursor="pointer"
        >
          Edit
        </Tag>
      </Td>
    </Tr>
  ));

  return (
    <Flex ml="15rem" flexDir={'column'} padding={'2%'} gap={'1em'} backgroundColor={'#C8E6FF'}>
      <Flex justify={'space-between'}>
        <Text fontSize={'2.3rem'} fontWeight={500}>
          Administrators
        </Text>
        <Button borderRadius={20} onClick={openAddModal} backgroundColor={'#EFEFEF'}>
          + Add Admin
        </Button>
      </Flex>

      <Flex gap={'1em'}>
        <InputGroup>
          <InputLeftElement mt={1}>
            <SearchIcon />
          </InputLeftElement>
          <Input
            size={'lg'}
            placeholder="Search Administrator Name (e.g. “Amy Santiago”)"
            backgroundColor={'white'}
          ></Input>
        </InputGroup>
        <IconButton
          background={'#2D558A'}
          color="white"
          icon={<SearchIcon />}
          size={'lg'}
          w={'4rem'}
        />
      </Flex>

      <TableContainer>
        <Table
          size="sm"
          colorScheme="gray"
          borderRadius={'lg'}
          overflow={'hidden'}
          backgroundColor={'white'}
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
          <Tbody>{adminDataList}</Tbody>
        </Table>
      </TableContainer>

      {isEditModalOpen && selectedAdmin && (
        <EditUserModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          selectedAdmin={selectedAdmin}
          setAdminData={setAdminData}
          adminData={adminData}
        />
      )}

      {isAddModalOpen && (
        <AddUserModal isOpen={isAddModalOpen} onClose={closeAddModal} setAdminData={setAdminData} />
      )}
    </Flex>
  );
}
