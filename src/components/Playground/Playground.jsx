import ExportButton from '../ExportCSVButton/ExportButton';
import AddEventsModal from '../AddEventsModal/AddEventsModal';
import Dropzone from '../Dropzone.tsx';
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
    <div>
      <p>Use this page to test out the look of any of your components!</p>
      <p>{user?.email}</p>

      <ExportButton eventId={19} />
      <ExportButton eventId={-1} />

      <AddEventsModal />
      <Dropzone />
    </div>
  );
};

export default Playground;
