import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginAnonymously,
  loginWithGoogle,
  loginWithFacebook,
} from '../features/user/userActions';
import { selectUser, selectUserLoading } from '../features/user/userSlice';
import { useLocation, Navigate } from 'react-router-dom';
import Button from '../components/UI/Button';
import { ReactComponent as GoogleIcon } from '../assets/google_logo.svg';
import { ReactComponent as FacebookIcon } from '../assets/facebook_logo.svg';

const Login = () => {
  const loading = useSelector(selectUserLoading);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLoginAnonymously = () => {
    dispatch(loginAnonymously());
  };

  const handleLoginWIthGoogle = () => {
    dispatch(loginWithGoogle());
  };

  const handleLoginWIthFacebook = () => {
    dispatch(loginWithFacebook());
  };

  // Navigate user to homepage if user is authenticate
  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <div className="flex items-center justify-center">
      <div className="w-screen max-w-xs rounded-xl bg-white p-4 transition-colors duration-200 dark:bg-zinc-800">
        <h2 className="mb-2 text-lg font-medium text-zinc-900 dark:text-zinc-200">
          Login
        </h2>
        <p className="mb-4 text-sm text-zinc-500">
          To Do gives you focus, from work to play.
        </p>
        <div className="space-y-2 divide-y divide-zinc-900/10 dark:divide-zinc-50/10">
          <Button
            disabled={loading}
            onClick={handleLoginAnonymously}
            className="w-full rounded-lg bg-gray-100/80 py-2 px-6 font-medium hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:opacity-30 dark:bg-zinc-800 dark:hover:bg-zinc-700 disabled:dark:bg-zinc-50 disabled:dark:text-zinc-900"
          >
            Login anonymously
          </Button>
          <div className="flex justify-between space-x-2 pt-2">
            <Button
              disabled={loading}
              onClick={handleLoginWIthGoogle}
              className="inline-flex w-full rounded-lg bg-gray-100/80 py-2 px-6 font-medium hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:opacity-30 dark:bg-zinc-800 dark:hover:bg-zinc-700 disabled:dark:bg-zinc-50 disabled:dark:text-zinc-900"
            >
              <GoogleIcon className="h-5 w-5" />
            </Button>
            <Button
              disabled={loading}
              onClick={handleLoginWIthFacebook}
              className="inline-flex w-full rounded-lg bg-gray-100/80 py-2 px-6 font-medium hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:opacity-30 dark:bg-zinc-800 dark:hover:bg-zinc-700 disabled:dark:bg-zinc-50 disabled:dark:text-zinc-900"
            >
              <FacebookIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
