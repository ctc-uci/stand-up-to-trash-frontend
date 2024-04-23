/* eslint-disable react/prop-types */
import { Flex, Text } from '@chakra-ui/react';

// Copied and modified from https://stackoverflow.com/a/66390028/7203225
const units = [
  { unit: 'year', ms: 31536000000 },
  { unit: 'month', ms: 2628000000 },
  { unit: 'day', ms: 86400000 },
  { unit: 'hour', ms: 3600000 },
  { unit: 'minute', ms: 60000 },
  { unit: 'second', ms: 1000 },
];
const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

/**
 * Get language-sensitive relative time message from Dates.
 * @param relative  - the relative dateTime, generally is in the past or future
 * @param pivot     - the dateTime of reference, generally is the current time
 */
const relativeTimeFromDates = (relative, pivot = new Date()) => {
  if (!relative) return '';
  const elapsed = relative.getTime() - pivot.getTime();
  return relativeTimeFromElapsed(elapsed);
};

/**
 * Get language-sensitive relative time message from elapsed time.
 * @param elapsed   - the elapsed time in milliseconds
 */
const relativeTimeFromElapsed = elapsed => {
  if (!Number.isFinite(elapsed)) {
    return ''; // Return an empty string if elapsed is not a finite number
  }

  for (const { unit, ms } of units) {
    if (Math.abs(elapsed) >= ms || unit === 'second') {
      return rtf.format(Math.round(elapsed / ms), unit);
    }
  }
  return '';
};

// const HOUR_IN_MS = 1000 * 60 * 60;

const HappeningInChip = ({ date }) => {
  // READ THIS! REUSE THIS WHEN WORKING ON HAPPENING NOW

  // let color = '#5BD260';
  // // Default "happening right now" color
  // let inThePast = false;
  // const relativeTimeInMs = date.getTime() - new Date().getTime();
  // if (relativeTimeInMs > HOUR_IN_MS * 3) color = '#EAA554';
  // // Happening in the future (3+ hours from now)
  // else if (relativeTimeInMs < HOUR_IN_MS * 6) {
  //   color = '#ea5468';
  //   // Happening in the past (6+ hours in the past)
  //   inThePast = true;
  // }
  return (
    <Flex
      borderRadius="md"
      background="#FFD9D9"
      display="inline-flex"
      padding="5px 9px"
      flexDir="column"
      justifyContent={'center'}
      alignItems={'center'}
      color="#FF3B2E"
      fontWeight={'semibold'}
    >
      <Flex alignItems="center" gap="6px">
        <svg
          width="30"
          height="30"
          viewBox="0 0 19 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="fluent:live-20-filled">
            <path
              id="Vector"
              d="M5.24111 4.63473C5.17797 4.5703 5.10276 4.51895 5.01976 4.48361C4.93677 4.44827 4.84762 4.42962 4.75742 4.42874C4.66721 4.42787 4.57772 4.44477 4.49406 4.47849C4.41039 4.51221 4.33419 4.56209 4.2698 4.62527C3.54151 5.34934 2.96379 6.21045 2.56999 7.15892C2.17618 8.1074 1.97408 9.12446 1.97535 10.1514C1.97417 11.2178 2.19217 12.2731 2.61583 13.2517C3.03949 14.2303 3.65976 15.1114 4.43815 15.8403C4.56916 15.9614 4.74221 16.0267 4.92056 16.0223C5.09892 16.0178 5.26853 15.9441 5.39338 15.8166C5.69225 15.5178 5.65536 15.0421 5.36785 14.7668C4.74316 14.1715 4.24605 13.4554 3.90673 12.6619C3.56742 11.8685 3.39297 11.0144 3.39401 10.1514C3.39401 8.40554 4.09483 6.82231 5.23166 5.67035C5.50593 5.39135 5.5343 4.92792 5.24111 4.63473ZM6.90663 6.30213C6.78207 6.17397 6.61178 6.10041 6.43308 6.09757C6.25438 6.09473 6.08185 6.16285 5.95328 6.287C5.44157 6.792 5.0354 7.39373 4.7584 8.05716C4.4814 8.7206 4.3391 9.4325 4.33979 10.1514C4.33979 11.7517 5.03021 13.1902 6.13014 14.1852C6.26007 14.2997 6.42909 14.3599 6.60218 14.3532C6.77527 14.3465 6.93915 14.2735 7.05984 14.1492C7.37006 13.839 7.31236 13.351 7.02106 13.0767C6.62177 12.7014 6.3037 12.2481 6.08653 11.745C5.86936 11.2418 5.7577 10.6995 5.75845 10.1514C5.75845 9.0638 6.19067 8.07641 6.89338 7.35194C7.16388 7.07389 7.20833 6.60289 6.90663 6.30213ZM12.1765 6.30119C12.3011 6.17302 12.4713 6.09946 12.65 6.09663C12.8287 6.09379 13.0013 6.16191 13.1298 6.28605C13.6417 6.79117 14.0479 7.39305 14.3249 8.05665C14.6019 8.72026 14.7441 9.43234 14.7433 10.1514C14.7433 11.7517 14.0529 13.1902 12.953 14.1852C12.8231 14.2997 12.654 14.3599 12.4809 14.3532C12.3078 14.3465 12.144 14.2735 12.0233 14.1492C11.7131 13.839 11.7708 13.351 12.0621 13.0767C12.4614 12.7014 12.7794 12.2481 12.9966 11.745C13.2138 11.2418 13.3254 10.6995 13.3247 10.1514C13.3247 9.0638 12.8924 8.07641 12.1897 7.35194C11.9192 7.07389 11.8748 6.60194 12.1765 6.30119ZM13.842 4.63473C13.9051 4.5703 13.9804 4.51895 14.0634 4.48361C14.1464 4.44827 14.2355 4.42962 14.3257 4.42874C14.4159 4.42787 14.5054 4.44477 14.5891 4.47849C14.6727 4.51221 14.7489 4.56209 14.8133 4.62527C15.5416 5.34934 16.1193 6.21045 16.5131 7.15892C16.9069 8.1074 17.109 9.12446 17.1078 10.1514C17.109 11.2178 16.8909 12.2731 16.4673 13.2517C16.0436 14.2303 15.4234 15.1114 14.645 15.8403C14.514 15.9614 14.3409 16.0267 14.1626 16.0223C13.9842 16.0178 13.8146 15.9441 13.6897 15.8166C13.3909 15.5178 13.4278 15.0421 13.7162 14.7668C14.3407 14.1714 14.8377 13.4552 15.1768 12.6618C15.516 11.8684 15.6903 11.0143 15.6891 10.1514C15.6891 8.40554 14.9883 6.82231 13.8515 5.67035C13.5772 5.39135 13.5488 4.92792 13.842 4.63473ZM9.54156 8.73278C9.16531 8.73278 8.80446 8.88224 8.53841 9.1483C8.27236 9.41435 8.12289 9.77519 8.12289 10.1514C8.12289 10.5277 8.27236 10.8885 8.53841 11.1546C8.80446 11.4206 9.16531 11.5701 9.54156 11.5701C9.91781 11.5701 10.2787 11.4206 10.5447 11.1546C10.8108 10.8885 10.9602 10.5277 10.9602 10.1514C10.9602 9.77519 10.8108 9.41435 10.5447 9.1483C10.2787 8.88224 9.91781 8.73278 9.54156 8.73278Z"
              fill="#FF3B2E"
            />
          </g>
        </svg>
        <Text
          fontSize={{base : '12px', md : '14px'}}
        >
          {/* {inThePast ? 'happened' : 'happening'}  */}
          {relativeTimeFromDates(date)}
        </Text>
      </Flex>
    </Flex>
  );
};

// HappeningInChip.propTypes = {
// date: PropTypes.object.isRequired,
// };

export default HappeningInChip;
