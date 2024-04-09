import { Box, Text, Flex } from '@chakra-ui/react';
import adminLogo from '../../Assets/navbar/stand_up_to_trash_logo.png';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import UserContext from '../../utils/UserContext';
import RoleContext from '../../utils/RoleContext';
import NavbarContext from '../../utils/NavbarContext';

import {
  ArchivedEventsIconBlue,
  ArchivedEventsIconGrey,
  HomeIconBlue,
  HomeIconGrey,
  EventsIconBlue,
  EventsIconGrey,
  VolunteersIconBlue,
  VolunteersIconGrey,
  SupportIconGrey,
  SettingsIconGrey,
  LogOutIcon,
} from '../Icons/NavbarIcons';
import { CloseIcon } from '@chakra-ui/icons';

import { Tag } from '@chakra-ui/react';
import { logout } from '../../utils/firebaseAuthUtils';

// eslint-disable-next-line react/prop-types
const NavbarButton = ({ buttonText, path, navigate, UnfocusedIcon, FocusedIcon }) => {
  return (
    <Box
      height="49px"
      display="flex"
      flexDirection="row"
      alignItems="center"
      gap="10px"
      paddingLeft="10px"
      marginLeft="14px"
      marginRight="14px"
      marginBottom="6px"
      backgroundColor={location.pathname === path ? '#D4E4F9' : 'transparent'}
      borderRadius="4px"
      onClick={e => {
        e.preventDefault();
        navigate(path);
      }}
    >
      {location.pathname === path ? (
        <FocusedIcon style={{ width: '14px', height: '14px' }} />
      ) : (
        <UnfocusedIcon style={{ width: '14px', height: '14px' }} />
      )}
      <Text
        style={{
          fontSize: location.pathname === path ? '18px' : '16px',
          fontWeight: '500',
          lineHeight: '25px',
          textAlign: 'center',
          color: location.pathname === path ? '#1873FB' : '#717171',
        }}
      >
        {buttonText}
      </Text>
    </Box>
  );
};

const Navbar = () => {
  const { user, updateUser } = useContext(UserContext);
  const { role } = useContext(RoleContext);
  const { onNavbarDrawerClose } = useContext(NavbarContext);

  const navigate = useNavigate();

  useEffect(() => {
    updateUser();
  }, [updateUser]);

  // Change the paths for each button since these might change
  const homePath = '/';
  const eventsPath = '/event';
  const archivedEventsPath = '/past-events';
  const volunteersPath = '/volunteers';

  // For the support and settings button at the bottom above the user
  const supportPath = '/playground';
  const settingsPath = '/playground';

  // For logout in case it changes from /logoutv2
  const logoutPath = '/loginv2';

  // For navigating to the user profile when you click on it
  // at the bottom
  // This will then conditionally route the user to the volunteer
  // profile or to the admin profile
  const profilePath = '/profile';

  return (
    <>
      {/* Box for entire navbar */}
      <Box position="fixed" top="0" w={{ base: 'full', xl: '15rem' }} float="left">
        {/* Box for entire nabar with coloring */}
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
          {/* Box containing everything above "support" */}
          <Box display="flex" flexDir="column" width={'full'} as="a" href="/">
            {/* Box containing the logo and role title at the top */}
            <Flex align={'center'} justifyContent={'space-between'} pr={7}>
              <Box
                height="40px"
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap="10px"
                paddingTop="35px"
                paddingBottom="35px"
                paddingLeft="20px"
              >
                <img src={adminLogo} style={{ width: '27px', height: '26.308px' }} />
                <Text
                  style={{
                    fontSize: '16px',
                    fontWeight: '800',
                    lineHeight: '22px',
                    textAlign: 'left',
                    color: '#000000BF',
                  }}
                >
                  {role?.charAt(0).toUpperCase() + role?.slice(1)}
                </Text>
              </Box>
              <CloseIcon
                boxSize={6}
                color={'gray'}
                onClick={e => {
                  e.preventDefault();
                  onNavbarDrawerClose();
                }}
                display={{ base: 'flex', xl: 'none' }}
              />
            </Flex>
            {/* Add break between role and logo at the top and the nav buttons */}
            <hr style={{ color: 'black', marginLeft: '14px', marginRight: '14px' }} />
            <br></br>

            {/* Home button */}
            <NavbarButton
              buttonText={'Home'}
              path={homePath}
              navigate={navigate}
              FocusedIcon={HomeIconBlue}
              UnfocusedIcon={HomeIconGrey}
            />

            {/* Current Events button */}
            <NavbarButton
              buttonText={'Current Events'}
              path={eventsPath}
              navigate={navigate}
              FocusedIcon={EventsIconBlue}
              UnfocusedIcon={EventsIconGrey}
            />
                
            {/* Conditional rendering based on the role */}
            {role === 'admin' && (
              <>
                {/* Archived Events button */}
                <NavbarButton
                  buttonText={'Past Events'}
                  path={archivedEventsPath}
                  navigate={navigate}
                  FocusedIcon={ArchivedEventsIconBlue}
                  UnfocusedIcon={ArchivedEventsIconGrey}
                />


                {/* Volunteers button */}
                <NavbarButton
                  buttonText={'Volunteers'}
                  path={volunteersPath}
                  navigate={navigate}
                  FocusedIcon={VolunteersIconBlue}
                  UnfocusedIcon={VolunteersIconGrey}
                />
              </>
            )}
          </Box>
          {/* Bottom of navbar, support and below */}
          <Box>
            {/* Support button */}
            <Box
              height="49px"
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap="10px"
              paddingLeft="10px"
              marginLeft="14px"
              marginRight="14px"
              marginBottom="-13px"
              borderRadius="4px"
              cursor="pointer" // Add this to change cursor to pointer
              onClick={e => {
                e.preventDefault();
                navigate(supportPath);
              }}
            >
              <SupportIconGrey />
              <Text
                style={{
                  fontWeight: '500',
                  fontSize: '16px',
                  lineHeight: '25px',
                  textAlign: 'center',
                }}
              >
                Support
              </Text>
            </Box>

            {/* Settings button */}
            <Box
              height="49px"
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap="10px"
              paddingLeft="10px"
              marginLeft="14px"
              marginRight="14px"
              marginBottom="2px"
              borderRadius="4px"
              cursor="pointer"
              onClick={e => {
                e.preventDefault();
                navigate(settingsPath);
              }}
            >
              <SettingsIconGrey />
              <Text
                style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  lineHeight: '25px',
                  textAlign: 'center',
                }}
              >
                Settings
              </Text>
            </Box>

            {/* User card at bottom */}
            <Box
              style={{
                height: '68px',
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
              onClick={e => {
                e.preventDefault();
                navigate(profilePath);
              }}
              as="a"
              href="#"
            >
              {/* User image */}
              <Box style={{ borderRadius: '50%' }}>
                <img
                  src={user?.image_url}
                  style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover' }}
                />
              </Box>
              <Box
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                {/* User name */}
                <Text
                  style={{
                    fontWeight: '800',
                    color: '#000000',
                    fontSize: '14px',
                    lineHeight: '25px',
                    textAlign: 'left',
                    overflowY: 'auto',
                    marginTop: '-1px',
                  }}
                >
                  {user?.first_name} {user?.last_name}
                </Text>

                <Tag
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    lineHeight: '16px',
                    color: '#717171',
                    alignContent: 'left',
                    width: 'Hug(19px)',
                    height: 'Hug(89px)',
                    padding: '2px 6px 2px 6px',
                    borderRadius: '4px',
                    gap: '10px',
                    textTransform: 'capitalize',
                  }}
                >
                  {role}
                  {/* Primary Admin */}
                </Tag>
              </Box>
              {/* Logout button */}
              <Box
                display="flex"
                padding="4.985px"
                alignItems="center"
                gap="4.985px"
                backgroundColor="#FFE1E1"
                borderRadius="4px"
                cursor="pointer"
                onClick={e => {
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
