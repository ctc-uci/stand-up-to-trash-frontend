import { Button, VStack, StackDivider } from '@chakra-ui/react';
import ProfileCard from '../components/DummyProfiles/ProfileCard';
import ProfileForm from '../components/DummyProfiles/ProfileForm';
import { getProfile } from '../../utils/profileUtils';
import { useState } from 'react';
import GetByIdForm from '../components/DummyProfiles/GetByIdForm';

const DummyProfiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [displayProfiles, setDisplayProfiles] = useState(false);

  const viewProfile = async () => {
    await getProfile().then(data => setProfiles(data));
    setDisplayProfiles(prev => !prev);
  };
  return (
    <VStack divider={<StackDivider borderColor="gray.200" />} spacing={10} align="stretch">
      <ProfileForm />
      <GetByIdForm />
      <>
        <Button onClick={viewProfile} colorScheme="blue">
          View all profiles
        </Button>
        {displayProfiles &&
          profiles.map(profile => <ProfileCard profile={profile} key={profile.id} />)}
      </>
    </VStack> // Add closing tag for Stack element
  );
};

export default DummyProfiles;
