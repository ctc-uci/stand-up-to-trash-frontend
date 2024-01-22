/* eslint-disable react/prop-types */
import { Flex } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import Backend from '../../utils/utils';
import { CSVLink } from 'react-csv';
import { useState, useEffect } from 'react';

function ExportButton({ eventId }) {
  const header = [
    { key: 'event_id', label: 'EVENT_ID' },
    { key: 'id', label: 'ID' },
    { key: 'is_checked_in', label: 'IS_CHECKED_IN' },
    { key: 'number_in_party', label: 'NUMBER_IN_PARTY' },
    { key: 'ounces', label: 'OUNCES' },
    { key: 'pounds', label: 'POUNDS' },
    { key: 'unusual_items', label: 'UNUSUAL_ITEMS' },
    { key: 'volunteer_id', label: 'VOLUNTEER_ID' },
  ];

  const [eventIdData, setEventIdData] = useState([]);

  useEffect(() => {
    const getEventId = async () => {
      try {
        if (eventId == -1) {
          const eventIdData = await Backend.get(`/data/`);
          setEventIdData(eventIdData.data);
        } else {
          const eventIdData = await Backend.get(`/data/${eventId}`);
          setEventIdData(eventIdData.data);
        }
      } catch (err) {
        console.log(`Error getting event ${eventId}: `, err.message);
      }
    };

    getEventId();
  }, []);

  return (
    <Flex>
      <Button>
        <CSVLink data={eventIdData} filename="./data.csv" headers={header}>
          Export
        </CSVLink>
      </Button>
    </Flex>
  );
}

export default ExportButton;
