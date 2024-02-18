import { Flex, Text } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { GoogleMapsIcon } from '../Icons/GoogleMapsIcon';
// import { googleMapsSearch } from '../../utils/googleMapsUtils';
import { getEventById } from "../../utils/eventsUtils";
// import Backend from '../../utils/utils';


// eslint-disable-next-line react/prop-types
const GetMapDirectionsButton = ({ eventId }) => {
    console.log(eventId);


    const getDirection = async eventId => {
      const { location } = await getEventById(eventId);
      console.log(location);
      window.open(`https://www.google.com/maps/search/?api=1&query=${location}`)
    }

    return (
    <Flex>
        <Button
        background={'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))'}
        style={{
            background: 'linear-gradient(0deg, rgba(28, 28, 28, 0.1), rgba(28, 28, 28, 0.1))',
            border: '1.8px solid #00000080',
            width: '185px',
            height: 'Hug (50px)',
            borderRadius: '11px',
        }}
        onClick={() => getDirection(eventId)}
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
                color: '#00000080'
            }}
            >
                get map directions
            </Text>
        </Button>
    </Flex>
    );


}

export default GetMapDirectionsButton;
