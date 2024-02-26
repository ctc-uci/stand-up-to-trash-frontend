import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Backend from './utils';
import { Spinner } from '@chakra-ui/react';

// Create a context object
const RoleContext = createContext();

// Create a provider component
export const RoleProvider = ({ children }) => {
  const auth = getAuth();
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (user) {
        const res = await Backend.get(`/firebase/${user.uid}`);
        setRole(res.data.role);
        setLoading(false);
      } else {
        setRole("unloggedIn");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  });

  if (loading) {
    return <Spinner />;
}

  return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>;
};

RoleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RoleContext;
