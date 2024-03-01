import { useContext, useEffect, useState } from 'react';
import RoleContext from './RoleContext';
import { useNavigate } from 'react-router-dom';

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
          setLoading(true);
        } else if (role === 'volunteer') {
          navigate('/playground');
          setLoading(false);
        } else if (role === 'unloggedIn') {
          navigate('/loginv2');
          setLoading(false);
        }
      }

      if (pageType === 'volunteer') {
        if (role === 'admin') {
          setLoading(true);
        } else if (role === 'volunteer') {
          setLoading(true);
        } else if (role === 'unloggedIn') {
          navigate('/loginv2');
          setLoading(false);
        }
      }

      if (pageType === 'authentication') {
        if (role === 'admin') {
          navigate('/');
          setLoading(false);
        } else if (role === 'volunteer') {
          navigate('/playground');
          setLoading(false);
        } else if (role === 'unloggedIn') {
          setLoading(true);
        }
      }
    };

    isAuthenticated();
  }, [children, navigate, pageType, role]);

  if (loading) {
    return;
  }

  return children;
};

export default ProtectedRoute;
