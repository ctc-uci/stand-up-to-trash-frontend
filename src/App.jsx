import { ChakraProvider } from '@chakra-ui/react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import DummyEvents from './pages/DummyEvents';
import DummyProfiles from './pages/DummyProfiles';
import DummySearchVolunteerEvents from './pages/DummySearchVolunteerEvents';
import DummySuccessfulLogin from './pages/DummySuccessfulLogin';
import DummyVolunteerData from './pages/DummyVolunteerData';
import DummyVolunteerEvent from './pages/DummyVolunteerEvent';
import Login from './pages/Login';

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          {/* Kevin + Phillip */}
          <Route path="/login" element={<Login />} />
          <Route path="/successful-login" element={<DummySuccessfulLogin />} />

          {/* Emmy + Nate */}
          <Route path="/event-data" element={<DummyVolunteerData />} />

          {/* Rayan + Brendan */}
          <Route path="/volunteer-event" element={<DummyVolunteerEvent />} />

          {/* Jessie + Bobby */}
          <Route path="/events" element={<DummyEvents />} />

          {/* Matthew + Steven */}
          <Route path="/search-volunteer-events" element={<DummySearchVolunteerEvents />} />

          {/* Katy + Farahnaz */}
          <Route path="/profiles" element={<DummyProfiles />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
