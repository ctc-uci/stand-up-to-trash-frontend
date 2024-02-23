import { Box, Image } from '@chakra-ui/react';
import home from '../../Assets/navbar/home.svg';
import profile from '../../Assets/navbar/profile.svg';
import archive from '../../Assets/navbar/archive.svg';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        position="sticky"
        top="0"
        width="75px"
        float="left"
        style={{ shapeOutside: 'inset(50%' }}
      >
        <Box
          h="100vh"
          backgroundColor="#9DDAEF"
          flex="0 0 75px"
          display="flex"
          flexDir="column"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box display="flex" flexDir="column" p="10px" pt="24px" gap="20px">
            {/* Top sidebar items */}
            <Box
              display="flex"
              as="button"
              onClick={() => navigate('/')}
              background="#2D558A"
              borderRadius="12px"
              padding="8px"
              width="46px"
              height="46px"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25);"
            >
              <Image src={home} />
            </Box>
            <Box
              display="flex"
              as="button"
              onClick={() => navigate('/profiles')}
              background="#6395BB"
              borderRadius="12px"
              padding="8px"
              width="46px"
              height="46px"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25);"
            >
              <Image src={profile} />
            </Box>
            <Box
              display="flex"
              as="a"
              href="#"
              onClick={() => navigate('/archived-events')}
              background="#6395BB"
              borderRadius="12px"
              padding="8px"
              width="46px"
              height="46px"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25);"
            >
              <Image src={archive} />
            </Box>
          </Box>
          {/* <Box display="flex" flexDir="column" p="10px" as="button"> */}
          {/* Bottom sidebar items */}
          {/* <svg
            width="55"
            height="55"
            viewBox="0 0 55 55"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="27.5" cy="27.5" r="27.5" fill="#404040" />
          </svg> */}
          {/* </Box> */}
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
