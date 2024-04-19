import {
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const RegistrationModal = ({
  children,
  title,
  registrationFlowState,
  animate = false,
  buttons,
  continueText = 'Continue',
}) => {
  console.log(registrationFlowState);

  return (
    <Modal isOpen={true} size="xl" motionPreset={animate ? 'scale' : 'none'}>
      <ModalOverlay />
      <ModalContent borderRadius={'18px'}>
        <ModalHeader justify={'center'} align={'center'} paddingTop="3rem">
          <Text
            color={'#717171'}
            fontSize={'20px'}
            align={'center'}
            fontFamily={'Avenir'}
            fontWeight={800}
            mb={'-6px'}
          >
            Volunteer registration
          </Text>
          <Text fontFamily={'Avenir'} fontSize={'32px'} align={'center'} fontWeight={800}>
            {title}
          </Text>
        </ModalHeader>
        <ModalCloseButton
          borderRadius={'100px'}
          background="#EFEFEF"
          color="#717171"
          onClick={e => {
            e.preventDefault();
            registrationFlowState.onCloseFlowModal();
          }}
        />
        <ModalBody>
          {/* insert children (includes the title in here) for different steps */}
          {children}
          {buttons ? (
            buttons
          ) : (
            <Flex justify={'flex-end'} w={'100%'} gap={'1rem'}>
              <Button
                w={'7rem'}
                backgroundColor={'#FFFFFF'}
                color={'#0075FF'}
                border={'0.1rem solid #0075FF'}
                onClick={registrationFlowState.onPrevious}
                isDisabled={!registrationFlowState.previousActive}
              >
                Back
              </Button>
              <Button
                w={'7rem'}
                backgroundColor={'#0075FF'}
                color={'white'}
                _hover={{ bg: '#7eb5f7' }}
                onClick={registrationFlowState.onContinue}
                isDisabled={!registrationFlowState.continueActive}
              >
                {continueText}
              </Button>
            </Flex>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

RegistrationModal.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  registrationFlowState: PropTypes.object.isRequired,
  animate: PropTypes.bool,
  buttons: PropTypes.node,
  continueText: PropTypes.string,
};

export default RegistrationModal;
