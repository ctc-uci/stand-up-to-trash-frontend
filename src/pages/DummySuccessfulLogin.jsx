import { logout } from "../utils/firebaseAuthUtils";
import { useNavigate } from "react-router-dom";
import { logFacebookUserOut } from "../utils/facebookAuthUtils";
import { logGoogleUserOut } from "../utils/googleAuthUtils";
import { Button } from "@chakra-ui/react";

const DummySuccessfulLogin = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    logout('/loginv2', navigate);
  }

  const handleGoogleLogout = () => {
    logGoogleUserOut('/loginv2', navigate);
  }

  const handleFacebookLogout = () => {
    logFacebookUserOut('/loginv2', navigate);
  }

  return (
  <>
    <p>Placeholder for the successful login page</p>
    <Button onClick={handleLogout}>Logout</Button>
    <Button onClick={handleGoogleLogout}>Logout (Google)</Button>
    <Button onClick={handleFacebookLogout}>Logout (Facebook)</Button>
  </>
  );
};

export default DummySuccessfulLogin;
