import { ChakraProvider } from '@chakra-ui/react';
import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import EventsPage from './pages/EventsPage';
import ArchivedEvents from './pages/ArchivedEvents';
import DummyProfiles from './pages/DummyProfiles';
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
import Navbar from './components/Navbar/Navbar';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

import { theme } from './utils/chakraTheme';

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            {/* ADMIN PAGES-- */}
            <Route path="/" element={<EventsPage />} />
            <Route path="/checkin/:eventId" element={<CheckinPage />} />
            <Route path="/archived-events" element={<ArchivedEvents />} />
            <Route path="/admin-qr/" element={<DummyAdminQR />} />
            {/* --ADMIN PAGES */}

            <Route path="/playground" element={<Playground />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/loginv2" element={<LoginV2 />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signupv2" element={<SignupV2 />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/forgotpasswordv2" element={<ForgotPasswordV2 />} />
          <Route path="/successful-login" element={<DummySuccessfulLogin />} />

          {/* VOLUNTEER PAGES-- */}
          <Route path="/register/:eventId" element={<Register />} />
          <Route path="/volunteer-qr/:eventId/:volunteerId" element={<DummyVolunteerQR />} />
          {/*--VOLUNTEER PAGES*/}

          {/* PLAYGROUND */}
          <Route path="/playground" element={<Playground />} />
          <Route path="/stats" element={<DummyStatsPage />} />

          {/* TEST PAGES */}
          <Route path="/filtered-event-page" element={<FilteredEvents />} />
          <Route path="/search-volunteer-events" element={<DummySearchVolunteerEvents />} />
          <Route path="/profiles" element={<DummyProfiles />} />
          <Route path="/select-event" element={<SelectEvent />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
