import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  signInAnonymously,
  FacebookAuthProvider,
} from 'firebase/auth';

import { auth } from '../app/firebase';

const googleProvider = new GoogleAuthProvider();

const facebookProvider = new FacebookAuthProvider();
class userApi {
  loginAnonymously() {
    return signInAnonymously(auth);
  }
  loginWithGoogle() {
    return signInWithPopup(auth, googleProvider);
  }
  loginWithFacebook() {
    return signInWithPopup(auth, facebookProvider);
  }
  logOut() {
    return signOut(auth);
  }
}

export default new userApi();
