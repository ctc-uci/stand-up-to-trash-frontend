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
  Heading,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useParams } from 'react-router-dom';

const schema = yup.object({
  volunteer_id: yup.string().required('ID required'),
  firstName: yup.string().required('First Name Required'),
  lastName: yup.string().required('Last Name Required'),
  number_in_party: yup
    .number()
    .typeError('Input must be numeric')
    .min(1)
    .required('Number of Party Required'),
  checked: yup.bool().oneOf([true], 'Must agree to terms and conditions'),
});

const Register = () => {
  const { eventId } = useParams();
  const [waiverText, setWaiverText] = useState('');

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
      setWaiverText(response.data.waiver);
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
    const submitData = {
      volunteer_id: formData.volunteer_id,
      number_in_party: formData.number_in_party,
      event_id: eventId,
      is_checked_in: false,
      pounds: 0,
      ounces: 0,
    };

    try {
      await Backend.post('/data', submitData);
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

      <Heading mt={5}>Waiver</Heading>
      <p>{waiverText}</p>
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
