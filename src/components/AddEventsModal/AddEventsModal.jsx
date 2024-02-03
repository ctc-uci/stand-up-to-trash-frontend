import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    useDisclosure, Button,
    FormControl,
    FormLabel,
    Input,
    Flex,
    IconButton
} from '@chakra-ui/react'
import { useState } from 'react';
import {AttachmentIcon} from '@chakra-ui/icons'


const AddEventsModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [eventData, setEventData] = useState({
        name: "",
        description: "",
        location: "",
        image_url: "",
        date: "",
    });
    
    console.log(eventData)

    return (<>
    <Button onClick={onOpen} backgroundColor={"#95D497"}>Create Event</Button>

    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay/>
        <ModalContent>
            <ModalHeader>
                <ModalHeader fontSize={'24px'} justify={'center'} align={'center'}>Add Event</ModalHeader>
            </ModalHeader>
        
            <ModalBody>
                {/* S3 DROP */}
                <FormControl>
                    <FormLabel paddingTop={'10px'}>Event Name</FormLabel>
                        <Input type='text' onChange={(e) => {setEventData({...eventData, name: e.target.value})}}/>
                        <Flex flexDirection={'row'}>
                            <Flex flexDirection={'column'} width={'100%'} paddingRight={'10px'}>
                                <FormLabel paddingTop={'10px'}>Date</FormLabel>
                                <Input type='date' onChange={(e) => {setEventData({...eventData, date: e.target.value})}}/>
                            </Flex>
                            <Flex flexDirection={'column'} width={'100%'} paddingLeft={'10px'}>
                                <FormLabel paddingTop={'10px'}>Time</FormLabel>
                                <Input type='time'/>
                            </Flex>
                        </Flex>
                    <FormLabel paddingTop={'10px'}>Location</FormLabel>
                        <Input type='text' onChange={(e) => {setEventData({...eventData, location: e.target.value})}}/>
                    <FormLabel paddingTop={'10px'}>Add Event Description</FormLabel>
                        <Input type='text' onChange={(e) => {setEventData({...eventData, description: e.target.value})}}/>
                    <FormLabel paddingTop={'10px'}>Add Waivers</FormLabel>
                        <IconButton icon={<AttachmentIcon/>}/>
                </FormControl>
            </ModalBody>

            <ModalFooter justifyContent={'center'}>
                <Button onClick={onClose} backgroundColor={'background: #D495954D'} paddingRight={'10px'}>Cancel</Button>
                <Button backgroundColor={'background: #95D497'} paddingLeft={'10px'}>Create Event</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    </>)
}

export default AddEventsModal;