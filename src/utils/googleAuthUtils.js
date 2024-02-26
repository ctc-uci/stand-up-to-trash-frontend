import { GoogleAuthProvider } from 'firebase/auth';
import { getAuth, signInWithRedirect, getRedirectResult, signOut } from 'firebase/auth';

const provider = new GoogleAuthProvider();

const auth = getAuth();

/**
 * Function to create new user in Firebase with Google Auth
 * @param {string} redirect Link to redirect to after successful login
 * @param {hook} navigate useNavigate hook
 */
export function createGoogleUserInFirebase(redirect, navigate) {
  signInWithRedirect(auth, provider);

  getRedirectResult(auth)
    .then(result => {
      const credential = provider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      navigate(redirect);
      return { token: token, user: user };
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error('An error occurred', errorCode, errorMessage);
    });
}

/**
 * Logs out the current user, optionally taking a redirect path to redirect to upon successful logout
 * @param {string} redirect Link to redirect to after successful logout
 * @param {hook} navigate useNavigate hook
 * @see https://firebase.google.com/docs/auth/web/google-signin
 */
export function logGoogleUserOut(redirect, navigate) {
  signOut(auth)
    .then(() => {
      navigate(redirect);
    })
    .catch(error => {
      console.log('An error occurred while signing out', error.code, error.message);
    });
}

export { auth };