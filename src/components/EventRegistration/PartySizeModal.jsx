import { Icon, Flex, Text } from '@chakra-ui/react';
import RegistrationModal from './RegistrationModal';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { AddIcon, MinusIcon } from '@chakra-ui/icons';

const PartySizeModal = ({ registrationFlowState, ...props }) => {
  // Copy to prevent mutating original instance
  registrationFlowState = { ...registrationFlowState };
  registrationFlowState.continueActive =
    registrationFlowState.continueActive &&
    registrationFlowState.partySize > 0 &&
    registrationFlowState.partySize <= 100;

  const [partySize, setPartySize] = useState(registrationFlowState.partySize);
  return (
    <RegistrationModal
      title="How many people are in your party?"
      registrationFlowState={registrationFlowState}
      {...props}
    >
      <Flex flexDir={'column'} justify={'center'} align={'center'}>
        <Flex
          align={'center'}
          borderRadius={'12px'}
          borderWidth={'4px'}
          w={'10em'}
          h={'6em'}
          justify={'center'}
        >
          <Flex
            justify={'center'}
            align={'center'}
            h={'100%'}
            w={'33%'}
            onClick={() => {
              setPartySize(prev => prev - 1);
              registrationFlowState.setPartySize(prev => prev - 1);
            }}
            _hover={{ cursor: 'pointer' }}
          >
            <Icon as={MinusIcon} color={'#BABABA'} boxSize={'1.5em'} />
          </Flex>
          <Flex justify={'center'} align={'center'} h={'100%'} w={'33%'}>
            <Text as={'b'} fontSize={'2em'}>
              {partySize}
            </Text>
          </Flex>
          <Flex
            justify={'center'}
            align={'center'}
            h={'100%'}
            w={'33%'}
            onClick={() => {
              setPartySize(prev => prev + 1);
              registrationFlowState.setPartySize(prev => prev + 1);
            }}
            _hover={{ cursor: 'pointer' }}
          >
            <Icon as={AddIcon} color={'#BABABA'} boxSize={'1.5em'} />
          </Flex>
        </Flex>
        <Text color={'#717171'} fontWeight={600} fontSize={'1.25em'}>
          Total people attending
        </Text>
      </Flex>
    </RegistrationModal>
  );
};

PartySizeModal.propTypes = {
  registrationFlowState: PropTypes.object,
};

export default PartySizeModal;
