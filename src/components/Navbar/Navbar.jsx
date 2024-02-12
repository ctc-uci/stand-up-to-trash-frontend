import { Box } from '@chakra-ui/react';
import home from '../../Assets/navbar/home.png';
import profile from '../../Assets/navbar/profile.png';
import archive from '../../Assets/navbar/archive.png';

const Navbar = () => {
  return (
    <>
      <Box position="fixed" top="0" width="74x" float="left" style={{ shapeOutside: 'inset(50%' }}>
        <Box
          h="100vh"
          backgroundColor="#9DDAEF"
          flex="0 0 73px"
          display="flex"
          flexDir="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" flexDir="column" p="10px" as="a" href="/">
            <img src={home} style={{ marginTop: '10px', marginBottom: '10px' }} />
            <img src={profile} style={{ marginBottom: '10px' }} />
            <img src={archive} />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
