import { useContext, useEffect, useState } from 'react';
import RoleContext from './RoleContext';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';

const ProtectedRoute = ({ children, pageType }) => {
  const { role } = useContext(RoleContext);
  const navigate = useNavigate();
  console.log(`The current user's role is: ${role}`);
  console.log(`The type of page is: ${pageType}`);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuthenticated = () => {
      if (pageType === 'admin') {
        if (role === 'admin') {
          setLoading(false);
        } else if (role === 'volunteer') {
          navigate('/playground');
          setLoading(true);
        } else if (role === 'unloggedIn') {
          navigate('/loginv2');
          setLoading(true);
        }
      }

      if (pageType === 'volunteer') {
        if (role === 'admin') {
          setLoading(false);
        } else if (role === 'volunteer') {
          setLoading(false);
        } else if (role === 'unloggedIn') {
          navigate('/loginv2');
          setLoading(true);
        }
      }

      if (pageType === 'authentication') {
        if (role === 'admin') {
          navigate('/');
          setLoading(true);
        } else if (role === 'volunteer') {
          navigate('/playground');
          setLoading(true);
        } else if (role === 'unloggedIn') {
          setLoading(false);
        }
      }
    };

    isAuthenticated();
  }, [children, navigate, pageType, role]);

  if (loading) {
    return <Spinner />
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  pageType: PropTypes.string
};

export default ProtectedRoute;
