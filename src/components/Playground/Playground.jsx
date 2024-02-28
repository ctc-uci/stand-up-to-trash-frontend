import ExportButton from '../ExportCSVButton/ExportButton';
import AddEventsModal from '../AddEventsModal/AddEventsModal';
import Leaderboard from '../Leaderboard/Leaderboard.jsx';
import Dropzone from '../Dropzone.tsx';
import { Flex } from '@chakra-ui/react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import GetMapDirectionsButton from '../GetMapDirectionsButton/GetMapDirectionsButton.jsx';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { Image } from '@chakra-ui/react';
import Backend from '../../utils/utils.js';
import axios from 'axios';

const auth = getAuth();

const Playground = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [uri, setUri] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  // For Steven and Rayan
  const handleTakePhoto = dataUri => {
    setUri(dataUri);
    console.log(dataUri);
    const uploadImage = async dataUri => {
      // get S3 upload url from server
      const { data: uploadUrl } = await Backend.get('/s3Upload');
      const blob = await fetch(dataUri).then(res => res.blob());

      // upload image directly to S3 bucket
      await axios.put(uploadUrl, blob, {
        headers: {
          'Content-Type': blob.type,
        },
      });

      const imageUrl = uploadUrl.split('?')[0];
      return imageUrl;
    };

    uploadImage(dataUri);
  };

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
      <Camera
        onTakePhoto={dataUri => {
          handleTakePhoto(dataUri);
        }}
      />
      <Image src={uri} />
    </Flex>
  );
};

export default Playground;
