import WhoAreYouRegisteringForModal from './WhoAreYouRegisteringForModal';
import SuccessfulRegistrationModal from './SuccessfulRegistrationModal';
import NameAndEmailModal from './NameAndEmailModal';
import SignWaiverModal from './SignWaiverModal';
import PartySizeModal from './PartySizeModal';
import LoadingModal from './LoadingModal';
import { useState, createElement, useContext } from 'react';
import PropTypes from 'prop-types';
import Backend from '../../utils/utils';
import UserContext from '../../utils/UserContext';

const RegistrationFlowController = ({ isOpen, onClose, eventId }) => {
  // Handles state of registration flow (which step, party info, etc.)
  const { user } = useContext(UserContext);

  const [step, setStep] = useState(0);
  const [isIndividual, setIsIndividual] = useState(true);
  const [partySize, setPartySize] = useState(1);
  const [firstOpen, setFirstOpen] = useState(true);
  const [registering, setRegistering] = useState(false);

  const registerForEvent = async () => {
    // Register for event
    try {
      await Backend.post('/data', {
        volunteer_id: user.id,
        number_in_party: partySize,
        pounds: 0,
        ounces: 0,
        unusual_items: '',
        event_id: eventId,
        is_checked_in: false,
      });
    } catch (e) {
      console.log('Error posting', e);
    }

    setRegistering(false);
  };

  const onContinue = () => {
    setStep(step + 1);
    setFirstOpen(false);

    // If last step, submit registration
    if ((isIndividual && step == 2) || (!isIndividual && step == 3)) {
      setRegistering(true);
      registerForEvent();
    }
  };

  const onPrevious = () => {
    if (step > 0) setStep(step - 1);
    else onClose();
  };

  const registrationFlowState = {
    firstOpen: firstOpen,
    onCloseFlowModal: onClose,
    step,
    onContinue,
    onPrevious,
    previousActive: true,
    continueActive: true,
    isIndividual,
    setIsIndividual,
    partySize,
    setPartySize,
  };

  if (!isOpen) return null;

  if (registering) return <LoadingModal registrationFlowState={registrationFlowState} />;

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
  eventId: PropTypes.number,
};

export default RegistrationFlowController;
