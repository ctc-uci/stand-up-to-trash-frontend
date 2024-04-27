import ExportButton from '../ExportCSVButton/ExportButton';
import AddEventsModal from '../EventsModal/AddEventsModal';
import Leaderboard from '../Leaderboard/Leaderboard.jsx';
import Dropzone from '../Dropzone.tsx';
import { Flex, useDisclosure, Button } from '@chakra-ui/react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import GetMapDirectionsButton from '../GetMapDirectionsButton/GetMapDirectionsButton.jsx';
import 'react-html5-camera-photo/build/css/index.css';
import { logGoogleUserOut } from '../../utils/googleAuthUtils.js';
import CameraModal from '../CameraModal';
import RegisterGuestModal from '../RegisterGuestModal/RegisterGuestModal.jsx';

// import Scanner from '../Scanner.jsx';
import VolunteerCardModal from './VolunteerCardModal.tsx';
import VolunteerSideView from '../VolunteerSideView.jsx';
import QRCodePage from '../../pages/QRCodePage';
import ExportCsvComponent from '../Events/CSVExample.jsx';

const auth = getAuth();

const Playground = () => {
  const [user, setUser] = useState(auth.currentUser);
  const { isOpen, onOpen, onClose } = useDisclosure();

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

      <button
        onClick={logGoogleUserOut}
        style={{ backgroundColor: 'red', padding: '6px', borderRadius: '10px', color: 'white' }}
      >
        LOGOUT
      </button>

      <VolunteerCardModal volunteerId={1} />

      {/* <p>Scanner: </p>
      <Scanner /> */}

      <ExportButton eventId={19} />
      <ExportButton eventId={-1} />
      <QRCodePage />

      <GetMapDirectionsButton eventId={88} />

      <AddEventsModal />
      <Dropzone />
      <Leaderboard event_id={35} />
      <Button onClick={onOpen}>CLICK FOR CAMERA</Button>
      <Button onClick={onOpen}>RegisterGuestModal</Button>
      <RegisterGuestModal isOpen={isOpen} onClose={onClose} eventId={'4'} />
      <CameraModal isOpen={isOpen} onClose={onClose} eventID={3} />
      <VolunteerSideView eventId={88} />
      <ExportCsvComponent />
    </Flex>
  );
};

export default Playground;
