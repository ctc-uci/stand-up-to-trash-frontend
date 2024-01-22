import { ChakraProvider } from '@chakra-ui/react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import DummyEvents from './pages/DummyEvents';
import DummyProfiles from './pages/DummyProfiles';
import DummySearchVolunteerEvents from './pages/DummySearchVolunteerEvents';
import DummySuccessfulLogin from './pages/DummySuccessfulLogin';
import DummyVolunteerData from './pages/DummyVolunteerData';
import DummyVolunteerEvent from './pages/DummyVolunteerEvent';
import DummyStatsPage from './pages/DummyStatsPage';
import DummyVolunteerRegistrationForm from './pages/DummyVolunteerRegistrationForm';
import DummyCheckin from './pages/DummyCheckin';
import DummyEventCreation from './pages/DummyEventCreation';
import Login from './pages/Login';
import Playground from './components/Playground/Playground';
import EventCardTest from './pages/EventCardTest';

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/successful-login" element={<DummySuccessfulLogin />} />
          <Route path="/event-data" element={<DummyVolunteerData />} />
          <Route path="/volunteer-event" element={<DummyVolunteerEvent />} />
          <Route path="/events" element={<DummyEvents />} />
          <Route path="/search-volunteer-events" element={<DummySearchVolunteerEvents />} />
          <Route path="/profiles" element={<DummyProfiles />} />

          {/* SPRINT 2 */}

          {/* Gayathri and Jasmine */}
          <Route path="/event-creation" element={<DummyEventCreation />} />

          {/* Jessie and Brendan */}
          <Route path="/volunteer-registration" element={<DummyVolunteerRegistrationForm />} />

          {/* Rayan and Emmy */}
          <Route path="/checkin/:id" element={<DummyCheckin />} />

          {/* Phillip and Katy */}
          <Route path="/stats" element={<DummyStatsPage />} />

          {/* Nate and Farhnaz */}
          <Route path="/event-card-page" element={<EventCardTest />} />

          {/* If your Sprint 3 task requires you to create a new component, you can use this route to test the look of your component */}
          <Route path="/playground" element={<Playground />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
