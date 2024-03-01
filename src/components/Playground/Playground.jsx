import ExportButton from '../ExportCSVButton/ExportButton';
import AddEventsModal from '../AddEventsModal/AddEventsModal';
import Leaderboard from '../Leaderboard/Leaderboard.jsx';
import Dropzone from '../Dropzone.tsx';
import { Flex, useDisclosure, Button } from '@chakra-ui/react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import GetMapDirectionsButton from '../GetMapDirectionsButton/GetMapDirectionsButton.jsx';
import 'react-html5-camera-photo/build/css/index.css';
import { getImagesByEventID } from '../../utils/imageUtils';

import ImageTag from '../ImageTag';
import CameraModal from '../CameraModal';

const auth = getAuth();

const Playground = () => {
  const [user, setUser] = useState(auth.currentUser);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const updateTags = async id => await getImagesByEventID(id);

  useEffect(() => {
    updateTags(3).then(data => setTags(data));
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
      <Leaderboard event_id={35} />
      <Flex g={3}>
        {tags &&
          tags.map(item => (
            <ImageTag
              key={item.id}
              imageName={item.name}
              imageID={item.id}
              eventID={3}
              setTags={setTags}
            />
          ))}
      </Flex>
      <Button onClick={onOpen}>CLICK FOR CAMERA</Button>
      <CameraModal isOpen={isOpen} onClose={onClose} setTags={setTags} eventID={3} />
    </Flex>
  );
};

export default Playground;
