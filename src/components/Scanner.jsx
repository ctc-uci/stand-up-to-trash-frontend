import { QrReader } from 'react-qr-reader';
import { useState } from 'react';
import Backend from '../utils/utils';

const Scanner = () => {
  const [data, setData] = useState();

  const checkinVolunteer = async ({ event_id, volunteer_id }) => {
    const resp = await Backend.patch(`/data/checkin/${event_id}/${volunteer_id}`);
    console.log(resp.data);
    return resp.data;
  };

  return (
    <>
      <QrReader
        scanDelay={1000}
        onResult={result => {
          if (result) {
            console.log('scanned');
            setData(result.getText()); // Displays the link obtained
            // checkinVolunteer(result.event_id, result.volunteer_id);

            const event_id = 35;
            const volunteer_id = 112;
            checkinVolunteer({ event_id, volunteer_id });
          }
        }}
        ViewFinder={() => {
          return <div style={{ width: 500, height: 'fit' }} />;
        }}
      />
      <p>{data}</p>
    </>
  );
};

export default Scanner;
