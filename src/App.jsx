import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DummyVolunteerData from './pages/DummyVolunteerData';
import DummyVolunteerEvent from './pages/DummyVolunteerEvent';
import DummySearchVolunteerEvents from './pages/DummySearchVolunteerEvents';
import DummyEvents from './pages/DummyEvents';
import DummyProfiles from './pages/DummyProfiles';
import Login from './pages/Login';

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          {/* Kevin + Phillip */}
          <Route path="/login" element={<Login />} />

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
