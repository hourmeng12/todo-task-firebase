import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';

import { auth } from './firebase';

const provider = new GoogleAuthProvider();

class userApi {
  loginWithGoogle = () => {
    return signInWithPopup(auth, provider);
  };

  logOut = () => {
    return signOut(auth);
  };
}

export default new userApi();
