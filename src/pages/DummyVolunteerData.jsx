/* eslint-disable  no-unused-vars */
import Backend from '../../utils/utils';
import React, { useEffect, useState } from 'react';
import { Heading, Text, SimpleGrid, Button, Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'




const DummyVolunteerData = () => {

  const [volunteers, setVolunteers] = useState([]);

  const getVolunteerData = async () => {
    const { data } = await Backend.get('/data');
    console.log(data);
    setVolunteers(data);
  };

  useEffect(() => {
    getVolunteerData();
    console.log(volunteers);
  }, []);
  return (
      <>
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
        <Card>
          <CardHeader>
            <Heading size='md'> Something </Heading>
          </CardHeader>
          <CardBody>
            <Text>View a summary of all your customers over the last month.</Text>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size='md'> Customer dashboard</Heading>
          </CardHeader>
          <CardBody>
            <Text>View a summary of all your customers over the last month.</Text>
          </CardBody>
          <CardFooter>
            <Button>View here</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <Heading size='md'> Customer dashboard</Heading>
          </CardHeader>
          <CardBody>
            <Text>View a summary of all your customers over the last month.</Text>
          </CardBody>
          <CardFooter>
            <Button>Delete</Button>
          </CardFooter>
        </Card>
      </SimpleGrid>
      </>
    );
};

export default DummyVolunteerData;
