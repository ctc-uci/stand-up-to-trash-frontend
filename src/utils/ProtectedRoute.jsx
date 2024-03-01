import { useContext, useEffect } from 'react';
import RoleContext from './RoleContext';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, pageType }) => {
  const { role } = useContext(RoleContext);
  const navigate = useNavigate();
  console.log(`The current user's role is: ${role}`);
  console.log(`The type of page is: ${pageType}`);

  useEffect(() => {
    if (pageType === 'admin') {
      if (role === 'admin') {
        return children;
      } else if (role === 'volunteer') {
        navigate('/playground');
      } else if (role === 'unloggedIn') {
        navigate('/loginv2');
      }
    }

    if (pageType === 'volunteer') {
      if (role === 'admin') {
        return children;
      } else if (role === 'volunteer') {
        return children;
      } else if (role === 'unloggedIn') {
        navigate('/loginv2');
      }
    }

    if (pageType === 'authentication') {
      if (role === 'admin') {
        navigate('/');
      } else if (role === 'volunteer') {
        navigate('/playground');
      } else if (role === 'unloggedIn') {
        return children;
      }
    }
  }, [children, navigate, pageType, role]);
};

export default ProtectedRoute;
