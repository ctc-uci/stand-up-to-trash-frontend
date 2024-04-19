import { Input } from '@chakra-ui/react';
import RegistrationModal from './RegistrationModal';
import PropTypes from 'prop-types';

const PartySizeModal = ({ registrationFlowState, ...props }) => {
  // Copy to prevent mutating original instance
  registrationFlowState = { ...registrationFlowState };
  registrationFlowState.continueActive =
    registrationFlowState.continueActive &&
    registrationFlowState.partySize > 0 &&
    registrationFlowState.partySize <= 100;

  return (
    <RegistrationModal
      title="How many people are in your party?"
      registrationFlowState={registrationFlowState}
      {...props}
    >
      <Input
        type="number"
        onChange={e => registrationFlowState.setPartySize(e.target.value)}
        value={registrationFlowState.partySize}
      />
    </RegistrationModal>
  );
};

PartySizeModal.propTypes = {
  registrationFlowState: PropTypes.object,
};

export default PartySizeModal;
