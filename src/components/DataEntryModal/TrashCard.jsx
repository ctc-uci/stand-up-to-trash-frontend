import { Card, CardHeader, CardBody, Flex, IconButton } from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';

const TrashCard = ({ pounds, setCurrentTrash, currentTrash, id }) => {
  // needs to remove by trash id in the future task (only removing by pounds rn)
  const handleClick = () => {
    const reducedTrash = currentTrash.filter(trash => trash !== pounds.toString());
    setCurrentTrash(reducedTrash);
  };

  return (
    <>
      <Card
        border="3px solid"
        borderColor="#EFEFEF"
        borderLeft={'8px solid #0075FF'}
        padding={'0.5em'}
        paddingLeft={'1em'}
        variant={'outline'}
        flexDir={'row'}
        justifyContent={'space-between'}
        align={'center'}
        key={id}
      >
        <Flex flexDir={'column'}>
          <CardHeader as={'b'} padding={0} fontSize={18}>
            {pounds} Pounds
          </CardHeader>
          <CardBody padding={0} color={'#717171'}>
            Volunteer 1
          </CardBody>
        </Flex>
        <Flex>
          <IconButton
            onClick={handleClick}
            backgroundColor={'#EFEFEF'}
            icon={<FaTrash color="#717171" />}
          />
        </Flex>
      </Card>
    </>
  );
};

TrashCard.propTypes = {
    pounds: PropTypes.number.isRequired,
    setCurrentTrash: PropTypes.func.isRequired,
    currentTrash: PropTypes.arrayOf(PropTypes.string).isRequired,
    id: PropTypes.number.isRequired,
  };

export default TrashCard;

