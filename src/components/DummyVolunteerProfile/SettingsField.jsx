import {Input, FormControl, FormLabel, Textarea} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const SettingsField = ({title, placeholder, type = undefined, textarea = false}) => {
    return (
        <FormControl>
            <FormLabel mb={0} mt={4} ml={4}>{title}</FormLabel>
            {textarea ? <Textarea h="120px" placeholder={placeholder} boxShadow={"0px 4px 4px 0px rgba(0, 0, 0, 0.15)"} resize={"none"} /> : <Input type={type} placeholder={placeholder} boxShadow={"0px 4px 4px 0px rgba(0, 0, 0, 0.15)"} />}
        </FormControl>
    )
};

SettingsField.propTypes = {
    title: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    textarea: PropTypes.bool
}

export default SettingsField;

