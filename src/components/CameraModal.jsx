/* eslint-disable react/prop-types */
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Image,
  } from '@chakra-ui/react'
import { useState } from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import Backend from '../utils/utils';
import axios from 'axios';
import {postImage, getImageID, putListImageByID } from "../utils/imageUtils"


const CameraModal = ({isOpen, onClose, setTags, eventID}) => {
  const [uri, setUri] = useState('');

    const handleTakePhoto = dataUri => {
        setUri(dataUri);
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

        uploadImage(dataUri).then(async (image_url) => {
            await postImage(image_url);
            const image = await getImageID(image_url);
            await putListImageByID(eventID, image.id)
            setTags(prev => [...prev, {
                name: image.name,
                id: image.id
            }])
        })
      };

    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader justify={"center"} align={"center"}>🧀 SAY CHEESE 🧀</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Camera
        onTakePhoto={dataUri => {
          handleTakePhoto(dataUri);
        }}
      />
      <Image src={uri}/>
          </ModalBody>
        </ModalContent>
      </Modal>
      );
}

export default CameraModal;
