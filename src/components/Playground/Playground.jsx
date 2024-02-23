import ExportButton from '../ExportCSVButton/ExportButton';
import AddEventsModal from '../AddEventsModal/AddEventsModal';
import Leaderboard from '../Leaderboard/Leaderboard.jsx';
import Dropzone from '../Dropzone.tsx';
import { Flex } from '@chakra-ui/react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import GetMapDirectionsButton from '../GetMapDirectionsButton/GetMapDirectionsButton.jsx';

const auth = getAuth();

const Playground = () => {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Flex
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      backgroundColor={'#FFFFFF'}
    >
      <p>Use this page to test out the look of any of your components!</p>
      <p>{user?.email}</p>

      <ExportButton eventId={19} />
      <ExportButton eventId={-1} />

      <GetMapDirectionsButton eventId={88} />

      <AddEventsModal />
      <Dropzone />
      <Leaderboard />
    </Flex>
  );
};

export default Playground;
