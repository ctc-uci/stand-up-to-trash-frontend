import ExportButton from '../ExportCSVButton/ExportButton';
import AddEventsModal from '../AddEventsModal/AddEventsModal';
import Dropzone from '../Dropzone.tsx';
import { Box } from '@chakra-ui/react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';

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
    <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
      <p>Use this page to test out the look of any of your components!</p>
      <p>{user?.email}</p>

      <ExportButton eventId={19} />
      <ExportButton eventId={-1} />

      <AddEventsModal />
      <Dropzone />
    </Box>
  );
};

export default Playground;
