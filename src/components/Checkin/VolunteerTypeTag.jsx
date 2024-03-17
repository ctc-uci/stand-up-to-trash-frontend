import PropTypes from 'prop-types';
import { Grid, Icon, Text } from '@chakra-ui/react';
import GroupIcon from '../../Assets/groupIcon.svg';
import OrgIcon from '../../Assets/orgIcon.svg';
import IndividualIcon from '../../Assets/individualIcon.svg';

function VolunteerTypeTag({ VolunteerType }) {
  return (
    <div>
      <Grid
        templateRows="repeat(2, 1fr)"
        bg={'#ffffff'}
        style={{ borderRadius: '4px', padding: '6px 12px' }}
      >
        <Icon>
          {VolunteerType === 'Individual'
            ? IndividualIcon
            : VolunteerType === 'Group'
              ? GroupIcon
              : OrgIcon}
        </Icon>
        <Text fontSize={'14px'}>{VolunteerType}</Text>
      </Grid>
    </div>
  );
}

export default VolunteerTypeTag;

VolunteerTypeTag.propTypes = {
  Color: PropTypes.string,
  VolunteerType: PropTypes.string,
};
