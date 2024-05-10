import RegistrationModal from './RegistrationModal';
import { Box, Text, Flex, Spinner } from '@chakra-ui/react';

const LoadingModal = ({ ...props }) => {
  return (
    <RegistrationModal {...props} buttons={<></>}>
      <Flex align={'center'} justify={'center'} w="100%" pt="80px" mb="46px">
        <Spinner color="blue.500" size={'xl'} speed="0.8s" thickness="6px" />
      </Flex>
      <Box>
        <Text fontSize={'30px'} align={'center'} fontWeight={800}>
          {`Registering...`}
        </Text>
        <Text
          color={'#717171'}
          fontSize={'22px'}
          align={'center'}
          fontWeight={800}
        >
          {`Hang tight, and you'll registered soon!`}
        </Text>
      </Box>
    </RegistrationModal>
  );
};

export default LoadingModal;
