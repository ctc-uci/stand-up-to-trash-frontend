import { Checkbox } from '@chakra-ui/react';
import RegistrationModal from './RegistrationModal';
import PropTypes from 'prop-types';
import { useState } from 'react';

const SignWaiverModal = ({ registrationFlowState, ...props }) => {
  const [agreed, setAgreed] = useState(false);

  // Copy to prevent mutating original instance
  registrationFlowState = { ...registrationFlowState };
  registrationFlowState.continueActive = registrationFlowState.continueActive && agreed;

  return (
    <RegistrationModal
      title="Sign your Waiver"
      registrationFlowState={registrationFlowState}
      continueText={'Register'}
      {...props}
    >
      <Checkbox onChange={e => setAgreed(e.target.checked)}>
        I agree to the terms and conditions
      </Checkbox>
    </RegistrationModal>
  );
};

SignWaiverModal.propTypes = {
  registrationFlowState: PropTypes.object,
};

export default SignWaiverModal;
