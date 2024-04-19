import RegistrationModal from './RegistrationModal';

const SuccessfulRegistrationModal = ({ ...props }) => {
  return (
    <RegistrationModal title="null" {...props} buttons={<p>Buttons here...</p>}>
      {`You're all set!`}
    </RegistrationModal>
  );
};

export default SuccessfulRegistrationModal;
