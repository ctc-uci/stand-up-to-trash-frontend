/* eslint-disable react/prop-types */
import {
  CloseButton,
  Flex,
  useDisclosure,
  Image,
} from '@chakra-ui/react';
import ImageModal from './ImageModal';

const ImageTag = ({ image, setTags, deletedImages, uploadImages }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { name: imageName, id: imageID, s3_url: imageUrl } = image;
  console.log(image);
  const handleClick = async () => {
    // remove tag from render and database
    // await deleteImageByID(imageID);
    // await deleteListImageByID(eventID, imageID);
    setTags(prev => {
      return prev.filter(item => {
        return item.id != imageID;
      });
    });
    deletedImages.current.push(imageID);
    uploadImages.current = uploadImages.current.filter(item => item.id !== imageID);
  };

  return (
    <>
      <Flex w={'7.3em'} h={'7.3em'} borderRadius={'lg'} justify={'flex-end'} key={imageID}>
        <CloseButton
          zIndex={1}
          pos={'absolute'}
          borderRadius={100}
          size={'sm'}
          color={'#717171'}
          backgroundColor={'#EFEFEF'}
          margin={'0.5em'}
          onClick={handleClick}
        />
        <Image src={imageUrl} borderRadius={'lg'} onClick={onOpen} />
      </Flex>
      <ImageModal isOpen={isOpen} onClose={onClose} imageUrl={imageUrl} imageName={imageName} />
    </>
  );
};

export default ImageTag;
