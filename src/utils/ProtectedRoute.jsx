// import { Navigate } from "react-router-dom";
import { useContext } from 'react';
import RoleContext from './RoleContext';


const ProtectedRoute = ({ children, pageType }) => {
  // Utilize the useContext to obtain the role
  const { role } = useContext(RoleContext);
  console.log(`The current user's role is: ${role}`);
  console.log(`The type of page is: ${pageType}`);

  // Logic here for authenticating
  // Admins: role="admin"
  // Volunteers: role="volunteer"
  // Not logged in: role="unloggedIn"
  // Side note: There exists a role called "guest" but it is not possible to login with that account

  return children;
};

export default ProtectedRoute;
