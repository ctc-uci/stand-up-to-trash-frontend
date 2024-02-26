import { Flex, Text, Button } from '@chakra-ui/react';
import { GoogleMapsIcon } from '../Icons/GoogleMapsIcon';
import { getEventById } from '../../utils/eventsUtils';

// eslint-disable-next-line react/prop-types
const GetMapDirectionsButton = ({ eventId }) => {
  return (
    <Flex>
      <Button
        // background={'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))'}
        style={{
          background: 'white',
          border: '1.8px solid #00000080',
          width: '185px',
          height: 'Hug (50px)',
          borderRadius: '11px',
        }}
        onClick={async () => {
          const { location } = await getEventById(eventId);
          // ++ ACTUAL ONE +++
          // window.open(`https://www.google.com/maps/search/?api=1&query=${location}`);

          // ++ FOR DEMO +++
          window.open(`https://www.google.com/maps/dir/?api=1&destination=${location}`);
        }}
      >
        <GoogleMapsIcon marginRight="5px" />
        <Text
          style={{
            family: 'Inter',
            size: '14px',
            weight: '600',
            lineHeight: '17px',
            letterSpacing: '0em',
            textAlign: 'left',
            color: '#00000080',
          }}
        >
          get map directions
        </Text>
      </Button>
    </Flex>
  );
};
export default GetMapDirectionsButton;
