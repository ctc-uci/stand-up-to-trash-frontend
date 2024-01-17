import { Flex, Input, Button, Text, VStack } from '@chakra-ui/react';
import { getProfileById } from '../../utils/profileUtils';
import ProfileCard from './ProfileCard';
import { useState } from 'react';

const GetByIdForm = () => {
  const [id, setId] = useState('');
  const [profile, setProfile] = useState();

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const response = await getProfileById(id);
      setProfile(response);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  return (
    <>
      <form onSubmit={e => submitHandler(e)}>
        <VStack spacing={5}>
          <Text textAlign="center" fontWeight="bold">
            Get Volunteer Profile by ID
          </Text>
          <Flex justify="space-between">
            <Input
              name="id"
              focusBorderColor="blue"
              placeholder="Please enter ID Number..."
              value={id}
              onChange={e => setId(e.target.value)}
            />
            <Button type="submit" colorScheme="blue">
              Submit
            </Button>
          </Flex>
        </VStack>
      </form>
      {profile && <ProfileCard profile={profile} />}
    </>
  );
};

export default GetByIdForm;
