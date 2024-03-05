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

const ImageModal = ({isOpen, onClose, imageUrl, imageName}) => {
    return (
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader justify={"center"} align={"center"}>{imageName}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Image src={imageUrl}/>
      </ModalBody>
    </ModalContent>
  </Modal>
  )
}

export default ImageModal;
