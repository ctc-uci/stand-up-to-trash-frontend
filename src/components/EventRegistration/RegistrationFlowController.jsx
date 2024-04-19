import WhoAreYouRegisteringForModal from './WhoAreYouRegisteringForModal';
import SuccessfulRegistrationModal from './SuccessfulRegistrationModal';
import NameAndEmailModal from './NameAndEmailModal';
import SignWaiverModal from './SignWaiverModal';
import PartySizeModal from './PartySizeModal';
import { useState, createElement } from 'react';
import PropTypes from 'prop-types';

const RegistrationFlowController = ({ isOpen, onClose }) => {
  // Handles state of registration flow (which step, party info, etc.)
  const [step, setStep] = useState(0);
  const [isIndividual, setIsIndividual] = useState(true);
  const [partySize, setPartySize] = useState(1);
  const [firstOpen, setFirstOpen] = useState(true);

  const onContinue = () => {
    setStep(step + 1);
    setFirstOpen(false);
  };

  const onPrevious = () => {
    setStep(step - 1);
  };

  const registrationFlowState = {
    firstOpen: firstOpen,
    onCloseFlowModal: onClose,
    step,
    onContinue,
    onPrevious,
    previousActive: step > 0,
    continueActive: true,
    isIndividual,
    setIsIndividual,
    partySize,
    setPartySize,
  };

  if (!isOpen) return null;

  if (step == 0)
    return <WhoAreYouRegisteringForModal registrationFlowState={registrationFlowState} />;

  if (isIndividual) {
    // Individual steps
    return createElement(
      [NameAndEmailModal, SignWaiverModal, SuccessfulRegistrationModal][step - 1],
      {
        key: step - 1,
        registrationFlowState: registrationFlowState,
      },
    );
  } else {
    // Group steps
    return createElement(
      [PartySizeModal, NameAndEmailModal, SignWaiverModal, SuccessfulRegistrationModal][step - 1],
      {
        key: step - 1,
        registrationFlowState: registrationFlowState,
      },
    );
  }
};

RegistrationFlowController.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default RegistrationFlowController;
