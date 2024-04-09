import { ChakraProvider } from '@chakra-ui/react';
import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import EventPage from './pages/EventPage';
import HomePage from './pages/HomePage';
import DummyProfiles from './pages/DummyProfiles';
import DummyProfilePage from './pages/DummyProfilePage';
import DummySearchVolunteerEvents from './pages/DummySearchVolunteerEvents';
import DummySuccessfulLogin from './pages/DummySuccessfulLogin';
import DummyStatsPage from './pages/DummyStatsPage';
import CheckinPage from './pages/CheckinPage';
import Login from './pages/Login';
import LoginV2 from './pages/LoginV2';
import Signup from './pages/Signup';
import SignupV2 from './pages/SignupV2';
import ForgotPassword from './pages/ForgotPassword';
import ForgotPasswordV2 from './pages/ForgotPasswordV2';
import Playground from './components/Playground/Playground';
import FilteredEvents from './pages/FilteredEvent';
import Register from './pages/Register';
import SelectEvent from './pages/SelectEvent';
import DummyVolunteerQR from './pages/DummyVolunteerQR';
import DummyAdminQR from './pages/DummyAdminQR';
import Volunteers from './pages/Volunteers';
import Navbar from './components/Navbar/Navbar';
import NavbarDrawer from './components/Navbar/NavbarDrawer';
import AdminPage from './pages/AdminPage';
import VolunteerEventPage from './pages/VolunteerEventPage';
import { RoleProvider } from './utils/RoleContext';
import { UserProvider } from './utils/UserContext';
import ProtectedRoute from './utils/ProtectedRoute';
import NavbarContext from './utils/NavbarContext';
import PastEvents from './pages/PastEvents';
import ViewEvents from './pages/ViewEvents';

import { useDisclosure, useBreakpointValue, Box } from '@chakra-ui/react';

const Layout = () => {
  const isLargerThan1200px = useBreakpointValue({ base: false, xl: true });
  const {
    isOpen: isNavbarDrawerOpen,
    onOpen: onNavbarDrawerOpen,
    onClose: onNavbarDrawerClose,
  } = useDisclosure();

  return (
    <NavbarContext.Provider value={{ isNavbarDrawerOpen, onNavbarDrawerOpen, onNavbarDrawerClose }}>
      {isLargerThan1200px ? (
        <Navbar />
      ) : (
        <NavbarDrawer isOpen={isNavbarDrawerOpen} onClose={onNavbarDrawerClose} />
      )}
      <Box as="main" ml={isLargerThan1200px ? 'var(--size-of-navbar)' : 0}>
        <Outlet />
      </Box>
    </NavbarContext.Provider>
  );
};

import { theme } from './utils/chakraTheme';
import InputDataPage from './pages/InputDataPage';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <RoleProvider>
          <UserProvider>
            <Routes>
              <Route element={<Layout />}>
                {/* ADMIN PAGES-- */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute pageType="admin">
                      <HomePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/event"
                  element={
                    <ProtectedRoute pageType="admin">
                      <EventPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute pageType="admin">
                      <AdminPage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/past-events"
                  element={
                    <ProtectedRoute pageType="admin">
                      <PastEvents />{' '}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/past-events/:eventId"
                  element={
                    <ProtectedRoute pageType="admin">
                      <ViewEvents />{' '}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/checkin/:eventId"
                  element={
                    <ProtectedRoute pageType="admin">
                      <CheckinPage />{' '}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/input-data/:eventId"
                  element={
                    <ProtectedRoute pageType="admin">
                      <InputDataPage />{' '}
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin-qr/"
                  element={
                    <ProtectedRoute pageType="admin">
                      <DummyAdminQR />{' '}
                    </ProtectedRoute>
                  }
                />
                {/* --ADMIN PAGES */}

                <Route path="/playground" element={<Playground />} />
                <Route
                  path="/volunteers"
                  element={
                    <ProtectedRoute pageType="admin">
                      <Volunteers />
                    </ProtectedRoute>
                  }
                />
              </Route>

              {/* AUTHENTICATION PAGES-- */}
              <Route
                path="/login"
                element={
                  <ProtectedRoute pageType="authentication">
                    <Login />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/loginv2"
                element={
                  <ProtectedRoute pageType="authentication">
                    <LoginV2 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <ProtectedRoute pageType="authentication">
                    <Signup />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/signupv2"
                element={
                  <ProtectedRoute pageType="authentication">
                    <SignupV2 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/forgotpassword"
                element={
                  <ProtectedRoute pageType="authentication">
                    <ForgotPassword />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/forgotpasswordv2"
                element={
                  <ProtectedRoute pageType="authentication">
                    <ForgotPasswordV2 />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/successful-login"
                element={
                  <ProtectedRoute pageType="authentication">
                    <DummySuccessfulLogin />
                  </ProtectedRoute>
                }
              />
              {/* --AUTHENTICATION PAGES */}

              {/* VOLUNTEER PAGES-- */}
              <Route
                path="/register/:eventId"
                element={
                  <ProtectedRoute pageType="volunteer">
                    <Register />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/volunteer-qr/:eventId/:volunteerId"
                element={
                  <ProtectedRoute pageType="volunteer">
                    <DummyVolunteerQR />
                  </ProtectedRoute>
                }
              />

              {/*--VOLUNTEER PAGES*/}
              <Route element={<Layout />}>
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute pageType="settings">
                      <DummyProfilePage />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/volunteer-event"
                  element={
                    <ProtectedRoute pageType="volunteer">
                      <VolunteerEventPage />
                    </ProtectedRoute>
                  }
                />
              </Route>

              {/* PLAYGROUND */}
              <Route path="/playground" element={<Playground />} />
              <Route path="/stats" element={<DummyStatsPage />} />

              {/* TEST PAGES */}
              <Route path="/filtered-event-page" element={<FilteredEvents />} />
              <Route path="/search-volunteer-events" element={<DummySearchVolunteerEvents />} />
              <Route path="/profiles" element={<DummyProfiles />} />
              <Route path="/select-event" element={<SelectEvent />} />
            </Routes>
          </UserProvider>
        </RoleProvider>
      </Router>
    </ChakraProvider>
  );
};

export default App;
