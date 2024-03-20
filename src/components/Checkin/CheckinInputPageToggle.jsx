/* eslint-disable react/prop-types */
import { Menu, MenuButton, MenuList, MenuItem, Flex, Text } from '@chakra-ui/react';

import { ChevronDownIcon } from '@chakra-ui/icons';
import { FaArrowRightToBracket, FaSquarePlus } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const CheckinInputPageToggle = ({ eventId, isCheckinPage }) => {
  const navigate = useNavigate();
  return (
    <Menu>
      <MenuButton
        px={4}
        py={2}
        transition="all 0.2s"
        borderRadius="lg"
        borderWidth="1px"
        bg={'white'}
        _expanded={{ bg: 'gray.100', border: '1px solid gray' }}
      >
        <Flex alignItems={'center'} gap={3}>
          <Flex background={'#0075FF'} p={2.5} borderRadius={'lg'}>
            {isCheckinPage ? (
              <FaArrowRightToBracket size={30} color="white" />
            ) : (
              <FaSquarePlus size={30} color="white" />
            )}
          </Flex>
          <Flex flexDir={'column'} alignItems={'flex-start'}>
            <Text fontWeight={'semibold'} fontSize={'2xl'}>
              {isCheckinPage ? 'Check-in' : 'Log weight'}
            </Text>
            <Text color={'#717171'}>{isCheckinPage ? 'before event' : 'after event'}</Text>
          </Flex>
          <ChevronDownIcon color={'#717171'} ml={2} boxSize={30} />
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem
          onClick={() => {
            !isCheckinPage ? navigate(`/checkin/${eventId}`) : navigate(`/input-data/${eventId}`);
          }}
        >
          <Flex alignItems={'center'} gap={2}>
            <Flex background={'#0075FF'} p={2.5} borderRadius={'lg'}>
              {isCheckinPage ? (
                <FaSquarePlus size={15} color="white" />
              ) : (
                <FaArrowRightToBracket size={15} color="white" />
              )}
            </Flex>
            <Text fontWeight={'semibold'} fontSize={'lg'}>
              {isCheckinPage ? 'Log weight' : 'Check-in'}
            </Text>
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default CheckinInputPageToggle;
