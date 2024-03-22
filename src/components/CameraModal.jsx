/* eslint-disable react/prop-types */
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import Backend from '../utils/utils';
import axios from 'axios';

const CameraModal = ({ isOpen, onClose, setTags, uploadedImages }) => {
  // const [uri, setUri] = useState('');
  // const [tags, setTags] = useState([]);

  const handleTakePhoto = dataUri => {
    // setUri(dataUri);
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

    uploadImage(dataUri).then(async image_url => {
      // await postImage(image_url);
      // const image = await getImageID(image_url);
      // await putListImageByID(eventID, image.id)
      const newImageObject = {
        name: 'weird name',
        id: Math.floor(Math.random() * 200),
        s3_url: image_url,
      };

      setTags(prev => [...prev, newImageObject]);
      uploadedImages.current.push(newImageObject);
    });
  };

  // const updateTags = async id => await getImagesByEventID(id);
  // useEffect(() => {
  //   updateTags(eventID).then((data) => setTags(data));
  // }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader justify={'center'} align={'center'}>
          🧀 SAY CHEESE 🧀
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Camera
            onTakePhoto={dataUri => {
              handleTakePhoto(dataUri);
              onClose();
            }}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CameraModal;
