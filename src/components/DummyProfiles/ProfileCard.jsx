import { Card, CardBody, Text, Flex, Button } from '@chakra-ui/react';
import { deleteProfile } from '../../../utils/profileUtils';
import PropTypes from 'prop-types';

const ProfileCard = ({ profile }) => {
  const handleDelete = () => {
    deleteProfile(profile.id);
  };

  return (
    <Card>
      <Flex justify="space-between">
        <CardBody>
          <Text>id: {profile.id}</Text>
          <Text>first_name: {profile.first_name}</Text>
          <Text>last_name: {profile.last_name}</Text>
          <Text>email: {profile.email}</Text>
        </CardBody>
        <Button onClick={handleDelete} colorScheme="red">
          Delete
        </Button>
      </Flex>
    </Card>
  );
};

ProfileCard.propTypes = {
  profile: PropTypes.shape({
    id: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProfileCard;
