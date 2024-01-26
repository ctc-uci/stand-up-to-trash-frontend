import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Backend from '../utils/utils';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  Checkbox,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';

const schema = yup.object({
  volunteer_id: yup.string().required('ID required').max(10, 'ID exceeds 10 character limit'),
  firstName: yup.string().required('First Name Required'),
  lastName: yup.string().required('Last Name Required'),
  number_in_party: yup.string().required('Number of Party Required'),
  checked: yup.boolean().required('Must agree to terms and conditions'),
});

const Register = () => {
  const { eventId } = useParams();
  const [waiverUrl, setWaiverUrl] = useState('');
  const [checked, setChecked] = useState(false);

  const defaultValues = {
    volunteer_id: '',
    firstName: '',
    lastName: '',
    number_in_party: '',
    checked: false,
  };

  const getWaiver = async () => {
    try {
      const response = await Backend.get(`/events/${eventId}`);
      setWaiverUrl(response.data.image_url);
    } catch (err) {
      console.log(err);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), defaultValues });

  const postVolunteerData = async formData => {
    try {
      //   await Backend.post('/data', formData);
      console.log('Submitted ');
      console.log(formData);
      console.log('CHECKED', checked);
    } catch (e) {
      console.log('Error posting', e);
    }
  };

  useEffect(() => {
    getWaiver();
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
        <FormErrorMessage>{errors}</FormErrorMessage>
      </FormControl>

      {/* FIRST NAME */}
      <FormControl isInvalid={errors && errors.id} width="47%">
        <FormLabel marginLeft={10} marginTop={10}>
          First Name
        </FormLabel>
        <Input marginLeft={10} width={'auto'} {...register('firstName')} />
      </FormControl>

      {/* LAST NAME */}
      <FormControl isInvalid={errors && errors.id} width="47%">
        <FormLabel marginLeft={10} marginTop={10}>
          Last Name
        </FormLabel>
        <Input marginLeft={10} width={'auto'} {...register('lastName')} />
      </FormControl>

      <FormControl isInvalid={errors && errors.id} width="47%">
        <FormLabel marginLeft={10} marginTop={10}>
          Number of party members
        </FormLabel>
        <Input marginLeft={10} width={'auto'} {...register('number_in_party')} />
      </FormControl>

      <img src={waiverUrl} />
      <Checkbox onChange={() => setChecked(!checked)}>I agree to the terms & conditions</Checkbox>

      <Button marginTop={10} marginLeft={10} colorScheme="blue" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Register;
