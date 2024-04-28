import RegistrationModal from './RegistrationModal';
import { Flex, Text, Icon } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { IoPersonSharp } from 'react-icons/io5';
import { MdPeopleAlt } from 'react-icons/md';
import { useState } from 'react';
import { CheckIcon } from '@chakra-ui/icons';

const WhoAreYouRegisteringForModal = ({ registrationFlowState, ...props }) => {
  const [isChosen, setIsChosen] = useState(
    registrationFlowState.isIndividual ? 'individual' : 'group',
  );

  return (
    <RegistrationModal
      registrationFlowState={registrationFlowState}
      {...props}
      title="Who are you registering for?"
      animate={registrationFlowState.firstOpen}
    >
      <Flex
        borderColor={isChosen == 'individual' ? '#0075FF' : '#EFEFEF'}
        borderWidth={isChosen == 'individual' ? '4px' : '3px'}
        backgroundColor={isChosen == 'individual' ? '#DAEBFF' : 'white'}
        p={'0.8em'}
        borderRadius={'8px'}
        mb={'0.7em'}
        _hover={{
          cursor: 'pointer',
        }}
        opacity={isChosen == 'group' ? 0.5 : 1}
        align={'center'}
        justifyContent={'space-between'}
        onClick={() => {
          registrationFlowState.setIsIndividual(true);
          setIsChosen('individual');
        }}
      >
        <Flex flexDir={'column'}>
          <Flex align={'center'} gap={'0.25em'}>
            <Flex
              justify={'center'}
              align={'center'}
              backgroundColor={'#10C13F'}
              w={'1.5em'}
              h={'1.5em'}
              borderRadius={'4px'}
              flexDir={'column'}
            >
              <Icon as={IoPersonSharp} color={'white'} />
            </Flex>
            <Text as={'b'} fontSize={'1.25em'} color={'#3B3B3B'}>
              Just Me
            </Text>
          </Flex>
          <Flex align={'center'} gap={'0.25em'}>
            <Flex
              justify={'center'}
              align={'center'}
              w={'1.5em'}
              h={'1.5em'}
              borderRadius={'4px'}
              flexDir={'column'}
            >
              <Icon as={IoPersonSharp} color={'white'} visibility={'hidden'} />
            </Flex>
            <Text color={'#717171'}>Signing up for myself</Text>
          </Flex>
        </Flex>
        {isChosen == 'individual' ? (
          <Icon as={CheckIcon} color={'#0075FF'} mr={'1.5em'} boxSize={'1.5em'} />
        ) : null}
      </Flex>

      <Flex
        borderColor={isChosen == 'group' ? '#0075FF' : '#EFEFEF'}
        borderWidth={isChosen == 'group' ? '4px' : '3px'}
        backgroundColor={isChosen == 'group' ? '#DAEBFF' : 'white'}
        p={'0.8em'}
        borderRadius={'8px'}
        _hover={{
          cursor: 'pointer',
        }}
        opacity={isChosen == 'individual' ? 0.5 : 1}
        align={'center'}
        justifyContent={'space-between'}
        onClick={() => {
          registrationFlowState.setIsIndividual(false);
          setIsChosen('group');
        }}
        mb={'8em'}
      >
        <Flex flexDir={'column'}>
          <Flex align={'center'} gap={'0.25em'}>
            <Flex
              justify={'center'}
              align={'center'}
              backgroundColor={'#633CFF'}
              w={'1.5em'}
              h={'1.5em'}
              borderRadius={'4px'}
              flexDir={'column'}
            >
              <Icon as={MdPeopleAlt} color={'white'} />
            </Flex>
            <Text as={'b'} fontSize={'1.25em'} color={'#3B3B3B'}>
              Group
            </Text>
          </Flex>
          <Flex align={'center'} gap={'0.25em'}>
            <Flex
              justify={'center'}
              align={'center'}
              w={'1.5em'}
              h={'1.5em'}
              borderRadius={'4px'}
              flexDir={'column'}
            >
              <Icon as={MdPeopleAlt} color={'white'} visibility={'hidden'} />
            </Flex>
            <Text color={'#717171'}>Signing up for family, friends, etc.</Text>
          </Flex>
        </Flex>
        {isChosen == 'group' ? (
          <Icon as={CheckIcon} color={'#0075FF'} mr={'1.5em'} boxSize={'1.5em'} />
        ) : null}
      </Flex>
    </RegistrationModal>
  );
};

WhoAreYouRegisteringForModal.propTypes = {
  registrationFlowState: PropTypes.object,
};

export default WhoAreYouRegisteringForModal;
