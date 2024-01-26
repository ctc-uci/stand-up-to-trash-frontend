import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Backend from '../utils/utils';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Select,
  FormErrorMessage,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  volunteer_id: yup.string().required('ID required').max(10, 'ID exceeds 10 character limit'),
  number_in_party: yup.string().required('Number of Party Required'),
  event_id: yup.string().required('Event required'),
});

const DummyVolunteerRegistrationForm = () => {
  const [eventsData, setEventsData] = useState([]);

  const defaultValues = {
    volunteer_id: '',
    number_in_party: '',
    pounds: 0, 
    ounces: 0, 
    unusual_items: '',
    event_id: '',
    is_checked_in: false,
  };

  const {
    register,
    handleSubmit,
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

  const postVolunteerData = async formData => {
    try {
      await Backend.post('/data', formData);
      console.log('Submitted ');
      console.log(formData);
    } catch (e) {
      console.log('Error posting', e);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <form onSubmit={handleSubmit(data => postVolunteerData(data))}>
      {/* VOLUNTEER ID */}
      <FormControl isInvalid={errors && errors.id} width="47%">
        <FormLabel marginLeft={10} marginTop={10}>
          Volunteer Id
        </FormLabel>
        <Input
          marginLeft={10}
          width={'auto'}
          {...register('volunteer_id')} //id showing
        />
        <FormErrorMessage>{errors.id && errors.id.message}</FormErrorMessage>
      </FormControl>

      {/* EVENT NAME */}
      <FormControl isInvalid={errors && errors.id} width="47%">
        <FormLabel marginLeft={10} marginTop={10}>
          Event
        </FormLabel>
        <Select
          marginLeft={10}
          placeholder="Select event"
          {...register('event_id')}
        >
          {eventsData.map(element => (
            <option key={element.id} value={element.id}>
              {element.name}
            </option>
          ))}
        </Select>
        <FormErrorMessage>{errors.id && errors.id.message}</FormErrorMessage>
      </FormControl>

      {/* PARTY NUMBER */}
      <FormControl isInvalid={errors && errors.id} width="47%">
        <FormLabel marginLeft={10} marginTop={10}>
          Number of Party
        </FormLabel>
        <Input marginLeft={10} width={'auto'} {...register('number_in_party')} type="number" />
      </FormControl>

      <Button marginTop={10} marginLeft={10} colorScheme="blue" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default DummyVolunteerRegistrationForm;
