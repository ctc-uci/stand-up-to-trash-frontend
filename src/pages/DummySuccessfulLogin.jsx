import { logout } from "../utils/firebaseAuthUtils";
import { useNavigate } from "react-router-dom";

const DummySuccessfulLogin = () => {

  const navigate = useNavigate();

  return (
  <>
    <p>Placeholder for the successful login page</p>
    <button onClick={() => logout('/loginv2', navigate)}>Logout</button>
  </>
  );
};

export default DummySuccessfulLogin;
