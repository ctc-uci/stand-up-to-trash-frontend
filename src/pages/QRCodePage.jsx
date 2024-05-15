import QRCode from 'qrcode.react';
import UserContext from '../utils/UserContext';
import { HamburgerIcon } from '@chakra-ui/icons';

import { useContext, useEffect, useState } from 'react';
import { Text, Box, Image, Flex } from '@chakra-ui/react';
import lightbulb from './../Assets/lightbulb.svg';
import NavbarContext from '../utils/NavbarContext';

function QRCodePage() {
  const { user } = useContext(UserContext);
  const [volunteerId, setVolunteerId] = useState('');
  const [volunteerFirstName, setVolunteerFirstName] = useState('');
  const [volunteerLastName, setVolunteerLastName] = useState('');
  const [volunteerEmail, setVolunteerEmail] = useState('');

  const { onNavbarDrawerOpen } = useContext(NavbarContext);

  useEffect(() => {
    setVolunteerId(user.id.toString());
    setVolunteerFirstName(user.first_name);
    setVolunteerLastName(user.last_name);
    setVolunteerEmail(user.email);
  }, [user]);

  return (
    <Flex flexDir={'column'} p={5}>
      <HamburgerIcon
        color={'#717171'}
        boxSize={50}
        display={{ base: 'flex', xl: 'none' }}
        onClick={onNavbarDrawerOpen}
      />
      <Box
        display={'flex'}
        flexDir={'column'}
        height={'100vh'}
        justifyContent={'center'}
        alignItems={'center'}
        padding={'8'}
      >
        <Box
          display={'flex'}
          flexDir={'column'}
          height={'100vh'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Box height={'200'} width={'200'}>
            <QRCode
              value={volunteerId}
              renderAs="canvas"
              style={{
                scale: '2',
                border: '3px solid #EFEFEF',
                padding: '6px',
                borderRadius: '8px',
              }}
            />
          </Box>

          <Box
            textAlign="center"
            maxWidth={{ base: '350px', md: '375px' }}
            textOverflow="ellipsis"
            whiteSpace="nowrap"
            overflow="hidden"
          >
            <Text fontSize="4xl" as="b" color={'3B3B3B'}>
              {volunteerFirstName} {volunteerLastName}
            </Text>
          </Box>
          <Box>
            <Text fontSize="2xl" color={'rgba(0, 0, 0, 0.50)'}>
              {volunteerEmail}
            </Text>
          </Box>
        </Box>
        {/* recommendations section */}
        <Box
          display={'flex'}
          flexDir={'row'}
          border={'4px solid #EFEFEF'}
          gap={'12px'}
          p={'12px'}
          borderRadius={'12px'}
          alignItems={'center'}
          justifyContent={'center'}
          alignContent={'center'}
        >
          <Image src={lightbulb}></Image>
          <Text fontSize="20px" fontWeight={'600'} color={'#3B3B3B'}>
            Show this to an admin to be signed in!
          </Text>
        </Box>
      </Box>
    </Flex>
  );
}

export default QRCodePage;
