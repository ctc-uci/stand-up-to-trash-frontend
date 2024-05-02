import { QrReader } from 'react-qr-reader';
import React, { useState } from 'react';
import Backend from '../utils/utils';
import {
  Button,
  Text,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

interface QRCodeData {
  first_name: string;
  last_name: string;
  id: number;
}

interface ScannerProps {
  event_id: string | undefined;
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  handleSuccess: (volunteer: any, eventId: any) => Promise<void>;
}

const Scanner = ({ event_id, isOpen, onClose, handleSuccess }: ScannerProps) => {
  const [data, setData] = useState<QRCodeData>();
  const [error, setError] = useState(false);

  const checkinVolunteer = async (volunteer_id: number) => {
    const volunteer = await Backend.get(`/profiles/${volunteer_id}`); // get Volunteer object

    handleSuccess(
      { ...volunteer.data, number_in_party: 1, event_data_id: Number(event_id) },
      Number(event_id),
    );
    handleClose();
  };

  const handleClose = () => {
    setData(undefined);
    setError(false);

    onClose(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay backgroundColor={'rgba(0, 0, 0, .5)'} />
        <ModalContent padding={5}>
          <ModalCloseButton backgroundColor={'#EFEFEF'} borderRadius={'100px'} />

          <Button onClick={() => checkinVolunteer(227)}>Success</Button>

          <QrReader
            scanDelay={1000}
            onResult={result => {
              if (result) {
                let data;

                try {
                  data = JSON.parse(result.getText());
                } catch (e) {
                  console.error('Failed parsing QR Code:', e);
                  setError(true);
                }

                setData(data);
              }
            }}
            constraints={{ facingMode: 'user' }}
            ViewFinder={() => {
              return <div style={{ width: 500, height: 'fit' }} />;
            }}
          />

          {error && (
            <Text display={'flex'} justifyContent={'center'} paddingTop={4}>
              Error: No valid volunteer found
            </Text>
          )}

          {!error && data && (
            <>
              <Text display={'flex'} justifyContent={'center'} paddingY={4}>
                Volunteer: {data?.first_name} {data?.last_name}
              </Text>
              <Button onClick={() => checkinVolunteer(data?.id)} disabled={!data?.id}>
                Sign In
              </Button>
            </>
          )}
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
