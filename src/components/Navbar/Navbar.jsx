import { Box, Text } from '@chakra-ui/react';
import home from '../../Assets/navbar/home.png';
import profile from '../../Assets/navbar/profile.png';
import archive from '../../Assets/navbar/archive.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const [currPath, setCurrentPath] = useState('home');

  return (
    <>
      <Box position="fixed" top="0" w={'15rem'} float="left">
        <Box
          h="100vh"
          // backgroundColor="#9DDAEF"
          borderRight={'1px solid #E2E8F0'}
          flex=""
          display="flex"
          flexDir="column"
          justifyContent="space-between"
          alignItems="start"
        >
          <Box display="flex" flexDir="column" width={'full'} as="a" href="/">
            <Box
              style={{
                height: '40px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
                paddingTop: '35px',
                paddingBottom: '35px',
                paddingLeft: '20px',
                backgroundColor: currPath === 'home' ? '#C8E6FF' : 'transparent',
              }}
              onClick={e => {
                e.preventDefault();
                setCurrentPath('home');
                navigate('/events');
              }}
            >
              <img src={home} />
              <Text>Home</Text>
            </Box>
            <Box
              style={{
                height: '40px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
                paddingTop: '35px',
                paddingBottom: '35px',
                paddingLeft: '20px',
                backgroundColor: currPath === 'archived-events' ? '#C8E6FF' : 'transparent',
              }}
              onClick={e => {
                e.preventDefault();
                setCurrentPath('archived-events');
                navigate('/archived-events');
              }}
            >
              <img src={archive} />
              <Text>Event Archive</Text>
            </Box>
            <Box
              style={{
                height: '40px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
                paddingTop: '35px',
                paddingBottom: '35px',
                paddingLeft: '20px',
                backgroundColor: currPath === 'admin' ? '#C8E6FF' : 'transparent',
              }}
              onClick={e => {
                e.preventDefault();
                setCurrentPath('admin');
                navigate('/admin');
              }}
            >
              <img src={profile} />
              <Text>Admins</Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
