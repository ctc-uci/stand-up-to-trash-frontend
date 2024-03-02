/* eslint-disable react/prop-types */
import { Tag, TagLabel, TagLeftIcon, TagCloseButton, Flex, useDisclosure, } from '@chakra-ui/react';
import { AttachmentIcon } from '@chakra-ui/icons';
import ImageModal from './ImageModal';

const ImageTag = ({image, setTags, deletedImages }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { name: imageName, id: imageID, s3_url: imageUrl } = image
  console.log(image)
  const handleClick = async () => {
      // remove tag from render and database
      // await deleteImageByID(imageID);
      // await deleteListImageByID(eventID, imageID);
      setTags(prev => {
        return prev.filter((item) => {
          return item.id != imageID})
      })
      deletedImages.current.push(imageID);
  }

  return (
    <>
      <Tag key={imageID}bg="white" borderColor="black" borderWidth="thin" borderRadius="full">
        <Flex onClick={onOpen} >

        <TagLeftIcon as={AttachmentIcon}/>
        <TagLabel >{imageName}</TagLabel>
        </Flex>

        <TagCloseButton onClick={handleClick}/>
        <ImageModal isOpen={isOpen} onClose={onClose} imageUrl={imageUrl} imageName={imageName}/>
      </Tag>
    </>

  );
};

export default ImageTag;
