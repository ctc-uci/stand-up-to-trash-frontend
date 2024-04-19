import RegistrationModal from './RegistrationModal';
import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const WhoAreYouRegisteringForModal = ({ registrationFlowState, ...props }) => {
  return (
    <RegistrationModal
      registrationFlowState={registrationFlowState}
      {...props}
      title="Who are you registering for?"
      animate={registrationFlowState.firstOpen}
    >
      <RadioGroup
        onChange={v => registrationFlowState.setIsIndividual(v == 'individual')}
        value={registrationFlowState.isIndividual ? 'individual' : 'group'}
      >
        <Stack direction="row">
          <Radio value="individual">Individual</Radio>
          <Radio value="group">Group</Radio>
        </Stack>
      </RadioGroup>
    </RegistrationModal>
  );
};

WhoAreYouRegisteringForModal.propTypes = {
  registrationFlowState: PropTypes.object,
};

export default WhoAreYouRegisteringForModal;
