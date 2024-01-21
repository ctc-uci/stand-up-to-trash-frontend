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

const adminFooter = ({ handleRegister, handleDelete, handleEdit }) => {
    /*
    Admin footer gets called upon when isAdmin returns true
    and displays all the necessary functions(buttons) to Register,
    Edit and Delete.
    */
    return (
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
    )
}

const volunteerFooter = ({ handleRegister }) => {
    /*
    Volunteer footer gets called upon when isAdmin returns false
    and displays the necessry function (button) to Register
    */
    return (
    <CardFooter>
        <Button onClick={handleRegister} variant='ghost' colorScheme='blue'>
            Register
        </Button>
    </CardFooter>
    );
}


const EventCard = ( { event, isAdmin }) => {
    /*
    EventCard function gets the arguments for its parameters
    which are event and isAdmin and also calls upon the functions
    such as handleEdit, handleDelete and handleRegister. It contains
    the skeleton of the event card with properties such as image, name
    description and location.
    */
    const handleEdit = () => {};

    const handleDelete = () => {};

    const handleRegister = () => {};

    let footer = volunteerFooter(handleRegister);
    if (isAdmin) {
        footer = adminFooter(handleRegister, handleDelete, handleEdit);
    }

    return (
        <Card maxW='sm'>
            <CardBody>
                <Image
                src={event.image_url}
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
            {footer}
    </Card>
    );
}

EventCard.propTypes = {
    event: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      image_url: PropTypes.string.isRequired,
    }).isRequired,
    isAdmin: PropTypes.bool.isRequired
  };

export default EventCard;
