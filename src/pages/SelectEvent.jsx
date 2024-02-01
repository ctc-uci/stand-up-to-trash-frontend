import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Backend from '../utils/utils';
import { FormControl, FormLabel, Button, Select, FormErrorMessage } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  volunteer_id: yup.string().required('ID required').max(10, 'ID exceeds 10 character limit'),
  number_in_party: yup.string().required('Number of Party Required'),
  event_id: yup.string().required('Event required'),
});

const SelectEvent = () => {
  const [eventsData, setEventsData] = useState([]);

  const [currEvent, setCurrEvent] = useState('');
  const navigate = useNavigate();

  const defaultValues = {
    firstName: '',
    lastName: '',
    email: '',
  };

  const {
    register,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), defaultValues });

  const getEvents = async () => {
    try {
      const events = await Backend.get('/events');
      console.log(events.data);
      setEventsData(events.data);
    } catch (err) {
      console.log(`Error getting events: `, err.message);
    }
  };

  const handleNewRoute = () => {
    navigate(`/register/${currEvent}`);
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div>
      <FormControl isInvalid={errors && errors.id} width="47%">
        <FormLabel marginLeft={10} marginTop={10}>
          Event
        </FormLabel>
        <Select
          marginLeft={10}
          placeholder="Select event"
          {...register('event_id')}
          onChange={event => {
            console.log(event.target.value);
            setCurrEvent(event.target.value);
          }}
        >
          {eventsData.map(element => (
            <option key={element.id} value={element.id}>
              {element.name}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{errors.id && errors.id.message}</FormErrorMessage>
      </FormControl>

      <Button marginTop={10} marginLeft={10} colorScheme="blue" onClick={handleNewRoute}>
        Continue
      </Button>
    </div>
  );
};

export default SelectEvent;
