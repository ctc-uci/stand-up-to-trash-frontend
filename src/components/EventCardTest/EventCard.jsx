import PropTypes from 'prop-types';
import {
    Heading,
    Text,
    Card,
    CardBody,
    CardFooter,
    Button,
    Image,
    Stack,
    ButtonGroup,
    Divider
  } from '@chakra-ui/react';

const EventCard = ( { event }) => {
    const handleEdit = () => {};

    const handleDelete = () => {};

    const handleRegister = () => {};

    return (
        <Card maxW='sm'>
            <CardBody>
                <Image
                src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
                alt='Green double couch with wooden legs'
                borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                <Heading size='md'>Event: </Heading>
                <Text>
                    Name: {event.name}
                </Text>
                <Text>Description: {event.description}</Text>
                <Text>Location: {event.location}</Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing='2'>
                <Button onClick={handleRegister} variant='ghost' colorScheme='blue'>
                    Register
                </Button>
                <Button onClick={handleEdit}variant='ghost' colorScheme='blue'>
                    Edit
                </Button>
                <Button onClick={handleDelete} variant='ghost' colorScheme='red'>
                    Delete
                </Button>
                </ButtonGroup>
            </CardFooter>
    </Card>
    );
}

EventCard.propTypes = {
    event: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      imageURL: PropTypes.string.isRequired,
    }).isRequired,
  };

export default EventCard;
