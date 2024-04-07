import {
  Input,
  FormControl,
  FormLabel,
  Textarea,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { RiPencilFill } from 'react-icons/ri';
import PropTypes from 'prop-types';

const SettingsField = ({
  title,
  placeholder,
  value = '',
  type = undefined,
  textarea = false,
  onEdit = () => {},
}) => {
  value = value === null ? '' : value;
  return (
    <FormControl>
      <FormLabel mb={0} mt={{ base: 2, md: 4, lg: 4 }} ml={{ base: 0, md: 4, lg: 4 }}>
        {title}
      </FormLabel>
      <InputGroup>
        {textarea ? (
          <Textarea
            h="120px"
            placeholder={placeholder}
            boxShadow={'0px 4px 4px 0px rgba(0, 0, 0, 0.15)'}
            resize={'none'}
            value={value}
            isDisabled={true}
          />
        ) : (
          <Input
            type={type}
            placeholder={placeholder}
            value={value}
            isDisabled={true}
            _disabled={{ cursor: 'not-allowed' }}
            boxShadow={'0px 4px 4px 0px rgba(0, 0, 0, 0.15)'}
          />
        )}
        <InputRightElement as="a" href="#" onClick={onEdit}>
          <RiPencilFill />
        </InputRightElement>
      </InputGroup>
    </FormControl>
  );
};

SettingsField.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  textarea: PropTypes.bool,
  onEdit: PropTypes.func,
};

export default SettingsField;
