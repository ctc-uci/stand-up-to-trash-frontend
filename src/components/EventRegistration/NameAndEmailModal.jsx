import RegistrationModal from './RegistrationModal';

const NameAndEmailModal = ({ ...props }) => {
  return (
    <RegistrationModal title="What is your name and Email?" {...props}>
      Body...
    </RegistrationModal>
  );
};

export default NameAndEmailModal;
