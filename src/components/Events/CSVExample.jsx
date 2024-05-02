import { CSVLink } from 'react-csv';
import { Button } from '@chakra-ui/react';
import { AiOutlineExport } from 'react-icons/ai';

const CSVExample = () => {
  // This is what the expcted format of the data will be like. HIGHLY recommend you also test the
  // backend call yourself and inspect.
  const eventData = {
    eventName: 'DP Beach Cleanup',
    eventData: [
      {
        id: 96,
        volunteer_name: 'John Doe',
        number_in_party: 1,
        pounds: 0,
        ounces: 0,
        notes: null,
        is_checked_in: true,
        image_array: null,
      },
      {
        id: 97,
        volunteer_name: 'Johnny Appleseed',
        number_in_party: 1,
        pounds: 0,
        ounces: 0,
        notes: null,
        is_checked_in: true,
        image_array: null,
      },
      {
        id: 98,
        volunteer_name: 'Farah Hoque',
        number_in_party: 1,
        pounds: 0,
        ounces: 0,
        notes: null,
        is_checked_in: false,
        image_array: null,
      },
      {
        id: 91,
        volunteer_name: 'Farahnaz Hoque',
        number_in_party: 1,
        pounds: 0,
        ounces: 0,
        notes: null,
        is_checked_in: true,
        image_array: null,
      },
    ],
    totalPounds: 0,
    totalOunces: 0,
  };

  // Here we are creating a new row in the CSV and appending eventData.eventData in order to
  // display the totalPounds and totalOunces
  const eventDataWithTotals = [
    ...eventData.eventData,
    {
      id: '', // empty or some identifier for total
      volunteer_name: 'Total',
      number_in_party: '',
      pounds: eventData.totalPounds,
      ounces: eventData.totalOunces,
      notes: '',
      is_checked_in: '',
      image_array: '',
    },
  ];

  // The headers for our CSV file
  const headers = [
    { label: 'ID', key: 'id' },
    { label: 'Volunteer Name', key: 'volunteer_name' },
    { label: 'Number in Party', key: 'number_in_party' },
    { label: 'Pounds', key: 'pounds' },
    { label: 'Ounces', key: 'ounces' },
    { label: 'Notes', key: 'notes' },
    { label: 'Is Checked In', key: 'is_checked_in' },
    { label: 'Image Array', key: 'image_array' },
  ];

  return (
    <Button leftIcon={<AiOutlineExport />} size="md" colorScheme="messenger">
      <CSVLink data={eventDataWithTotals} headers={headers} filename={`${eventData.eventName}.csv`}>
        Export Event Data
      </CSVLink>
    </Button>
  );
};

export default CSVExample;
