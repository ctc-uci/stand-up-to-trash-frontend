import { signInWithRedirect, signOut, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './firebaseAuthUtils';

const provider = new GoogleAuthProvider();

/**
 * Function to create new user in Firebase with Google Auth
 * @param {string} redirect Link to redirect to after successful login
 * @param {hook} navigate useNavigate hook
 */
export async function createGoogleUserInFirebase(redirect, navigate) {
  await signInWithRedirect(auth, provider)
  navigate(redirect)
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
