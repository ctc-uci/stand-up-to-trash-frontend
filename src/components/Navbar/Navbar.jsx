import { Box, Text } from '@chakra-ui/react';
// import home from '../../Assets/navbar/home_navbar.svg';
// import profile from '../../Assets/navbar/profile.svg';
// import archive from '../../Assets/navbar/archived_events_navbar.svg';
import adminLogo from '../../Assets/navbar/stand_up_to_trash_logo.png';
// import event from '../../Assets/navbar/events_navbar.svg';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import UserContext from '../../utils/UserContext';
import RoleContext from '../../utils/RoleContext';
import { useLocation } from 'react-router-dom';
import { ArchivedEventsIconBlue, ArchivedEventsIconGrey, HomeIconBlue, 
        HomeIconGrey, EventsIconBlue, EventsIconGrey, VolunteersIconBlue, VolunteersIconGrey, SupportIconGrey, SettingsIconGrey, LogOutIcon } from '../Icons/NavbarIcons';
import { Tag } from '@chakra-ui/react';
import { logout } from '../../utils/firebaseAuthUtils';


const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);
  const { role } = useContext(RoleContext);

  useEffect(() => {
    console.log(`Here is the user info:`);
    console.log(user);
    console.log(`The user's role is: ${role}`)
    console.log('Current route:', location.pathname);
  });


  // Change the paths for each button since these might change
  const homePath = '/';
  const eventsPath = '/';
  const archivedEventsPath = '/archived-events';
  const volunteersPath = '/playground';

  // For the support and settings button at the bottom above the user
  const supportPath = '/playground';
  const settingsPath = '/playground';

  // For logout in case it changes from /logoutv2
  const logoutPath  = '/logoutv2';

  return (
    <>
      <Box position="fixed" top="0" w={'15rem'} float="left">
        <Box
          h="100vh"
          backgroundColor="#F5F8F9"
          borderRight={'1px solid #E2E8F0'}
          flex=""
          display="flex"
          flexDir="column"
          justifyContent="space-between"
          alignItems="start"
        >
          <Box display="flex" flexDir="column" width={'full'} as="a" href="/">
          <Box
              style={{
                height: '40px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
                paddingTop: '35px',
                paddingBottom: '35px',
                paddingLeft: '20px',
                
              }}
            >
              <img src={adminLogo} style={{width: '27px', height: '26.308px'}} />
              <Text style={{
                fontFamily : 'Avenir',
                fontSize: '16px',
                fontWeight: '800',
                lineHeight: '22px',
                textAlign: 'left',
                color: '#000000BF'
              }}>{role.charAt(0).toUpperCase() + role.slice(1)}</Text>
            </Box>
            <hr style = {{ color: 'black', marginLeft: '14px', marginRight: '14px' }}/>
            <br></br>
            <Box
              style={{
                height: '49px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
                paddingLeft: '20px',
                marginLeft: '14px',
                marginRight: '14px',
                marginBottom: '6px',
                backgroundColor: location.pathname === homePath ? '#D4E4F9' : 'transparent',
                borderRadius: '4px',
              }}
              onClick={e => {
                e.preventDefault();
                navigate(homePath);
              }}
            >
              {location.pathname === homePath ? (
                <HomeIconBlue style={{width: '14px', height: '14px'}}/>
              ) : (
                <HomeIconGrey style={{width: '14px', height: '14px'}}/>
              )}
              <Text style={{
                fontFamily : 'Avenir',
                fontSize: location.pathname === homePath ? '18px' : '16px',
                fontWeight: '500',
                lineHeight: '25px',
                textAlign: 'center',
                color: location.pathname === homePath ? '#1873FB' : '#717171',
              }}>Home</Text>
            </Box>
            <Box
              style={{
                height: '49px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
                paddingLeft: '20px',
                marginLeft: '14px',
                marginRight: '14px',
                marginBottom: '6px',
                backgroundColor: location.pathname === eventsPath ? '#D4E4F9' : 'transparent',
                borderRadius: '4px',
              }}
              onClick={e => {
                e.preventDefault();
                navigate(eventsPath);
              }}
            >
              {location.pathname === eventsPath ? (
                <EventsIconBlue />
              ) : (
                  <EventsIconGrey />
              )}
              <Text style={{
                fontFamily : 'Avenir',
                fontSize: location.pathname === eventsPath ? '18px' : '16px',
                fontWeight: '500',
                lineHeight: '25px',
                textAlign: 'center',
                color: location.pathname === eventsPath ? '#1873FB' : '#717171',
              }}>Events</Text>
            </Box>
            <Box
              style={{
                height: '49px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
                paddingLeft: '20px',
                marginLeft: '14px',
                marginRight: '14px',
                marginBottom: '6px',
                backgroundColor: location.pathname === archivedEventsPath ? '#D4E4F9' : 'transparent',
                borderRadius: '4px',
              }}
              onClick={e => {
                e.preventDefault();
                navigate(archivedEventsPath);
              }}
            >
              {location.pathname === archivedEventsPath ? (
                <ArchivedEventsIconBlue />
              ) : (
                <ArchivedEventsIconGrey />
              )}
              <Text style={{
                fontFamily : 'Avenir',
                fontSize: location.pathname === archivedEventsPath ? '18px' : '16px',
                fontWeight: '500',
                lineHeight: '25px',
                textAlign: 'center',
                color: location.pathname === archivedEventsPath ? '#1873FB' : '#717171',
              }}>Archived Events</Text>
            </Box>
            <Box
              style={{
                height: '49px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '10px',
                paddingLeft: '20px',
                marginLeft: '14px',
                marginRight: '14px',
                marginBottom: '6px',
                backgroundColor: location.pathname === volunteersPath ? '#D4E4F9' : 'transparent',
                borderRadius: '4px',
              }}
              onClick={e => {
                e.preventDefault();
                navigate(volunteersPath);
              }}
            >
              {location.pathname === volunteersPath ? (
                <VolunteersIconBlue />
              ) : (
                <VolunteersIconGrey />
              )}
              <Text style={{
                fontFamily : 'Avenir',
                fontSize: location.pathname === volunteersPath ? '18px' : '16px',
                fontWeight: '500',
                lineHeight: '25px',
                textAlign: 'center',
                color: location.pathname === volunteersPath ? '#1873FB' : '#717171',
              }}>Volunteers</Text>
            </Box>
          </Box>
          <Box>
            <Box style={{
                    height: '49px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '10px',
                    paddingLeft: '20px',
                    marginLeft: '14px',
                    marginRight: '14px',
                    marginBottom: '6px',
                    borderRadius: '4px',
                  }}
                  onClick={e => {
                    e.preventDefault();
                    navigate(supportPath);
                  }}
                >
                  <SupportIconGrey />
                  <Text style={{
                    fontFamily : 'Avenir',
                    fontWeight: '500',
                    fontSize: '16px',
                    lineHeight: '25px',
                    textAlign: 'center',
                  }}>Support</Text>
            </Box>
            <Box style={{
                    height: '49px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '10px',
                    paddingLeft: '20px',
                    marginLeft: '14px',
                    marginRight: '14px',
                    marginBottom: '6px',
                    borderRadius: '4px',
                  }}
                  onClick={e => {
                    e.preventDefault();
                    navigate(settingsPath);
                  }}
                >
                  <SettingsIconGrey />
                  <Text style={{
                    fontFamily : 'Avenir',
                    fontSize: '16px',
                    fontWeight: '500',
                    lineHeight: '25px',
                    textAlign: 'center',
                  }}>Settings</Text>
            </Box>
            <Box style={{
                    height: '68px',
                    width: '210px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px',
                    marginLeft: '14px',
                    marginRight: '13px',
                    marginBottom: '18px',
                    borderRadius: '12px',
                    backgroundColor: '#FFF',
                    border: '1px',
                  }}
                >
                  <Box style={{ borderRadius: '50%'}}>
                    <img src={user.image_url} style={{ width: '36.5px', height: '36.5px', borderRadius: '50%'}} />
                  </Box>
                  <Box style= {{
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>

                    <Text style={{
                      fontFamily : 'Avenir',
                      fontWeight: '500',
                      lineHeight: '25px',
                      textAlign: 'center',
                      overflowY: 'auto'
                    }}>{user.first_name} {user.last_name}</Text>
                    <Tag style= {{fontFamily : 'Avenir', fontSize: '12px'}}>Primary Admin</Tag>
                  </Box>
                  <Box style = {{ display: 'flex', padding: '4.985px', alignItems: 'center', gap: '4.985px', backgroundColor: '#FFE1E1', borderRadius: '4px' }}
                       onClick = {e => {   
                                  e.preventDefault();
                                  logout(logoutPath, navigate);
                                }}
                  >
                    <LogOutIcon />
                  </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Navbar;
