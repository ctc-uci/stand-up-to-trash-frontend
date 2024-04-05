import { QrReader } from 'react-qr-reader';
import { useState } from 'react';
import Backend from '../utils/utils';
import { Button, Modal, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Scanner = ({ isOpen, onClose, handleSuccess, event_id }) => {
  const [data, setData] = useState();

  const checkinVolunteer = async volunteer_id => {
    const volunteer = await Backend.get(`/profiles/${volunteer_id}`); // get Volunteer object

    onClose();
    handleSuccess(volunteer.data, Number(event_id));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backgroundColor={'rgba(0, 0, 0, .5)'} />
        <ModalContent padding={5}>
          <ModalCloseButton backgroundColor={'#EFEFEF'} borderRadius={'100px'} />

          <Button onClick={() => checkinVolunteer(121)}>Success</Button>

          <QrReader
            scanDelay={1000}
            onResult={result => {
              if (result) {
                setData(result.getText()); // Displays the link obtained
                checkinVolunteer(result.volunteer_id);
              }
            }}
            ViewFinder={() => {
              return <div style={{ width: 500, height: 'fit' }} />;
            }}
          />
          <p>{data}</p>
        </ModalContent>
      </Modal>
    </>
  );
};

Scanner.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleSuccess: PropTypes.func.isRequired,
  event_id: PropTypes.string.isRequired,
};

export default Scanner;
