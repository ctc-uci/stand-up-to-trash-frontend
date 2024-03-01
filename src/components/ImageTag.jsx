/* eslint-disable react/prop-types */
import { Tag, TagLabel, TagLeftIcon, TagCloseButton } from '@chakra-ui/react';
import { AttachmentIcon } from '@chakra-ui/icons';
import { deleteImageByID, deleteListImageByID } from '../utils/imageUtils';

const ImageTag = ({ imageName, imageID, eventID, setTags }) => {
  const handleClick = async () => {
    // remove tag from render and database
    await deleteImageByID(imageID);
    await deleteListImageByID(eventID, imageID);
    setTags(prev => {
      return prev.filter(item => item.id != imageID);
    });
  };

  return (
    <Tag key={imageID} bg="white" borderColor="black" borderWidth="thin" borderRadius="full">
      <TagLeftIcon as={AttachmentIcon} />
      <TagLabel>{imageName}</TagLabel>
      <TagCloseButton onClick={handleClick} />
    </Tag>
  );
};

export default ImageTag;
