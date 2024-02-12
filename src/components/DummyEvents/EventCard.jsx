import {
  Box,
  Button,
  Checkbox,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Image,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import pencil_icon from '../../Assets/pencil_icon.png';
import PropTypes from 'prop-types';

// Copied and modified from https://stackoverflow.com/a/66390028/7203225
const units = [
  {unit: "year", ms: 31536000000},
  {unit: "month", ms: 2628000000},
  {unit: "day", ms: 86400000},
  {unit: "hour", ms: 3600000},
  {unit: "minute", ms: 60000},
  {unit: "second", ms: 1000},
];
const rtf = new Intl.RelativeTimeFormat("en", {numeric: "auto"});

/**
* Get language-sensitive relative time message from Dates.
* @param relative  - the relative dateTime, generally is in the past or future
* @param pivot     - the dateTime of reference, generally is the current time
*/
const relativeTimeFromDates = (relative, pivot = new Date()) => {
  if (!relative) return "";
  const elapsed = relative.getTime() - pivot.getTime();
  return relativeTimeFromElapsed(elapsed);
}

/**
* Get language-sensitive relative time message from elapsed time.
* @param elapsed   - the elapsed time in milliseconds
*/
const relativeTimeFromElapsed = (elapsed) => {
  for (const {unit, ms} of units) {
      if (Math.abs(elapsed) >= ms || unit === "second") {
          return rtf.format(Math.round(elapsed / ms), unit);
      }
  }
  return "";
}

const HOUR_IN_MS = 1000 * 60 * 60;

const HappeningInChip = ({date}) => {
  let color = "#5BD260"; // Default "happening right now" color
  let inThePast = false;
  const relativeTimeInMs = (date.getTime() - (new Date()).getTime());
  if (relativeTimeInMs > HOUR_IN_MS * 3)
    color = "#EAA554"; // Happening in the future (3+ hours from now)
  else if (relativeTimeInMs < HOUR_IN_MS * 6) {
    color = "#ea5468" // Happening in the past (6+ hours in the past)
    inThePast = true;
  }
  return (
    <Box borderRadius="15px" background="rgba(217, 217, 217, 0.72)" display="inline-flex" padding="5px 9px" flexDir="column" justifyContent={"center"} alignItems={"center"} gap="10px" color="black" fontSize="11px">
      <Box display="flex" alignItems="center" gap="6px">
      <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="4" cy="4.5" r="3.5" fill={color} stroke="black"/>
      </svg>
        {inThePast ? 'happened' : 'happening'} {relativeTimeFromDates(date)}
      </Box>
    </Box>
  )
};

HappeningInChip.propTypes = {
  date: PropTypes.object.isRequired
}

const EventCard = ({
  id,
  name,
  description,
  location,
  date,
  showSelect,
  image_url,
  isSelected,
  handleCheckboxChange,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // Placeholder for testing a high-res image
  // image_url = "https://s3-alpha-sig.figma.com/img/925a/d6ba/98e5fc832087ccc9eb019a8562418d70?Expires=1708300800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=hmVTqMVJanXYQRLkiQ91N0JuEs6HSNy3zmb28YJAdYA4ZaA7hJpZEvoc5jQwIPEqcVV4msa8S4Azw49FqP6jBPiSQyE-Q5u41YMTPge1HaDhA2eQ7me21XG1hlJ~qeOQ3se7sk35~qVkkdaRruV7tBRDsc-Y980XKneuEAfggh35IQJqIn3~HvVb0WogiqR8SYsVOy2FQhlStCRojrOgzhO5YmwdKuwWozhmBuqYNEl6sm45YfLTCfinIci8E8fflDlTtlUhDwUlBpGu0k5ojol7GP2Czwv-ggac6Yijbj~rkDzdWfmj0Vs-7FqgyFtRsSaAvChFPn0yVcaZjrWS1g__";
  const dateObj = new Date(Date.parse(date));
  const dateStr = `${dateObj.toLocaleString('default', {month: 'long', day: 'numeric'})}, ${dateObj.toLocaleString('default', {year: 'numeric'})} @  ${dateObj.toLocaleString('default', {timeStyle: 'short'})}`;

  return (
    <>
      <Box
        width="293px"
        height="250px"
        boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
        display="flex"
        flexDir="column"
        justifyContent={"space-between"}
        borderRadius="30px"
        as="a"
        href="#"
        onClick={() => (showSelect ? handleCheckboxChange(id) : onOpen())}
        background={`linear-gradient(0deg, rgba(0, 0, 0, 0.36) 0%, rgba(0, 0, 0, 0.36) 100%), url(${image_url})`}
        backgroundSize="cover"
      >
        {/* {showSelect ? (
          <Checkbox
            id={id}
            marginLeft="10px"
            marginBottom="200px"
            style={{ borderRadius: '100px' }}
            isChecked={isSelected}
            onChange={() => handleCheckboxChange(id)}
          />
        ) : null}
        <Spacer />
        <Text fontSize={18} fontWeight={'bold'} textAlign={'center'} m="4">
          {name}
        </Text>
        <Spacer /> */}
        <Box w={"100%"} display="flex" pointerEvents={"none"}>
          {/* Top section, for things like select and edit icons */}
          {showSelect ? (
            <Checkbox
              id={id}
              style={{ borderRadius: '100px' }}
              isChecked={isSelected}
              m="16px"
              borderRadius="25px"
              width="26px"
              variant="circular-lg"
            />
          ) : null}
          <Box m="16px" justifySelf="end" ml="auto">
            <Image src={pencil_icon} width="26px"/>
          </Box>
        </Box>
        <Box px="27px" py="20px" color="white">
          {/* Bottom section for text, date/time, etc. */}
          <HappeningInChip date={dateObj}/>
          <Text fontWeight="700" fontSize="25px">
            {name}
          </Text>
          <Text fontSize="15px">
            {dateStr}
          </Text>
        </Box>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent maxH="660px" maxW="800px" borderRadius="0">
          <ModalBody p="0">
            <Box display="flex" flexDir="row" h="660px" w="800px">
              <Box flexBasis="60%" display="flex" flexDir="column">
                <Box flexBasis="60%" bg="#D9D9D9" display="flex" alignItems="end" p="2">
                  <Stack mx="6">
                    <Heading>{name}</Heading>
                    <Text>{location}</Text>
                  </Stack>
                </Box>
                <Box
                  flexBasis="40%"
                  mx="8"
                  my="4"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  flexDir="column"
                >
                  <Box alignSelf="start">
                    <Heading fontSize={24}>Event Description</Heading>
                    <Text fontSize={18}>{description}</Text>
                  </Box>
                  <Box>
                    <Button
                      color="black"
                      backgroundColor="rgba(149, 189, 212, 0.71)"
                      borderRadius="0"
                      colorScheme={'grey'}
                      as="a"
                      href={`/checkin/${id}`}
                      target="_blank"
                    >
                      View More
                    </Button>
                  </Box>
                </Box>
              </Box>
              <Box
                flexBasis="40%"
                bg="rgba(217, 217, 217, 0.40)"
                display="flex"
                justifyItems={'end'}
                alignItems={'start'}
              >
                <ModalCloseButton />
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

EventCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  image_url: PropTypes.string,
  date: PropTypes.string,
  location: PropTypes.string,
  showSelect: PropTypes.bool,
  isSelected: PropTypes.bool,
  handleCheckboxChange: PropTypes.func,
};

export default EventCard;
