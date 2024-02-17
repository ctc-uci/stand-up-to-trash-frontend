import { ChakraProvider } from '@chakra-ui/react';
import { Outlet, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import DummyEvents from './pages/DummyEvents';
import ArchivedEvents from './pages/ArchivedEvents';
import DummyProfiles from './pages/DummyProfiles';
import DummySearchVolunteerEvents from './pages/DummySearchVolunteerEvents';
import DummySuccessfulLogin from './pages/DummySuccessfulLogin';
import DummyVolunteerData from './pages/DummyVolunteerData';
import DummyVolunteerEvent from './pages/DummyVolunteerEvent';
import DummyStatsPage from './pages/DummyStatsPage';
import DummyCheckin from './pages/DummyCheckin';
import DummyEventCreation from './pages/DummyEventCreation';
import Login from './pages/Login';
import LoginV2 from './pages/LoginV2';
import Signup from './pages/Signup';
import SignupV2 from './pages/SignupV2';
import ForgotPassword from './pages/ForgotPassword';
import ForgotPasswordV2 from './pages/ForgotPasswordV2';
import Playground from './components/Playground/Playground';
import EventCardTest from './pages/EventCardTest';
import FilteredEvents from './pages/FilteredEvent';
import DataEntryModalTestPage from './pages/DataEntryModalTestPage';
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
            <Route path="/playground" element={<Playground />} />
            <Route path="/dummyevents" element={<DummyEvents />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/loginv2" element={<LoginV2 />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signupv2" element={<SignupV2 />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/forgotpasswordv2" element={<ForgotPasswordV2 />} />
          <Route path="/successful-login" element={<DummySuccessfulLogin />} />
          <Route path="/event-data" element={<DummyVolunteerData />} />
          <Route path="/volunteer-event" element={<DummyVolunteerEvent />} />
          <Route path="/events" element={<DummyEvents />} />
          <Route path="/archived-events" element={<ArchivedEvents />} />
          <Route path="/search-volunteer-events" element={<DummySearchVolunteerEvents />} />
          <Route path="/profiles" element={<DummyProfiles />} />
          <Route path="/event-creation" element={<DummyEventCreation />} />
          <Route path="/select-event" element={<SelectEvent />} />

          {/* SPRINT 4 */}

          {/* Jessie and Brendan */}
          <Route path="/data-entry-modal-test" element={<DataEntryModalTestPage />} />
          {/* Rayan and Emmy */}
          <Route path="/checkin/:eventId" element={<DummyCheckin />} />
          {/* Phillip and Katy */}
          <Route path="/stats" element={<DummyStatsPage />} />
          {/* Nate and Farhnaz */}
          <Route path="/event-card-page" element={<EventCardTest />} />
          <Route path="/filtered-event-page" element={<FilteredEvents />} />
          {/* Matthew and Bobby */}
          <Route path="/register/:eventId" element={<Register />} />
          {/* If your Sprint 3 task requires you to create a new component, you can use this route to test the look of your component */}
          <Route path="/playground" element={<Playground />} />

          {/* SPRINT 5 */}
          {/* Kevin and Jasmine */}
          <Route path="/volunteer-qr/:eventId/:volunteerId" element={<DummyVolunteerQR />} />
          <Route path="/admin-qr/" element={<DummyAdminQR />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
