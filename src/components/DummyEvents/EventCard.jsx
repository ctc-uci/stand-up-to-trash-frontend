import {
  Box,
  Button,
  Checkbox,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
const EventCard = ({
  id,
  name,
  description,
  location,
  showSelect,
  isSelected,
  handleCheckboxChange,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        width="293px"
        height="250px"
        boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
        display="flex"
        alignItems="center"
        justifyItems="center"
        as="a"
        href="#"
        onClick={() => (showSelect ? handleCheckboxChange(id) : onOpen())}
      >
        {showSelect ? (
          <Checkbox
            id={id}
            marginLeft="10px"
            marginBottom="200px"
            style={{ borderRadius: '100px' }}
            isChecked={isSelected}
            onChange={() => handleCheckboxChange(id)}
          />
        ) : null}
        <Spacer />
        <Text fontSize={18} fontWeight={'bold'} textAlign={'center'} m="4">
          {name}
        </Text>
        <Spacer />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxH="660px" maxW="800px" borderRadius="0">
          <ModalBody p="0">
            <Box display="flex" flexDir="row" h="660px" w="800px">
              <Box flexBasis="60%" display="flex" flexDir="column">
                <Box flexBasis="60%" bg="#D9D9D9" display="flex" alignItems="end" p="2">
                  <Stack mx="6">
                    <Heading>{name}</Heading>
                    <Text>{location}</Text>
                  </Stack>
                </Box>
                <Box
                  flexBasis="40%"
                  mx="8"
                  my="4"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flexDir="column"
                >
                  <Box alignSelf="start">
                    <Heading fontSize={24}>Event Description</Heading>
                    <Text fontSize={18}>{description}</Text>
                  </Box>
                  <Box>
                    <Button
                      color="black"
                      backgroundColor="rgba(149, 189, 212, 0.71)"
                      borderRadius="0"
                      colorScheme={'grey'}
                      as="a"
                      href={`/checkin/${id}`}
                      target="_blank"
                    >
                      View More
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Box
                flexBasis="40%"
                bg="rgba(217, 217, 217, 0.40)"
                display="flex"
                justifyItems={'end'}
                alignItems={'start'}
              >
                <ModalCloseButton />
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

EventCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  location: PropTypes.string,
  showSelect: PropTypes.bool,
  isSelected: PropTypes.bool,
  handleCheckboxChange: PropTypes.func,
};

export default EventCard;
