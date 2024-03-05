import { Tabs, TabList, Tab, Badge } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const VolunteerTabNavigation = ({ volunteerResults, setTabIndex }) => {
  return (
    <Tabs colorScheme="blue" onChange={setTabIndex}>
      <TabList>
        <Tab
          fontWeight="bold"
          sx={{
            color: 'rgba(123, 124, 125, 0.75)', // Add styles for the Badge when the tab is selected
            '.chakra-badge': {
              bg: '#E9ECED',
              color: '#999B9C',
            },
          }} // Default color for unselected tabs
          _selected={{
            color: 'blue.500', // Style for selected tab
            borderBottom: '4px solid', // Set the thickness of the underline
            borderColor: 'blue.600', // Use the same color for the underline
            '.chakra-badge': {
              bg: 'blue.500',
              color: 'white',
            },
          }}
        >
          All <Badge ml="2">{volunteerResults.length}</Badge>
        </Tab>
        <Tab
          fontWeight="bold"
          sx={{
            color: 'rgba(123, 124, 125, 0.75)', // Add styles for the Badge when the tab is selected
            '.chakra-badge': {
              bg: '#E9ECED',
              color: '#999B9C',
            },
          }}
          _selected={{
            color: 'blue.500',
            borderBottom: '4px solid', // Set the thickness of the underline
            borderColor: 'blue.600', // Use the same color for the underline
            '.chakra-badge': {
              bg: 'blue.500',
              color: 'white',
            },
          }}
        >
          Checked-in{' '}
          <Badge ml="2">{volunteerResults.filter(v => v.is_checked_in === true).length}</Badge>
        </Tab>
        <Tab
          fontWeight="bold"
          sx={{
            color: 'rgba(123, 124, 125, 0.75)', // Add styles for the Badge when the tab is selected

            '.chakra-badge': {
              bg: '#E9ECED',
              color: '#999B9C',
            },
          }}
          _selected={{
            color: 'blue.500',
            borderBottom: '4px solid', // Set the thickness of the underline
            borderColor: 'blue.500', // Use the same color for the underline
            '.chakra-badge': {
              bg: 'blue.500',
              color: 'white',
            },
          }}
        >
          Not Checked-in{' '}
          <Badge ml="2">{volunteerResults.filter(v => v.is_checked_in === false).length}</Badge>
        </Tab>
        <Tab
          fontWeight="bold"
          sx={{
            color: 'rgba(123, 124, 125, 0.75)', // Add styles for the Badge when the tab is selected
            '.chakra-badge': {
              bg: '#E9ECED',
              color: '#999B9C',
            },
          }}
          _selected={{
            color: 'blue.500',
            borderBottom: '4px solid', // Set the thickness of the underline
            borderColor: 'blue.500', // Use the same color for the underline
            '.chakra-badge': {
              bg: 'blue.500',
              color: 'white',
            },
          }}
        >
          Guests <Badge ml="2">{volunteerResults.filter(v => v.role === 'guest').length}</Badge>
        </Tab>
      </TabList>
    </Tabs>
  );
};
VolunteerTabNavigation.propTypes = {
  volunteerResults: PropTypes.array.isRequired,
  setTabIndex: PropTypes.func.isRequired,
};

export default VolunteerTabNavigation;
