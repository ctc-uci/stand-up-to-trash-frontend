/* eslint-disable react/prop-types */
import {
    Box,
  } from '@chakra-ui/react';

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
    for (const { unit, ms } of units) {
      if (Math.abs(elapsed) >= ms || unit === 'second') {
        return rtf.format(Math.round(elapsed / ms), unit);
      }
    }
    return '';
  };
  
  const HOUR_IN_MS = 1000 * 60 * 60;
  
  const HappeningInChip = ({ date }) => {
    console.log(date);

    let color = '#5BD260'; // Default "happening right now" color
    let inThePast = false;
    const relativeTimeInMs = date.getTime() - new Date().getTime();
    if (relativeTimeInMs > HOUR_IN_MS * 3)
      color = '#EAA554'; // Happening in the future (3+ hours from now)
    else if (relativeTimeInMs < HOUR_IN_MS * 6) {
      color = '#ea5468'; // Happening in the past (6+ hours in the past)
      inThePast = true;
    }
    return (
      <Box
        borderRadius="15px"
        background="rgba(217, 217, 217, 0.72)"
        display="inline-flex"
        padding="5px 9px"
        flexDir="column"
        justifyContent={'center'}
        alignItems={'center'}
        gap="10px"
        color="black"
        fontSize="11px"
      >
        <Box display="flex" alignItems="center" gap="6px">
          <svg width="8" height="9" viewBox="0 0 8 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="4" cy="4.5" r="3.5" fill={color} stroke="black" />
          </svg>
          {inThePast ? 'happened' : 'happening'} {relativeTimeFromDates(date)}
        </Box>
      </Box>
    );
  };
  
// HappeningInChip.propTypes = {
// date: PropTypes.object.isRequired,
// };

export default HappeningInChip;