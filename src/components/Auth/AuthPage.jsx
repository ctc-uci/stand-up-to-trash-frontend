import { Box, Image, Flex, Heading } from '@chakra-ui/react';
import S2T_Logo from '../../Assets/S2T_Logo.png';
import PropTypes from 'prop-types';

const AuthPage = ({ children }) => {
  return (
    <Flex
      minH={'100vh'}
      // justifyContent={{ base: 'center', md: '' }}
      // alignItems={{ base: 'center', md: '' }}
    >
      <Box
        backgroundColor="#2D558A"
        position="relative"
        // display={'flex'}
        flexDir={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        width="50%"
        display={{ base: 'none', md: 'flex' }}
      >
        <Image
          borderRadius="full"
          src={S2T_Logo}
          alt="Logo"
          px={['1rem', '2rem', '4rem']}
          maxH={'24rem'}
        />
        <Box
          sytle={{ display: 'flex', flexDir: 'column', justifyContent: 'center', gap: 10 }}
          width={'100%'}
          objectFit={'cover'}
          px={['1rem', '2rem', '4rem']}
        >
          <Heading
            style={{
              color: 'white',
              // fontSize: '40px',
              fontWeight: '600',
              // marginTop: '52px',
              textAlign: 'center',
            }}
            fontSize={['24px', '32px', '40px']}
          >
            Stand Up To Trash
          </Heading>
          <Heading
            style={{
              color: 'white',
              // fontSize: '32px',
              fontWeight: '600',
              // marginTop: '20px',
              textAlign: 'center',
            }}
            fontSize={['16px', '24px', '32px']}
          >
            Making a Difference
          </Heading>
        </Box>
      </Box>
      <Box
        width="50%"
        display={'flex'}
        h="100%"
        justifyContent={'center'}
        alignContent={'center'}
        mx={4}
      >
        {children}
      </Box>
    </Flex>
  );
};

AuthPage.propTypes = {
  children: PropTypes.node,
};

export default AuthPage;
