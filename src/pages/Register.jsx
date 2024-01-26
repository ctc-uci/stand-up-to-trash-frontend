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
  checked: yup.bool().oneOf([true], 'Must agree to terms and conditions'),
});

const Register = () => {
  const { eventId } = useParams();
  const [waiverUrl, setWaiverUrl] = useState('');

  const defaultValues = {
    volunteer_id: '',
    firstName: '',
    lastName: '',
    number_in_party: '',
    checked: undefined,
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
      await Backend.post('/eventData', formData);
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
      <FormControl
        isInvalid={!!errors?.volunteer_id}
        errortext={errors?.volunteer_id?.message}
        width="47%"
      >
        <FormLabel marginLeft={10} marginTop={10}>
          Volunteer Id
        </FormLabel>
        <Input
          marginLeft={10}
          width={'auto'}
          {...register('volunteer_id')} //id showing
        />
        <FormErrorMessage>{errors?.volunteer_id?.message}</FormErrorMessage>
      </FormControl>

      {/* FIRST NAME */}
      <FormControl
        isInvalid={!!errors?.firstName}
        errortext={errors?.firstName?.message}
        width="47%"
      >
        <FormLabel marginLeft={10} marginTop={10}>
          First Name
        </FormLabel>
        <Input marginLeft={10} width={'auto'} {...register('firstName')} />
        <FormErrorMessage>{errors?.firstName?.message}</FormErrorMessage>
      </FormControl>

      {/* LAST NAME */}
      <FormControl isInvalid={!!errors?.lastName} errortext={errors?.lastName?.message} width="47%">
        <FormLabel marginLeft={10} marginTop={10}>
          Last Name
        </FormLabel>
        <Input marginLeft={10} width={'auto'} {...register('lastName')} />
        <FormErrorMessage>{errors?.lastName?.message}</FormErrorMessage>
      </FormControl>

      <FormControl
        isInvalid={!!errors?.number_in_party}
        errortext={errors?.number_in_party?.message}
        width="47%"
      >
        <FormLabel marginLeft={10} marginTop={10}>
          Number of party members
        </FormLabel>
        <Input marginLeft={10} width={'auto'} {...register('number_in_party')} />
        <FormErrorMessage>{errors?.number_in_party?.message}</FormErrorMessage>
      </FormControl>

      <img src={waiverUrl} />
      <FormControl isInvalid={!!errors?.checked} errortext={errors?.checked?.message} width="47%">
        <Checkbox {...register('checked')}>I agree to the terms & conditions</Checkbox>
        <FormErrorMessage>{errors?.checked?.message}</FormErrorMessage>
      </FormControl>

      <Button marginTop={10} marginLeft={10} colorScheme="blue" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default Register;
