import { useContext } from 'react';
import RoleContext from '../utils/RoleContext';

const RoleConsumer = ({ children }) => {
  const { role } = useContext(RoleContext);
  return children(role);
};

export default RoleConsumer;