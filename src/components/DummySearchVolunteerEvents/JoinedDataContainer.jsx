/* eslint-disable react/prop-types */
import { Flex, Text } from '@chakra-ui/react';

export default function JoinedDataContainer({ data }) {
  return (
    <Flex>
      <Text>{data.first_name}</Text>
    </Flex>
  );
}
