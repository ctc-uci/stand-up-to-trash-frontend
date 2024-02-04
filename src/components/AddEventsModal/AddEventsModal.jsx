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
    IconButton,
    Textarea,
    ChakraProvider,
    extendTheme,
    useToast
} from '@chakra-ui/react'
import { useState } from 'react';
import {AttachmentIcon} from '@chakra-ui/icons'
import Dropzone from '../Dropzone.tsx';
import { theme, CreateEventIcon, CancelIcon } from '../Icons/EventsModalIcons.jsx';
import {postEvent} from "../../utils/eventsUtils.js"
import React from 'react';


const AddEventsModal = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [eventData, setEventData] = useState({
        name: "",
        description: "",
        location: "",
        imageUrl: "",
        date: "",
        time: "",
        waiver: "Stand Up To Trash BEACH CLEANUP WAIVER OF LIABILITY AND EXPRESS ASSUMPTION OF RISK (PLEASE READ CAREFULLY) I agree as follows: 1. I am volunteering my services for the Stand Up To Trash Beach Cleanup; 2. I will perform assigned tasks that are within my physical capability, and I will not undertake tasks that are beyond my ability; 3. I will not participate if under the influence of alcohol or any drug that could impair my physical or mental abilities; 4. I have received appropriate instruction regarding this Event, including appropriate safety and emergency procedures, I fully understand those instructions, and I agree, after proper inspection, to use only the supplies, tools and equipment provided by Event organizers; 5. I will perform only those tasks assigned, observe all safety rules, and use care in the performance of my assignments; 6. Stand Up To Trash will not be held liable or responsible in any way for any injury, death or other damages to me or my family, heirs, or assigns that may occur as a result of my participation in the Event, or as a result of product liability or the negligence, whether passive or active, of any party, including Released Parties, in connection with the Event. I understand that cleaning up beaches or inland water areas involves certain inherent risks, including but not limited to, the risks of possible injury, infection or loss of life as a result of contact with needles, condoms, metal objects, burning embers or other hazardous materials, wild animals, poisonous plants, snakes, or from over-exertion or environmental conditions, including but not limited to flooding, rockslides, sun exposure, or dangerous terrain. No known physical or health limitation prevents me from safely participating in this Event. In Consideration for being allowed to participate, I personally assume all risks, whether foreseen or unforeseen, in connection with the Event of any harm, injury or damage that may befall me as a participant. If I am injured during the Event, I authorize any physician licensed in California to perform such emergency treatment as he or she believes, in his or her sole judgment, may be necessary. I am over the age of eighteen and legally competent to sign this liability release, or I have acquired the written consent of my parent or guardian. I understand that the terms herein are contractual and not a mere recital, this instrument is legally binding, and I have signed this document of my own free act. I agree to allow my image to be used in published materials and web sites that promote the programs of Stand Up To Trash. By including my email address below, I understand that Stand Up To Trash may contact me about future Stand Up To Trash events and other Public Education programs. I HEREBY RELEASE AND HOLD HARMLESS Stand Up To Trash FROM ANY CLAIM OR LAWSUIT FOR PERSONAL INJURY, PROPERTY DAMAGE, OR WRONGFUL DEATH, BY ME, MY FAMILY, ESTATE, HEIRS, OR ASSIGNS, ARISING OUT OF PARTICIPATION IN THE EVENT, INCLUDING BOTH CLAIMS ARISING DURING THE ACTIVITY AND AFTER I COMPLETE THE ACTIVITY, AND INCLUDING CLAIMS BASED ON NEGLIGENCE OF OTHER PARTICIPANTS OR THE RELEASED PARTIES, WHETHER PASSIVE OR ACTIVE. I HAVE FULLY INFORMED MYSELF OF THE CONTENTS OF THIS LIABILITY RELEASE AND ASSUMPTION OF RISK. Signature of Participant City, State, Zip E-mail IF PARTICIPANT IS UNDER 18, THE PARENT (OR GUARDIAN, IF ANY) MUST SIGN. I am the parent or legal guardian of the above participant and he/she has my permission to participate in the Stand Up To Trash Beach Cleanup. I have read and agree to the provisions stated above for myself and the participant. Further, I understand and agree that the sponsors and organizers of the Event are not responsible for supervision of minor participants and that if I allow the above minor to participate without my supervision, I assume all the risks from such participation."
    });

    const toast = useToast()
    const toastIdRef = React.useRef()
    const handleSubmit = async() => {
        try{
            toastIdRef.current = toast({
                title: 'Creating Event.',
                description: "Loading...",
                status: 'loading',
                position: 'bottom-right',
                isClosable: true,
            })
            await postEvent(eventData); 
            toast.close(toastIdRef.current);
            toast({
                title: 'Event Created.',
                description: "Beach Cleanup Created.",
                status: 'success',
                position: 'bottom-right',
                duration: 9000,
                isClosable: true,
            })
            onClose();
        } catch (err){
            console.log(err)
            toast({
                title: 'Something Went Wrong.',
                description: "No Event Created.",
                status: 'error',
                position: 'bottom-right',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    const isSubmittable = eventData.date === "" || eventData.description === "" || eventData.imageUrl === "" || eventData.location === "" || eventData.name === "" || eventData.time === "";
    


    return (<ChakraProvider theme={extendTheme(theme)}>
    <Button onClick={onOpen} backgroundColor={"#95D497"}>Create Event</Button>

    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minW={"40%"}>
            <ModalHeader>
                <ModalHeader fontSize={'24px'} justify={'center'} align={'center'}>Add Event</ModalHeader>
            </ModalHeader>
        
            <ModalBody>
                <FormControl>
                    <Dropzone setEventData={setEventData} eventData={eventData}/>
                    <FormLabel paddingTop={'10px'}>Event Name</FormLabel>
                        <Input type='text' onChange={(e) => {setEventData({...eventData, name: e.target.value})}}/>
                        <Flex flexDirection={'row'}>
                            <Flex flexDirection={'column'} width={'100%'} paddingRight={'10px'}>
                                <FormLabel paddingTop={'10px'}>Date</FormLabel>
                                <Input type='date' onChange={(e) => {
                                    setEventData({...eventData, date: e.target.value})}}/>
                            </Flex>
                            <Flex flexDirection={'column'} width={'100%'} paddingLeft={'10px'}>
                                <FormLabel paddingTop={'10px'}>Time</FormLabel>
                                <Input type='time' onChange={(e) => {
                                    setEventData({...eventData, time: e.target.value})}}/>
                            </Flex>
                        </Flex>
                    <FormLabel paddingTop={'10px'}>Location</FormLabel>
                        <Input type='text' onChange={(e) => {setEventData({...eventData, location: e.target.value})}}/>
                    <FormLabel paddingTop={'10px'}>Add Event Description</FormLabel>
                        <Textarea type='text' height={'130px'} onChange={(e) => {setEventData({...eventData, description: e.target.value})}}/>
                    <FormLabel paddingTop={'10px'}>Add Waivers</FormLabel>
                        <IconButton icon={<AttachmentIcon/>}/>
                </FormControl>
            </ModalBody>

            <ModalFooter justifyContent={'center'}>
                <Button leftIcon={<CancelIcon/>} onClick={onClose} backgroundColor={'#D495954D'} marginRight={'10px'}>Cancel</Button>
                <Button leftIcon={<CreateEventIcon/>} backgroundColor={'#95D497'} marginLeft={'10px'} onClick={handleSubmit} isDisabled={isSubmittable}>Create Event</Button>
            </ModalFooter>
        </ModalContent>
    </Modal>
    </ChakraProvider>)
}

export default AddEventsModal;