import { useState } from 'react';
import { Stack, Input, Button, Text } from '@chakra-ui/react';
import { postProfile } from '../../../utils/profileUtils';

const ProfileForm = () => {
  const [profile, setProfile] = useState({
    id: '',
    email: '',
    first_name: '',
    last_name: '',
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  async function submitHandler(e) {
    e.preventDefault();
    try {
      const response = await postProfile(profile);
      console.log(response);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  }

  return (
    <form onSubmit={e => submitHandler(e)}>
      <Stack spacing={3}>
        <Text textAlign="center" fontWeight="bold">
          Create new Volunteer Profile
        </Text>
        <Input
          name="id"
          focusBorderColor="blue"
          placeholder="Please enter your ID Number..."
          value={profile.id}
          onChange={handleInputChange}
        />
        <Input
          name="email"
          focusBorderColor="blue"
          placeholder="Please enter your Email..."
          value={profile.email}
          onChange={handleInputChange}
        />
        <Input
          name="first_name"
          focusBorderColor="blue"
          placeholder="Please enter your First Name..."
          value={profile.first_name}
          onChange={handleInputChange}
        />
        <Input
          name="last_name"
          focusBorderColor="blue"
          placeholder="Please enter your Last Name..."
          value={profile.last_name}
          onChange={handleInputChange}
        />
        <Button type="submit" colorScheme="blue">
          Submit
        </Button>
      </Stack>
    </form>
  );
};

export default ProfileForm;
