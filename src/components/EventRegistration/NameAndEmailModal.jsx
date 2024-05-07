import RegistrationModal from './RegistrationModal';
import { Flex, Icon, Text, Link, Input } from '@chakra-ui/react';
import { VscSparkleFilled } from 'react-icons/vsc';
import { GoArrowRight } from 'react-icons/go';
import { useContext } from 'react';
import UserContext from '../../utils/UserContext';

const NameAndEmailModal = ({ ...props }) => {
  const { user } = useContext(UserContext);
  return (
    <RegistrationModal title="What is your name and Email?" {...props}>
      <Flex
        flexDir={'column'}
        backgroundColor={'#DAEBFF'}
        p={'1em'}
        borderRadius={'12px'}
        mb={'1em'}
      >
        <Flex align={'center'} gap={'0.25em'}>
          <Flex
            justify={'center'}
            align={'center'}
            backgroundColor={'#0075FF'}
            w={'1.5em'}
            h={'1.5em'}
            borderRadius={'4px'}
            flexDir={'column'}
          >
            <Icon as={VscSparkleFilled} color={'white'} />
          </Flex>
          <Text as={'b'} fontSize={'1.25em'} color={'#3B3B3B'}>
            Autofilled from your profile
          </Text>
        </Flex>

        <Flex align={'center'} gap={'0.25em'}>
          <Flex
            justify={'center'}
            align={'center'}
            backgroundColor={'#10C13F'}
            w={'1.5em'}
            h={'1.5em'}
            borderRadius={'4px'}
            flexDir={'column'}
            visibility={'hidden'}
          >
            <Icon as={VscSparkleFilled} color={'white'} />
          </Flex>
          <Text color={'#717171'}>Collected from your account</Text>
        </Flex>

        <Flex align={'center'} mt={'0.5em'} gap={'0.25em'}>
          <Flex
            justify={'center'}
            align={'center'}
            backgroundColor={'#10C13F'}
            w={'1.5em'}
            h={'1.5em'}
            borderRadius={'4px'}
            flexDir={'column'}
            visibility={'hidden'}
          >
            <Icon as={VscSparkleFilled} color={'white'} />
          </Flex>
          <Link color={'#0075FF'} fontWeight={600} fontSize={'1.15em'} href="/profile">
            Change information
          </Link>
          <Icon as={GoArrowRight} color={'#0075FF'} boxSize={'1.65em'} ml={'0.2em'} />
        </Flex>
      </Flex>

      <Flex flexDir={'column'}>
        <Flex mb={'1em'} gap={'1em'}>
          <Flex flexDir={'column'}>
            <Text fontWeight={600} color={'#3B3B3B'}>
              First Name
            </Text>
            <Input
              value={user.first_name}
              fontSize={'1.25em'}
              borderColor={'#EFEFEF'}
              borderWidth={'4px'}
              h={'2.5em'}
              color={'#3B3B3B'}
              _disabled={{ color: '#3B3B3B', fontWeight: 500 }}
              _hover={{ borderColor: '#EFEFEF' }}
              disabled
            />
          </Flex>

          <Flex flexDir={'column'}>
            <Text fontWeight={600} color={'#3B3B3B'}>
              Last Name
            </Text>
            <Input
              value={user.last_name}
              borderRadius={'4px'}
              fontSize={'1.25em'}
              borderColor={'#EFEFEF'}
              borderWidth={'4px'}
              h={'2.5em'}
              color={'#3B3B3B'}
              _disabled={{ color: '#3B3B3B', fontWeight: 500 }}
              _hover={{ borderColor: '#EFEFEF' }}
              disabled
            />
          </Flex>
        </Flex>

        <Flex flexDir={'column'}>
          <Text fontWeight={600} color={'#3B3B3B'}>
            Email
          </Text>
          <Input
            value={user.email}
            borderRadius={'4px'}
            fontSize={'1.25em'}
            borderColor={'#EFEFEF'}
            borderWidth={'4px'}
            h={'2.5em'}
            _disabled={{ color: '#3B3B3B', fontWeight: 500 }}
            _hover={{ borderColor: '#EFEFEF' }}
            disabled
          />
        </Flex>
      </Flex>
    </RegistrationModal>
  );
};

export default NameAndEmailModal;
